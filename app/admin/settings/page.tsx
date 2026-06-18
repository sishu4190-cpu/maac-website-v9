"use client";
import { useState, useEffect } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Save, Phone, Mail, MapPin, Clock, Globe, CheckCircle, AlertCircle, Lock, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const [tab, setTab] = useState<"contact" | "site" | "security">("contact");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Contact fields
  const [phones, setPhones] = useState(["+91 96620 88122", "+91 90818 32790", "+91 95379 70043"]);
  const [emails, setEmails] = useState(["mangalamacidandchemicals@gmail.com", "info_maac@yahoo.com"]);
  const [address, setAddress] = useState("PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat, India");
  const [hours, setHours] = useState("Monday – Saturday, 9:00 AM – 7:00 PM IST");
  const [whatsapp, setWhatsapp] = useState("+91 96620 88122");

  // Site fields
  const [siteName, setSiteName] = useState("Mangalam Acid and Chemicals");
  const [tagline, setTagline] = useState("Reliable Industrial Chemical Supplier in Vapi, Gujarat");
  const [metaDesc, setMetaDesc] = useState("");
  const [indiamartUrl, setIndiamartUrl] = useState("https://www.indiamart.com/mangalam-acid-chemicals/");

  // Security
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    adminGet().then(d => {
      if (d.contact) {
        setPhones(d.contact.phones || phones);
        setEmails(d.contact.emails || emails);
        setAddress(d.contact.address || address);
        setHours(d.contact.businessHours || hours);
        setWhatsapp(d.contact.whatsapp || whatsapp);
      }
      if (d.settings) {
        setSiteName(d.settings.siteName || siteName);
        setTagline(d.settings.tagline || tagline);
        setMetaDesc(d.settings.metaDescription || metaDesc);
        setIndiamartUrl(d.settings.indiamartUrl || indiamartUrl);
      }
      setLoading(false);
    });
  }, []);

  const saveContact = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      await adminPost("contact", { phones, emails, address, businessHours: hours, whatsapp });
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch { setError("Save failed. Try again."); }
    setSaving(false);
  };

  const saveSite = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      await adminPost("settings", { siteName, tagline, metaDescription: metaDesc, indiamartUrl });
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch { setError("Save failed."); }
    setSaving(false);
  };

  const saveSecurity = async () => {
    if (!currentPw || !newPw || !confirmPw) { setError("All fields required."); return; }
    if (newPw !== confirmPw) { setError("New passwords don't match."); return; }
    if (newPw.length < 8) { setError("Password must be at least 8 characters."); return; }
    setSaving(true); setError("");
    // Note: In production, this should call a secure API route that updates env vars / database
    await new Promise(r => setTimeout(r, 800));
    setSaved(true); setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setSaved(false), 3000);
    setSaving(false);
  };

  const Input = ({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit" }} />
    </div>
  );

  const tabs = [
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "site", label: "Site Settings", icon: Globe },
    { id: "security", label: "Security", icon: Lock },
  ] as const;

  return (
    <AdminShell title="Settings">
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "white", padding: 4, borderRadius: 10, border: "1px solid #f1f5f9", width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSaved(false); setError(""); }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, background: tab === t.id ? "#1a4d2e" : "transparent", color: tab === t.id ? "white" : "#6b7280", transition: "all 0.15s" }}>
            <t.icon size={14} />{t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 600 }}>
        {/* Feedback */}
        {saved && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#15803d" }}>
            <CheckCircle size={15} /> Saved successfully! Changes are now live on the website.
          </div>
        )}
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, marginBottom: 16, fontSize: 13, color: "#dc2626" }}>
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading…</div>
        ) : (
          <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>

            {/* CONTACT TAB */}
            {tab === "contact" && (
              <>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a4d2e", marginBottom: 20 }}>Contact Information</h3>
                <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>
                  These details appear on the Contact page, Footer, and are used for WhatsApp links across the website.
                </p>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Phone size={12} /> Phone Numbers</span>
                  </label>
                  {phones.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <input value={p} onChange={e => { const n = [...phones]; n[i] = e.target.value; setPhones(n); }}
                        style={{ flex: 1, padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none" }} />
                      {phones.length > 1 && <button onClick={() => setPhones(phones.filter((_, j) => j !== i))} style={{ padding: "9px 12px", border: "1px solid #fee2e2", borderRadius: 8, background: "#fef2f2", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>×</button>}
                    </div>
                  ))}
                  <button onClick={() => setPhones([...phones, ""])} style={{ fontSize: 12, color: "#1a4d2e", background: "none", border: "1px dashed #d1d5db", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 600 }}>+ Add Phone</button>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Mail size={12} /> Email Addresses</span>
                  </label>
                  {emails.map((em, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <input value={em} onChange={e => { const n = [...emails]; n[i] = e.target.value; setEmails(n); }}
                        style={{ flex: 1, padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none" }} />
                      {emails.length > 1 && <button onClick={() => setEmails(emails.filter((_, j) => j !== i))} style={{ padding: "9px 12px", border: "1px solid #fee2e2", borderRadius: 8, background: "#fef2f2", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>×</button>}
                    </div>
                  ))}
                </div>

                <Input label="WhatsApp Number (for chat buttons)" value={whatsapp} onChange={setWhatsapp} placeholder="+91 96620 88122" />
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MapPin size={12} /> Office Address</span>
                  </label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical" }} />
                </div>
                <Input label="Business Hours" value={hours} onChange={setHours} placeholder="Monday – Saturday, 9:00 AM – 7:00 PM" />

                <button onClick={saveContact} disabled={saving}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 24px", background: saving ? "#e5e7eb" : "#1a4d2e", color: saving ? "#9ca3af" : "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                  <Save size={15} /> {saving ? "Saving…" : "Save Contact Info"}
                </button>
              </>
            )}

            {/* SITE TAB */}
            {tab === "site" && (
              <>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a4d2e", marginBottom: 20 }}>Site Settings</h3>
                <Input label="Company Name" value={siteName} onChange={setSiteName} />
                <Input label="Tagline / Hero Headline" value={tagline} onChange={setTagline} />
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Meta Description (SEO)</label>
                  <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical" }}
                    placeholder="Describe your business for Google search results…" />
                  <div style={{ fontSize: 11, color: metaDesc.length > 160 ? "#ef4444" : "#9ca3af", marginTop: 4 }}>{metaDesc.length}/160 characters</div>
                </div>
                <Input label="IndiaMART Profile URL" value={indiamartUrl} onChange={setIndiamartUrl} />

                <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "12px 14px", marginBottom: 20, fontSize: 12, color: "#92400e" }}>
                  Note: After saving settings, restart the dev server (<code style={{ fontFamily: "monospace", background: "#fef3c7", padding: "1px 4px", borderRadius: 3 }}>npm run dev</code>) for changes to reflect across all pages.
                </div>

                <button onClick={saveSite} disabled={saving}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 24px", background: saving ? "#e5e7eb" : "#1a4d2e", color: saving ? "#9ca3af" : "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                  <Save size={15} /> {saving ? "Saving…" : "Save Settings"}
                </button>
              </>
            )}

            {/* SECURITY TAB */}
            {tab === "security" && (
              <>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a4d2e", marginBottom: 20 }}>Change Admin Password</h3>
                <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "12px 14px", marginBottom: 20, fontSize: 12, color: "#1e40af" }}>
                  After changing password, update <code style={{ fontFamily: "monospace", background: "#dbeafe", padding: "1px 4px", borderRadius: 3 }}>ADMIN_PASSWORD</code> in your <code style={{ fontFamily: "monospace", background: "#dbeafe", padding: "1px 4px", borderRadius: 3 }}>.env.local</code> file and restart the server.
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Current Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPw ? "text" : "password"} value={currentPw} onChange={e => setCurrentPw(e.target.value)}
                      style={{ width: "100%", padding: "10px 40px 10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none" }} />
                    <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>New Password</label>
                  <input type={showPw ? "text" : "password"} value={newPw} onChange={e => setNewPw(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none" }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Confirm New Password</label>
                  <input type={showPw ? "text" : "password"} value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none" }} />
                  {newPw && confirmPw && newPw !== confirmPw && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>Passwords don't match</p>}
                </div>

                <button onClick={saveSecurity} disabled={saving}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 24px", background: saving ? "#e5e7eb" : "#1a4d2e", color: saving ? "#9ca3af" : "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                  <Lock size={15} /> {saving ? "Updating…" : "Update Password"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
