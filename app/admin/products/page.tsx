"use client";
import { useState, useEffect } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { getAllProducts, categories } from "../../data/products";
import { Search, Package, ExternalLink, Plus, Trash2, EyeOff, Eye, X, FlaskConical, ChevronDown } from "lucide-react";

const staticProducts = getAllProducts();

type CustomProduct = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  cas?: string;
  hsn?: string;
  packaging: string[];
  applications: string[];
  documentsAvailable: string[];
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [hiddenProducts, setHiddenProducts] = useState<string[]>([]);
  const [customProducts, setCustomProducts] = useState<CustomProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "custom" | "hidden">("all");

  // Form state
  const [form, setForm] = useState({
    name: "",
    categoryId: categories[0]?.id || "",
    description: "",
    cas: "",
    hsn: "",
    packaging: "25 kg bag, 50 kg bag",
    applications: "",
    documentsAvailable: "COA, Product Catalogue",
  });

  useEffect(() => {
    adminGet()
      .then(d => {
        setHiddenProducts(d.hiddenProducts || []);
        setCustomProducts(d.customProducts || []);
      })
      .catch(() => showToast("Failed to load data", "error"))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleHide = async (productId: string, productName: string) => {
    const isHidden = hiddenProducts.includes(productId);
    try {
      await adminPost("product_toggle_hide", { id: productId });
      setHiddenProducts(prev =>
        isHidden ? prev.filter(id => id !== productId) : [...prev, productId]
      );
      showToast(isHidden ? `"${productName}" is now visible on website` : `"${productName}" hidden from website`);
    } catch {
      showToast("Failed to update product visibility", "error");
    }
  };

  const deleteCustomProduct = async (productId: string, productName: string) => {
    if (!confirm(`Delete "${productName}"? This cannot be undone.`)) return;
    try {
      await adminPost("product_delete", { id: productId });
      setCustomProducts(prev => prev.filter(p => p.id !== productId));
      showToast(`"${productName}" deleted successfully`);
    } catch {
      showToast("Failed to delete product", "error");
    }
  };

  const handleAddProduct = async () => {
    if (!form.name.trim()) { showToast("Product name is required", "error"); return; }
    if (!form.categoryId) { showToast("Please select a category", "error"); return; }
    if (!form.description.trim()) { showToast("Description is required", "error"); return; }

    const id = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const newProduct: CustomProduct = {
      id: `custom-${id}-${Date.now()}`,
      name: form.name.trim(),
      categoryId: form.categoryId,
      description: form.description.trim(),
      cas: form.cas.trim() || undefined,
      hsn: form.hsn.trim() || undefined,
      packaging: form.packaging.split(",").map(s => s.trim()).filter(Boolean),
      applications: form.applications.split(",").map(s => s.trim()).filter(Boolean),
      documentsAvailable: form.documentsAvailable.split(",").map(s => s.trim()).filter(Boolean),
    };

    setSaving(true);
    try {
      await adminPost("product_add", newProduct);
      setCustomProducts(prev => [...prev, newProduct]);
      setShowAddForm(false);
      setForm({ name: "", categoryId: categories[0]?.id || "", description: "", cas: "", hsn: "", packaging: "25 kg bag, 50 kg bag", applications: "", documentsAvailable: "COA, Product Catalogue" });
      showToast(`"${newProduct.name}" added to website successfully!`);
      setActiveTab("custom");
    } catch {
      showToast("Failed to add product", "error");
    } finally {
      setSaving(false);
    }
  };

  // All products = static + custom, filtered
  const allCombined = [
    ...staticProducts.map(p => ({ ...p, isCustom: false })),
    ...customProducts.map(p => ({ ...p, isCustom: true })),
  ];

  const filtered = allCombined.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || p.categoryId === catFilter;
    const matchTab = activeTab === "all" || (activeTab === "custom" && p.isCustom) || (activeTab === "hidden" && hiddenProducts.includes(p.id));
    return matchSearch && matchCat && matchTab;
  });

  const totalVisible = allCombined.filter(p => !hiddenProducts.includes(p.id)).length;

  return (
    <AdminShell title="Products">
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          background: toast.type === "success" ? "#1a4d2e" : "#dc2626",
          color: "white", padding: "12px 20px", borderRadius: 10,
          fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", gap: 8,
          animation: "slideIn 0.2s ease",
        }}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              <span style={{ fontWeight: 700, color: "#111827" }}>{totalVisible}</span> visible on website
            </span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              <span style={{ fontWeight: 700, color: "#f4a228" }}>{customProducts.length}</span> added by you
            </span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              <span style={{ fontWeight: 700, color: "#dc2626" }}>{hiddenProducts.length}</span> hidden
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "#1a4d2e", color: "white", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
        >
          <Plus size={15} /> Add New Product
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid #e5e7eb", paddingBottom: 0 }}>
        {([
          { key: "all", label: `All Products (${allCombined.length})` },
          { key: "custom", label: `Added by Admin (${customProducts.length})` },
          { key: "hidden", label: `Hidden (${hiddenProducts.length})` },
        ] as const).map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "8px 16px", fontSize: 13, fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? "#1a4d2e" : "#6b7280",
              borderBottom: activeTab === tab.key ? "2px solid #1a4d2e" : "2px solid transparent",
              marginBottom: -1,
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 320 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
            style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", background: "white", boxSizing: "border-box" }} />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ padding: "9px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", background: "white", cursor: "pointer" }}>
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Products List */}
      {loading ? (
        <div style={{ background: "white", borderRadius: 12, padding: 40, textAlign: "center", color: "#9ca3af", border: "1px solid #f1f5f9" }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: 12, padding: 40, textAlign: "center", color: "#9ca3af", border: "1px solid #f1f5f9" }}>
          {activeTab === "custom" ? "No products added by admin yet. Click \"Add New Product\" to get started." : `No products found.`}
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f1f5f9" }}>
                  {["Product Name", "Category", "CAS No.", "Type", "Status", "Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const isHidden = hiddenProducts.includes(p.id);
                  const cat = categories.find(c => c.id === p.categoryId);
                  return (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f9fafb", opacity: isHidden ? 0.55 : 1 }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#fafafa"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ""}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <FlaskConical size={14} style={{ color: p.isCustom ? "#f4a228" : "#4caf50", flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>{cat?.name || p.categoryId}</td>
                      <td style={{ padding: "12px 16px", fontSize: 11, color: "#9ca3af", fontFamily: "monospace" }}>{p.cas || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 999,
                          background: p.isCustom ? "#fff7ed" : "#f0fdf4",
                          color: p.isCustom ? "#c2410c" : "#15803d",
                        }}>
                          {p.isCustom ? "Admin Added" : "Default"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 999,
                          background: isHidden ? "#fef2f2" : "#f0fdf4",
                          color: isHidden ? "#dc2626" : "#15803d",
                        }}>
                          {isHidden ? "Hidden" : "Visible"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <button
                            onClick={() => toggleHide(p.id, p.name)}
                            title={isHidden ? "Show on website" : "Hide from website"}
                            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", color: isHidden ? "#1a4d2e" : "#6b7280", whiteSpace: "nowrap" }}
                          >
                            {isHidden ? <Eye size={12} /> : <EyeOff size={12} />}
                            {isHidden ? "Show" : "Hide"}
                          </button>
                          {!p.isCustom && (
                            <a href={`/products/${cat?.slug}/${p.id}`} target="_blank" rel="noopener noreferrer"
                              style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#1a4d2e", textDecoration: "none", fontWeight: 600 }}>
                              <ExternalLink size={11} /> View
                            </a>
                          )}
                          {p.isCustom && (
                            <button
                              onClick={() => deleteCustomProduct(p.id, p.name)}
                              style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 6, border: "1px solid #fecaca", background: "#fef2f2", cursor: "pointer", color: "#dc2626" }}
                            >
                              <Trash2 size={12} /> Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info note */}
      <div style={{ marginTop: 16, padding: "10px 14px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0", fontSize: 12, color: "#166534" }}>
        <strong>How this works:</strong> Products you add here appear on the main website immediately. You can also hide any default product from the website using the Hide button — it stays in the system but won&apos;t be visible to visitors.
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            {/* Modal Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Add New Product</h2>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af" }}>This product will appear on the website immediately</p>
              </div>
              <button onClick={() => setShowAddForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gap: 16 }}>
                {/* Product Name */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                    Product Name <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Sodium Bicarbonate"
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                {/* Category */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                    Category <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={form.categoryId}
                      onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
                      style={{ width: "100%", padding: "9px 36px 9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", background: "white", appearance: "none", cursor: "pointer", boxSizing: "border-box" }}
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                    Description <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Brief description of this chemical product, its grade and uses…"
                    rows={3}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>

                {/* CAS + HSN */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>CAS Number <span style={{ fontSize: 11, color: "#9ca3af" }}>(optional)</span></label>
                    <input
                      value={form.cas}
                      onChange={e => setForm(f => ({ ...f, cas: e.target.value }))}
                      placeholder="e.g. 144-55-8"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "monospace", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>HSN Code <span style={{ fontSize: 11, color: "#9ca3af" }}>(optional)</span></label>
                    <input
                      value={form.hsn}
                      onChange={e => setForm(f => ({ ...f, hsn: e.target.value }))}
                      placeholder="e.g. 2836 30 00"
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "monospace", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                {/* Packaging */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                    Packaging Options <span style={{ fontSize: 11, color: "#9ca3af" }}>(comma separated)</span>
                  </label>
                  <input
                    value={form.packaging}
                    onChange={e => setForm(f => ({ ...f, packaging: e.target.value }))}
                    placeholder="25 kg bag, 50 kg bag, Jumbo bag"
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                {/* Applications */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                    Applications <span style={{ fontSize: 11, color: "#9ca3af" }}>(comma separated)</span>
                  </label>
                  <input
                    value={form.applications}
                    onChange={e => setForm(f => ({ ...f, applications: e.target.value }))}
                    placeholder="Agriculture, Water treatment, Industrial use"
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                {/* Documents */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                    Available Documents <span style={{ fontSize: 11, color: "#9ca3af" }}>(comma separated)</span>
                  </label>
                  <input
                    value={form.documentsAvailable}
                    onChange={e => setForm(f => ({ ...f, documentsAvailable: e.target.value }))}
                    placeholder="COA, Product Catalogue, MSDS on request"
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                <button onClick={() => setShowAddForm(false)}
                  style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e5e7eb", background: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#6b7280" }}>
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  disabled={saving}
                  style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: saving ? "#9ca3af" : "#1a4d2e", color: "white", fontSize: 13, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  {saving ? "Adding…" : <><Plus size={14} /> Add to Website</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </AdminShell>
  );
}
