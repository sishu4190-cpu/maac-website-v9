"use client";
import { useState, useEffect, useCallback } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Save, X, Package, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { categories } from "@/app/data/products";

interface CustomProduct {
  id: string; name: string; categoryId: string; description: string;
  cas?: string; hsn?: string; formula?: string;
  applications: string[]; packaging: string[];
  specifications?: Record<string, string>;
  published: boolean; createdAt: string;
}

interface ProductOverride {
  productId: string; name?: string; description?: string;
  cas?: string; hsn?: string; formula?: string;
  specifications?: Record<string, string>;
  applications?: string[]; packaging?: string[];
}

const emptyProduct = (): Partial<CustomProduct> => ({
  name: "", categoryId: categories[0]?.id || "", description: "",
  cas: "", hsn: "", formula: "",
  applications: [], packaging: [], specifications: {}, published: true,
});

const inpStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const };

// IMPORTANT: This component must stay defined here, at module scope (outside
// AdminProducts), not as a `const` inside the component function. Defining
// it inside the parent meant a brand-new component reference was created on
// every single render (i.e. every keystroke) — React then treated it as a
// completely different component type each time, unmounted the old <input>
// DOM node and mounted a fresh one, which is what threw away focus (and
// closed the mobile keyboard) after every character typed. Keeping it here
// gives it a stable identity across renders, so the input element persists
// and keeps focus normally.
// Also moved to module scope for the same reason as SpecsEditor above —
// it was defined inline inside AdminProducts, losing input focus on every
// keystroke.
function TagInput({ field, value, setValue, placeholder, onAdd, onRemove, tags }: {
  field: "applications" | "packaging";
  value: string;
  setValue: (v: string) => void;
  placeholder: string;
  onAdd: (f: "applications" | "packaging", v: string) => void;
  onRemove: (f: "applications" | "packaging", i: number) => void;
  tags: string[];
}) {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
        {tags.map((tag, i) => (
          <span key={i} style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 999, fontSize: 12, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
            {tag}<button onClick={() => onRemove(field, i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 0, fontSize: 14 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); onAdd(field, value); } }} placeholder={placeholder} style={{ ...inpStyle, flex: 1 }} />
        <button onClick={() => onAdd(field, value)} style={{ padding: "8px 14px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Add</button>
      </div>
    </div>
  );
}

function SpecsEditor({
  specs, onUpdate, onRemove, target, newSpecKey, setNewSpecKey, newSpecVal, setNewSpecVal, addSpec,
}: {
  specs: Record<string, string>;
  onUpdate: (k: string, v: string) => void;
  onRemove: (k: string, t: "custom" | "static") => void;
  target: "custom" | "static";
  newSpecKey: string;
  setNewSpecKey: (v: string) => void;
  newSpecVal: string;
  setNewSpecVal: (v: string) => void;
  addSpec: (t: "custom" | "static") => void;
}) {
  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 12 }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, color: "#6b7280", fontSize: 11, width: "40%" }}>Parameter</th>
              <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, color: "#6b7280", fontSize: 11 }}>Value</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(specs).map(([k, v]) => (
              <tr key={k} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "6px 12px" }}><input value={k} readOnly style={{ ...inpStyle, background: "#f9fafb", fontSize: 12 }} /></td>
                <td style={{ padding: "6px 12px" }}><input value={v} onChange={e => onUpdate(k, e.target.value)} style={{ ...inpStyle, fontSize: 12 }} /></td>
                <td style={{ padding: "6px 8px" }}><button onClick={() => onRemove(k, target)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><X size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={newSpecKey} onChange={e => setNewSpecKey(e.target.value)} placeholder="Parameter name" style={{ ...inpStyle, flex: 1, fontSize: 12 }} />
        <input value={newSpecVal} onChange={e => setNewSpecVal(e.target.value)} placeholder="Value" style={{ ...inpStyle, flex: 1, fontSize: 12 }} />
        <button onClick={() => addSpec(target)} style={{ padding: "8px 14px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>+ Add Row</button>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [customProds, setCustomProds] = useState<CustomProduct[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [overrides, setOverrides] = useState<Record<string, ProductOverride>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "editor" | "static-editor">("list");
  const [editing, setEditing] = useState<Partial<CustomProduct> | null>(null);
  const [editingStatic, setEditingStatic] = useState<ProductOverride | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [tab, setTab] = useState<"custom" | "static">("custom");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [appInput, setAppInput] = useState("");
  const [packInput, setPackInput] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecVal, setNewSpecVal] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    adminGet().then(d => {
      setCustomProds(d.customProducts || []);
      setHiddenIds(d.hiddenProducts || []);
      setOverrides(d.productOverrides || {});
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const allStaticProducts = categories.flatMap(c => c.products.map(p => ({ ...p, categoryName: c.name })));
  const filteredStatic = allStaticProducts.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredCustom = customProds.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  const startNew = () => { setEditing(emptyProduct()); setIsNew(true); setView("editor"); setSaved(false); setAppInput(""); setPackInput(""); };
  const startEdit = (p: CustomProduct) => { setEditing({ ...p, applications: [...(p.applications || [])], packaging: [...(p.packaging || [])] }); setIsNew(false); setView("editor"); setSaved(false); setAppInput(""); setPackInput(""); };

  const startStaticEdit = (p: typeof allStaticProducts[0]) => {
    const existing = overrides[p.id] || {};
    setEditingStatic({
      productId: p.id,
      name: existing.name ?? p.name,
      description: existing.description ?? p.description,
      cas: existing.cas ?? (p.cas || ""),
      hsn: existing.hsn ?? (p.hsn || ""),
      formula: existing.formula ?? "",
      specifications: existing.specifications ?? { ...(p.specifications || {}) },
      applications: existing.applications ?? [...(p.applications || [])],
      packaging: existing.packaging ?? [...(p.packaging || [])],
    });
    setView("static-editor");
    setSaved(false);
  };

  const handleSave = async () => {
    if (!editing?.name?.trim()) { alert("Product name is required"); return; }
    setSaving(true);
    try {
      if (isNew) await adminPost("product_add", { ...editing, id: `custom-${Date.now()}` });
      else await adminPost("product_update", editing);
      setSaved(true); load();
      setTimeout(() => { setView("list"); setEditing(null); setSaved(false); }, 900);
    } catch { alert("Save failed"); }
    setSaving(false);
  };

  const handleStaticSave = async () => {
    if (!editingStatic) return;
    setSaving(true);
    try {
      await adminPost("product_override_save", editingStatic);
      setSaved(true); load();
      setTimeout(() => { setView("list"); setEditingStatic(null); setSaved(false); }, 900);
    } catch { alert("Save failed"); }
    setSaving(false);
  };

  const handleStaticReset = async (productId: string) => {
    if (!confirm("Reset this product to its original data?")) return;
    await adminPost("product_override_reset", { productId });
    load();
  };

  const handleDelete = async (id: string) => { await adminPost("product_delete", { id }); setDeleteConfirm(null); load(); };
  const toggleHide = async (id: string) => { await adminPost("product_toggle_hide", { id }); load(); };

  const addTag = (field: "applications" | "packaging", value: string) => {
    if (!value.trim()) return;
    setEditing(prev => ({ ...prev, [field]: [...(prev?.[field] as string[] || []), value.trim()] }));
    if (field === "applications") setAppInput(""); else setPackInput("");
  };

  const addStaticTag = (field: "applications" | "packaging", value: string) => {
    if (!value.trim()) return;
    setEditingStatic(prev => prev ? { ...prev, [field]: [...(prev[field] as string[] || []), value.trim()] } : null);
    if (field === "applications") setAppInput(""); else setPackInput("");
  };

  const removeTag = (field: "applications" | "packaging", idx: number) => {
    setEditing(prev => { const arr = [...(prev?.[field] as string[] || [])]; arr.splice(idx, 1); return { ...prev, [field]: arr }; });
  };

  const removeStaticTag = (field: "applications" | "packaging", idx: number) => {
    setEditingStatic(prev => { if (!prev) return null; const arr = [...(prev[field] as string[] || [])]; arr.splice(idx, 1); return { ...prev, [field]: arr }; });
  };

  const addSpec = (target: "custom" | "static") => {
    if (!newSpecKey.trim()) return;
    if (target === "custom") setEditing(prev => ({ ...prev, specifications: { ...(prev?.specifications || {}), [newSpecKey]: newSpecVal } }));
    else setEditingStatic(prev => prev ? { ...prev, specifications: { ...(prev.specifications || {}), [newSpecKey]: newSpecVal } } : null);
    setNewSpecKey(""); setNewSpecVal("");
  };

  const removeSpec = (key: string, target: "custom" | "static") => {
    if (target === "custom") setEditing(prev => { const s = { ...(prev?.specifications || {}) }; delete s[key]; return { ...prev, specifications: s }; });
    else setEditingStatic(prev => { if (!prev) return null; const s = { ...(prev.specifications || {}) }; delete s[key]; return { ...prev, specifications: s }; });
  };

  const cardStyle = { background: "white", borderRadius: 12, padding: 24, border: "1px solid #f1f5f9" };

  // Static Product Editor
  if (view === "static-editor" && editingStatic) {
    const orig = allStaticProducts.find(p => p.id === editingStatic.productId);
    return (
      <AdminShell title={`Edit: ${orig?.name || "Product"}`}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <button onClick={() => { setView("list"); setEditingStatic(null); }} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}><X size={14} /> Cancel</button>
          <button onClick={handleStaticSave} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 22px", background: saved ? "#15803d" : "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            <Save size={14} />{saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#1e40af" }}>
          ℹ️ You are editing a catalogue product. Changes save immediately and reflect on the product page.
        </div>
        <div className="admin-2col">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Basic Information</h3>
              {[{ label: "Product Name", key: "name" }, { label: "CAS Number", key: "cas" }, { label: "Chemical Formula", key: "formula" }, { label: "HSN Code", key: "hsn" }].map(({ label, key }) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
                  <input value={(editingStatic[key as keyof ProductOverride] as string) || ""} onChange={e => setEditingStatic(prev => prev ? { ...prev, [key]: e.target.value } : null)} style={inpStyle} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Description</label>
                <textarea value={editingStatic.description || ""} onChange={e => setEditingStatic(prev => prev ? { ...prev, description: e.target.value } : null)} rows={4} style={{ ...inpStyle, resize: "vertical" as const }} />
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Specifications</h3>
              <SpecsEditor specs={editingStatic.specifications || {}} target="static"
                onUpdate={(k, v) => setEditingStatic(prev => prev ? { ...prev, specifications: { ...(prev.specifications || {}), [k]: v } } : null)}
                onRemove={removeSpec}
                newSpecKey={newSpecKey} setNewSpecKey={setNewSpecKey}
                newSpecVal={newSpecVal} setNewSpecVal={setNewSpecVal}
                addSpec={addSpec} />
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Applications</h3>
              <TagInput field="applications" value={appInput} setValue={setAppInput} placeholder="e.g. Fertilizer manufacturing" tags={editingStatic.applications || []} onAdd={addStaticTag} onRemove={removeStaticTag} />
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Packaging Options</h3>
              <TagInput field="packaging" value={packInput} setValue={setPackInput} placeholder="e.g. 25 kg bags" tags={editingStatic.packaging || []} onAdd={addStaticTag} onRemove={removeStaticTag} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Original Data</h3>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
                <p><strong>Category:</strong> {orig?.categoryName}</p>
                <p><strong>CAS:</strong> {orig?.cas || "—"}</p>
                <p><strong>HSN:</strong> {orig?.hsn || "—"}</p>
                {overrides[editingStatic.productId] && (
                  <button onClick={() => handleStaticReset(editingStatic.productId)} style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 12, padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", fontSize: 12, color: "#6b7280", cursor: "pointer" }}>
                    <RotateCcw size={12} /> Reset to Original
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminShell>
    );
  }

  // Custom Product Editor
  if (view === "editor") return (
    <AdminShell title={isNew ? "Add New Product" : "Edit Product"}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <button onClick={() => { setView("list"); setEditing(null); }} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}><X size={14} /> Cancel</button>
        <button onClick={handleSave} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 22px", background: saved ? "#15803d" : "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          <Save size={14} />{saving ? "Saving…" : saved ? "Saved!" : "Save Product"}
        </button>
      </div>
      <div className="admin-2col">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Basic Information</h3>
            {[{ label: "Product Name *", key: "name" }, { label: "CAS Number", key: "cas" }, { label: "Chemical Formula", key: "formula" }, { label: "HSN Code", key: "hsn" }].map(({ label, key }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
                <input value={(editing?.[key as keyof CustomProduct] as string) || ""} onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))} style={inpStyle} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Description</label>
              <textarea value={editing?.description || ""} onChange={e => setEditing(prev => ({ ...prev, description: e.target.value }))} rows={4} style={{ ...inpStyle, resize: "vertical" as const }} />
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Specifications</h3>
            <SpecsEditor specs={editing?.specifications || {}} target="custom"
              onUpdate={(k, v) => setEditing(prev => ({ ...prev, specifications: { ...(prev?.specifications || {}), [k]: v } }))}
              onRemove={removeSpec}
              newSpecKey={newSpecKey} setNewSpecKey={setNewSpecKey}
              newSpecVal={newSpecVal} setNewSpecVal={setNewSpecVal}
              addSpec={addSpec} />
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Applications</h3>
            <TagInput field="applications" value={appInput} setValue={setAppInput} placeholder="e.g. Fertilizer manufacturing" tags={editing?.applications || []} onAdd={addTag} onRemove={removeTag} />
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Packaging Options</h3>
            <TagInput field="packaging" value={packInput} setValue={setPackInput} placeholder="e.g. 25 kg bags" tags={editing?.packaging || []} onAdd={addTag} onRemove={removeTag} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Settings</h3>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Category</label>
              <select value={editing?.categoryId || ""} onChange={e => setEditing(prev => ({ ...prev, categoryId: e.target.value }))} style={{ width: "100%", padding: "9px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, background: "white", outline: "none" }}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#374151" }}>
              <input type="checkbox" checked={editing?.published !== false} onChange={e => setEditing(prev => ({ ...prev, published: e.target.checked }))} />Published
            </label>
          </div>
        </div>
      </div>
    </AdminShell>
  );

  // List View
  return (
    <AdminShell title="Products">
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[{ id: "custom", label: `Custom Products (${customProds.length})` }, { id: "static", label: `Catalogue Products (${allStaticProducts.length})` }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as "custom" | "static")} style={{ padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: tab === t.id ? "#1a4d2e" : "#f3f4f6", color: tab === t.id ? "white" : "#374151" }}>{t.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 360 }}>
          <Search size={14} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        {tab === "custom" && (
          <button onClick={startNew} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <Plus size={15} /> Add Product
          </button>
        )}
      </div>

      {tab === "static" && (
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#1e40af", marginBottom: 16 }}>
          ✏️ Click <strong>Edit</strong> on any catalogue product to update its name, description, specifications, applications, and packaging. Changes reflect on the website immediately.
        </div>
      )}

      {tab === "custom" ? (
        loading ? <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading…</div> :
        filteredCustom.length === 0 ? (
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", padding: 48, textAlign: "center" }}>
            <Package size={36} style={{ color: "#d1d5db", margin: "0 auto 12px" }} />
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 16 }}>{search ? "No products match." : "No custom products yet."}</p>
            {!search && <button onClick={startNew} style={{ background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add First Product</button>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filteredCustom.map(p => (
              <div key={p.id} style={{ background: "white", borderRadius: 12, border: "1px solid #f1f5f9", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }} onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{categories.find(c => c.id === p.categoryId)?.name || p.categoryId}{p.cas && ` · CAS: ${p.cas}`}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, fontWeight: 600, background: p.published !== false ? "#dcfce7" : "#fef9c3", color: p.published !== false ? "#15803d" : "#a16207" }}>{p.published !== false ? "Published" : "Draft"}</span>
                    <button onClick={e => { e.stopPropagation(); startEdit(p); }} style={{ padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", color: "#1a4d2e", display: "flex", alignItems: "center" }}><Edit2 size={13} /></button>
                    <button onClick={e => { e.stopPropagation(); setDeleteConfirm(p.id); }} style={{ padding: "6px 10px", border: "1px solid #fee2e2", borderRadius: 8, background: "#fef2f2", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center" }}><Trash2 size={13} /></button>
                    {expandedId === p.id ? <ChevronUp size={15} style={{ color: "#9ca3af" }} /> : <ChevronDown size={15} style={{ color: "#9ca3af" }} />}
                  </div>
                </div>
                {expandedId === p.id && <div style={{ padding: "0 16px 14px", borderTop: "1px solid #f9fafb", fontSize: 13, color: "#6b7280" }}>{p.description || "No description."}</div>}
                {deleteConfirm === p.id && (
                  <div style={{ padding: "12px 16px", background: "#fef2f2", borderTop: "1px solid #fee2e2", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: "#dc2626", flex: 1 }}>Delete "{p.name}"?</span>
                    <button onClick={() => handleDelete(p.id)} style={{ padding: "6px 14px", background: "#ef4444", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Delete</button>
                    <button onClick={() => setDeleteConfirm(null)} style={{ padding: "6px 12px", background: "white", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filteredStatic.map(p => {
            const hasOverride = !!overrides[p.id];
            return (
              <div key={p.id} style={{ background: "white", borderRadius: 10, border: "1px solid #f1f5f9", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, opacity: hiddenIds.includes(p.id) ? 0.5 : 1 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{overrides[p.id]?.name || p.name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>
                    {(p as { categoryName?: string }).categoryName}
                    {hasOverride && <span style={{ marginLeft: 8, background: "#fef3c7", color: "#a16207", padding: "1px 6px", borderRadius: 999, fontSize: 10, fontWeight: 600 }}>Edited</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => startStaticEdit(p)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", color: "#1a4d2e", fontSize: 12, fontWeight: 600 }}>
                    <Edit2 size={13} /> Edit
                  </button>
                  {hasOverride && (
                    <button onClick={() => handleStaticReset(p.id)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", color: "#6b7280", fontSize: 12 }}>
                      <RotateCcw size={12} /> Reset
                    </button>
                  )}
                  <button onClick={() => toggleHide(p.id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 12, color: hiddenIds.includes(p.id) ? "#ef4444" : "#6b7280" }}>
                    {hiddenIds.includes(p.id) ? <><EyeOff size={13} /> Hidden</> : <><Eye size={13} /> Visible</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
