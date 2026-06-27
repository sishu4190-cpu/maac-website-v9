"use client";
import { useState, useEffect } from "react";
import AdminShell from "../lib/AdminShell";
import { adminGet, adminPost } from "../lib/api";
import { Save, CheckCircle, AlertCircle, Plus, Trash2, Eye, EyeOff } from "lucide-react";

type Tab = "contact" | "social" | "site" | "security";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("contact");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Contact
  const [phones, setPhones] = useState(["+91 96620 88122", "+91 90818 32790", "+91 95379 70043"]);
  const [emails, setEmails] = useState(["mangalamacidandchemicals@gmail.com", "info_maac@yahoo.com"]);
  const [address, setAddress] = useState("PT 209, SH-305, 3rd Floor, Girnar Khushboo Plaza, Vapi INA (INA), Pardi, Valsad – 396195, Gujarat, India");
  const [hours, setHours] = useState("Monday – Saturday, 9:00 AM – 7:00 PM IST");
  const [whatsapp, setWhatsapp] = useState("+91 96620 88122");

  // Social
  const [facebook, setFacebook] = useState("https://www.facebook.com/share/1GK11G4kCK/");
  const [instagram, setInstagram] = useState("https://www.instagram.com/mangalamchemicals");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/ravi-patel-4b51912b2");
  const [youtube, setYoutube] = useState("https://youtube.com/@mangalamchemicals?si=Xz8GSaSYR1W0jZs7");

  // Site
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
        setFacebook(d.contact.facebook || facebook);
        setInstagram(d.contact.instagram || instagram);
        setLinkedin(d.contact.linkedin || linkedin);
        setYoutube(d.contact.youtube || youtube);
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

  const showSaved = (msg: string) => { setSaved(msg); setTimeout(() => setSaved(null), 3000); };

  const saveContact = async () => {
    setSaving(true); setError("");
    try {
      await adminPost("contact", { phones, emails, address, businessHours: hours, whatsapp, facebook, instagram, linkedin, youtube });
      showSaved("Contact & social links updated!");
    } catch { setError("Save failed."); }
    setSaving(false);
  };

  const saveSite = async () => {
    setSaving(true); setError("");
    try {
      await adminPost("settings", { siteName, tagline, metaDescription: metaDesc, indiamartUrl });
      showSaved("Site settings updated!");
    } catch { setError("Save failed."); }
    setSaving(false);
  };

  const savePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) { setError("All fields are required."); return; }
    if (newPw !== confirmPw) { setError("New passwords don't match."); return; }
    if (newPw.length < 8) { setError("Password must be at least 8 characters."); return; }
    setSaving(true); setError("");
    try {
      const res = await adminPost("password_change", { current: currentPw, newPassword: newPw });
      if (res?.error) { setError(res.error); setSaving(false); return; }
      sessionStorage.setItem("maac_admin_token", newPw);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      showSaved("Password changed successfully!");
    } catch { setError("Password change failed."); }
    setSaving(false);
  };

  const tabStyle = (t: Tab) => ({
    padding: "9px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer" as const, border: "none",
    background: tab === t ? "#1a4d2e" : "#f3f4f6", color: tab === t ? "white" : "#374151",
  });

  const cardStyle = { background: "white", borderRadius: 12, padding: 24, border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };

  const inpStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const };
  const labelStyle = { display: "block" as const, fontSize: 12, fontWeight: 600 as const, color: "#374151", marginBottom: 5 };

  const Inp = ({ label, value, onChange, placeholder, type }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <input type={type || "text"} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inpStyle} />
    </div>
  );

  const MultiField = ({ label, values, onChange, placeholder }: { label: string; values: string[]; onChange: (v: string[]) => void; placeholder: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ ...labelStyle, marginBottom: 8 }}>{label}</label>
      {values.map((v, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={v} onChange={e => { const arr = [...values]; arr[i] = e.target.value; onChange(arr); }} placeholder={placeholder} style={{ ...inpStyle, flex: 1 }} />
          {values.length > 1 && <button onClick={() => onChange(values.filter((_, j) => j !== i))} style={{ padding: "6px 10px", border: "1px solid #fee2e2", borderRadius: 8, background: "#fef2f2", cursor: "pointer", color: "#ef4444" }}><Trash2 size={13} /></button>}
        </div>
      ))}
      <button onClick={() => onChange([...values, ""])} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#1a4d2e", background: "none", border: "1px solid #1a4d2e", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontWeight: 600 }}><Plus size={12} /> Add Another</button>
    </div>
  );

  const SocialInp = ({ label, value, onChange, icon, placeholder }: { label: string; value: string; onChange: (v: string) => void; icon: string; placeholder: string }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{icon} {label}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...inpStyle, flex: 1 }} />
        {value && <a href={value} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, color: "#6b7280", textDecoration: "none", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Test ↗</a>}
      </div>
    </div>
  );

  if (loading) return <AdminShell title="Settings"><div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading…</div></AdminShell>;

  return (
    <AdminShell title="Settings">
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <button style={tabStyle("contact")} onClick={() => setTab("contact")}>📞 Contact Info</button>
        <button style={tabStyle("social")} onClick={() => setTab("social")}>🌐 Social Links</button>
        <button style={tabStyle("site")} onClick={() => setTab("site")}>⚙️ Site Settings</button>
        <button style={tabStyle("security")} onClick={() => setTab("security")}>🔐 Security</button>
      </div>

      {saved && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <CheckCircle size={16} style={{ color: "#15803d" }} />
          <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>{saved} Changes are live on the website.</span>
        </div>
      )}
      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <AlertCircle size={16} style={{ color: "#dc2626" }} />
          <span style={{ fontSize: 13, color: "#dc2626" }}>{error}</span>
          <button onClick={() => setError("")} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}>×</button>
        </div>
      )}

      {tab === "contact" && (
        <div style={{ maxWidth: 700 }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a4d2e", marginBottom: 20 }}>📞 Contact Information</h2>
            <MultiField label="Phone Numbers" values={phones} onChange={setPhones} placeholder="+91 XXXXX XXXXX" />
            <MultiField label="Email Addresses" values={emails} onChange={setEmails} placeholder="email@example.com" />
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>WhatsApp Number (used for WhatsApp button)</label>
              <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+91 96620 88122" style={inpStyle} />
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>This is used for the floating WhatsApp button on the website.</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Office Address</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} style={{ ...inpStyle, resize: "vertical" as const }} />
            </div>
            <Inp label="Business Hours" value={hours} onChange={setHours} placeholder="Monday – Saturday, 9:00 AM – 7:00 PM IST" />
            <button onClick={saveContact} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              <Save size={14} />{saving ? "Saving..." : "Save Contact Info"}
            </button>
          </div>
        </div>
      )}

      {tab === "social" && (
        <div style={{ maxWidth: 700 }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a4d2e", marginBottom: 6 }}>🌐 Social Media Links</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>These links appear in the website footer. Leave empty to hide a platform.</p>
            <SocialInp label="Facebook" value={facebook} onChange={setFacebook} icon="🔵" placeholder="https://www.facebook.com/..." />
            <SocialInp label="Instagram" value={instagram} onChange={setInstagram} icon="📸" placeholder="https://www.instagram.com/..." />
            <SocialInp label="LinkedIn" value={linkedin} onChange={setLinkedin} icon="🔗" placeholder="https://www.linkedin.com/..." />
            <SocialInp label="YouTube" value={youtube} onChange={setYoutube} icon="▶️" placeholder="https://youtube.com/..." />
            <button onClick={saveContact} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              <Save size={14} />{saving ? "Saving..." : "Save Social Links"}
            </button>
          </div>
          <div style={{ ...cardStyle, marginTop: 16, background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <p style={{ fontSize: 13, color: "#1e40af" }}>💡 Social links update in the website footer immediately after saving. Empty fields will hide that platform's icon.</p>
          </div>
        </div>
      )}

      {tab === "site" && (
        <div style={{ maxWidth: 700 }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a4d2e", marginBottom: 20 }}>⚙️ Site Settings</h2>
            <Inp label="Company Name" value={siteName} onChange={setSiteName} />
            <Inp label="Tagline / Subtitle" value={tagline} onChange={setTagline} />
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Meta Description (for Google SEO)</label>
              <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3} placeholder="Brief description of your business for search engines…" style={{ ...inpStyle, resize: "vertical" as const }} />
            </div>
            <Inp label="IndiaMart URL" value={indiamartUrl} onChange={setIndiamartUrl} placeholder="https://www.indiamart.com/..." />
            <button onClick={saveSite} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              <Save size={14} />{saving ? "Saving..." : "Save Site Settings"}
            </button>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div style={{ maxWidth: 500 }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a4d2e", marginBottom: 6 }}>🔐 Change Admin Password</h2>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Change your admin panel login password. Choose something strong with 8+ characters.</p>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Current Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} value={currentPw} onChange={e => setCurrentPw(e.target.value)} style={{ ...inpStyle, paddingRight: 40 }} placeholder="Enter current password" />
                <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>New Password</label>
              <input type={showPw ? "text" : "password"} value={newPw} onChange={e => setNewPw(e.target.value)} style={inpStyle} placeholder="Min. 8 characters" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Confirm New Password</label>
              <input type={showPw ? "text" : "password"} value={confirmPw} onChange={e => setConfirmPw(e.target.value)} style={inpStyle} placeholder="Repeat new password" />
            </div>
            <button onClick={savePassword} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#1a4d2e", color: "white", border: "none", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%", justifyContent: "center" }}>
              <Save size={14} />{saving ? "Changing..." : "Change Password"}
            </button>
          </div>
          <div style={{ ...cardStyle, marginTop: 16, background: "#fffbeb", border: "1px solid #fcd34d" }}>
            <p style={{ fontSize: 13, color: "#92400e" }}>
              💡 <strong>Forgot your password?</strong> Go to the <a href="/admin/login" style={{ color: "#1a4d2e", fontWeight: 600 }}>login page</a> and click "Forgot Password" to reset via OTP sent to your email and WhatsApp.
            </p>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
