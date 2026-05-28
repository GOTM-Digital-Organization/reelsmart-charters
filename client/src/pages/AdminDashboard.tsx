import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "wouter";
import {
  Anchor, Fish, Image, MessageSquare, Mail, Plus, Pencil, Trash2,
  Eye, EyeOff, LogOut, ChevronLeft, Star, Check, X
} from "lucide-react";
import { getLoginUrl } from "@/const";

// ── Auth Gate ─────────────────────────────────────────────────────────────────
function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="bg-navy-mid rounded-2xl p-8 max-w-sm w-full text-center border border-white/10">
          <div className="flex items-center justify-center mx-auto mb-4">
            <img
              src="/manus-storage/reel-smart-logo-transparent_724165ca.png"
              alt="Reel Smart Charters"
              className="h-20 w-auto object-contain rounded-lg"
              style={{ backgroundColor: '#ffffff', padding: '6px 12px' }}
            />
          </div>
          <h2 className="text-white font-heading text-xl font-bold mb-2">Admin Access</h2>
          <p className="text-white/50 text-sm mb-6">Sign in to manage your Reel Smart Charters website.</p>
          <a
            href={getLoginUrl()}
            className="btn-gold block w-full py-3 rounded text-sm text-center"
          >
            Sign In
          </a>
          <Link href="/" className="block mt-4 text-white/40 hover:text-gold text-sm transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="bg-navy-mid rounded-2xl p-8 max-w-sm w-full text-center border border-white/10">
          <h2 className="text-white font-heading text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-white/50 text-sm mb-6">You don't have admin permissions.</p>
          <Link href="/" className="btn-gold block w-full py-3 rounded text-sm text-center">
            Back to Site
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ── Charter Manager ───────────────────────────────────────────────────────────
function CharterManager() {
  const utils = trpc.useUtils();
  const { data: packages, isLoading } = trpc.charters.adminList.useQuery();
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "", description: "", duration: "", type: "", price: "",
    maxPassengers: "", badge: "", sortOrder: "0",
  });

  const createMut = trpc.charters.create.useMutation({
    onSuccess: () => { utils.charters.adminList.invalidate(); setShowForm(false); resetForm(); toast.success("Charter added!"); },
    onError: (e) => toast.error(e.message),
  });
  const updateMut = trpc.charters.update.useMutation({
    onSuccess: () => { utils.charters.adminList.invalidate(); setEditing(null); toast.success("Charter updated!"); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMut = trpc.charters.delete.useMutation({
    onSuccess: () => { utils.charters.adminList.invalidate(); toast.success("Charter deleted."); },
    onError: (e) => toast.error(e.message),
  });

  const resetForm = () => setForm({ name: "", description: "", duration: "", type: "", price: "", maxPassengers: "", badge: "", sortOrder: "0" });

  const startEdit = (pkg: NonNullable<typeof packages>[0]) => {
    setEditing(pkg.id);
    setForm({
      name: pkg.name, description: pkg.description, duration: pkg.duration,
      type: pkg.type, price: String(pkg.price), maxPassengers: String(pkg.maxPassengers),
      badge: pkg.badge || "", sortOrder: String(pkg.sortOrder),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name, description: form.description, duration: form.duration,
      type: form.type, price: parseInt(form.price), maxPassengers: parseInt(form.maxPassengers),
      badge: form.badge || undefined, sortOrder: parseInt(form.sortOrder),
    };
    if (editing !== null) {
      updateMut.mutate({ id: editing, ...data });
    } else {
      createMut.mutate(data);
    }
  };

  const FormFields = () => (
    <div className="grid grid-cols-2 gap-3">
      {[
        { key: "name", label: "Package Name", span: 2 },
        { key: "duration", label: "Duration (e.g. 4 Hours)" },
        { key: "type", label: "Type (e.g. Inshore)" },
        { key: "price", label: "Price ($)", type: "number" },
        { key: "maxPassengers", label: "Max Passengers", type: "number" },
        { key: "badge", label: "Badge (optional)" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ].map(({ key, label, span, type }) => (
        <div key={key} className={span === 2 ? "col-span-2" : ""}>
          <label className="block text-white/60 text-xs font-heading tracking-wider uppercase mb-1">{label}</label>
          <input
            type={type || "text"}
            value={(form as Record<string, string>)[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
          />
        </div>
      ))}
      <div className="col-span-2">
        <label className="block text-white/60 text-xs font-heading tracking-wider uppercase mb-1">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold resize-none"
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-heading text-lg font-semibold">Charter Packages</h3>
        <button onClick={() => { setShowForm(true); setEditing(null); resetForm(); }} className="btn-gold px-4 py-2 rounded text-xs flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Add Package
        </button>
      </div>

      {(showForm || editing !== null) && (
        <form onSubmit={handleSubmit} className="bg-navy rounded-xl p-5 mb-5 border border-gold/30">
          <h4 className="text-gold font-heading text-sm font-semibold mb-4">{editing !== null ? "Edit Package" : "New Package"}</h4>
          <FormFields />
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={createMut.isPending || updateMut.isPending} className="btn-gold px-5 py-2 rounded text-sm flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> {editing !== null ? "Save Changes" : "Add Package"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-2 rounded text-sm border border-white/20 text-white/60 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-navy rounded-xl h-16 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {packages?.map((pkg) => (
            <div key={pkg.id} className={`bg-navy rounded-xl p-4 border flex items-start gap-4 ${pkg.active ? "border-white/10" : "border-white/5 opacity-60"}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">{pkg.name}</span>
                  {pkg.badge && <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded font-heading">{pkg.badge}</span>}
                  {!pkg.active && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded">Hidden</span>}
                </div>
                <div className="text-white/40 text-xs">{pkg.duration} · {pkg.type} · ${pkg.price.toLocaleString()} · Up to {pkg.maxPassengers} pax</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateMut.mutate({ id: pkg.id, active: !pkg.active })} className="p-1.5 text-white/40 hover:text-gold transition-colors" title={pkg.active ? "Hide" : "Show"}>
                  {pkg.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => startEdit(pkg)} className="p-1.5 text-white/40 hover:text-gold transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => { if (confirm("Delete this package?")) deleteMut.mutate({ id: pkg.id }); }} className="p-1.5 text-white/40 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Gallery Manager ───────────────────────────────────────────────────────────
function GalleryManager() {
  const utils = trpc.useUtils();
  const { data: photos, isLoading } = trpc.gallery.adminList.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ url: "", caption: "", sortOrder: "0" });

  const createMut = trpc.gallery.create.useMutation({
    onSuccess: () => { utils.gallery.adminList.invalidate(); setShowForm(false); setForm({ url: "", caption: "", sortOrder: "0" }); toast.success("Photo added!"); },
    onError: (e) => toast.error(e.message),
  });
  const updateMut = trpc.gallery.update.useMutation({
    onSuccess: () => { utils.gallery.adminList.invalidate(); toast.success("Photo updated!"); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMut = trpc.gallery.delete.useMutation({
    onSuccess: () => { utils.gallery.adminList.invalidate(); toast.success("Photo removed."); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-heading text-lg font-semibold">Gallery Photos</h3>
        <button onClick={() => setShowForm(true)} className="btn-gold px-4 py-2 rounded text-xs flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Add Photo
        </button>
      </div>

      {showForm && (
        <form onSubmit={(e) => { e.preventDefault(); createMut.mutate({ url: form.url, caption: form.caption || undefined, sortOrder: parseInt(form.sortOrder) }); }}
          className="bg-navy rounded-xl p-5 mb-5 border border-gold/30">
          <h4 className="text-gold font-heading text-sm font-semibold mb-4">Add Photo</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-white/60 text-xs font-heading tracking-wider uppercase mb-1">Storage URL (e.g. /manus-storage/...)</label>
              <input type="text" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required
                className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 text-xs font-heading tracking-wider uppercase mb-1">Caption</label>
                <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-heading tracking-wider uppercase mb-1">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={createMut.isPending} className="btn-gold px-5 py-2 rounded text-sm flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Add Photo
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 rounded text-sm border border-white/20 text-white/60 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square bg-navy rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {photos?.map((photo) => (
            <div key={photo.id} className={`relative group rounded-lg overflow-hidden border ${photo.active ? "border-white/10" : "border-white/5 opacity-50"}`}>
              <img src={photo.url} alt={photo.caption || ""} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => updateMut.mutate({ id: photo.id, active: !photo.active })} className="p-1.5 bg-white/10 rounded text-white hover:text-gold transition-colors">
                  {photo.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => { if (confirm("Remove this photo?")) deleteMut.mutate({ id: photo.id }); }} className="p-1.5 bg-white/10 rounded text-white hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {!photo.active && (
                <div className="absolute top-1 right-1 bg-red-500/80 text-white text-xs px-1.5 py-0.5 rounded">Hidden</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Testimonial Manager ───────────────────────────────────────────────────────
function TestimonialManager() {
  const utils = trpc.useUtils();
  const { data: reviews, isLoading } = trpc.testimonials.adminList.useQuery();
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author: "", location: "", tripType: "", rating: "5", content: "", sortOrder: "0" });

  const createMut = trpc.testimonials.create.useMutation({
    onSuccess: () => { utils.testimonials.adminList.invalidate(); setShowForm(false); resetForm(); toast.success("Testimonial added!"); },
    onError: (e) => toast.error(e.message),
  });
  const updateMut = trpc.testimonials.update.useMutation({
    onSuccess: () => { utils.testimonials.adminList.invalidate(); setEditing(null); toast.success("Testimonial updated!"); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMut = trpc.testimonials.delete.useMutation({
    onSuccess: () => { utils.testimonials.adminList.invalidate(); toast.success("Testimonial deleted."); },
    onError: (e) => toast.error(e.message),
  });

  const resetForm = () => setForm({ author: "", location: "", tripType: "", rating: "5", content: "", sortOrder: "0" });

  const startEdit = (r: NonNullable<typeof reviews>[0]) => {
    setEditing(r.id);
    setForm({ author: r.author, location: r.location || "", tripType: r.tripType || "", rating: String(r.rating), content: r.content, sortOrder: String(r.sortOrder) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { author: form.author, location: form.location || undefined, tripType: form.tripType || undefined, rating: parseInt(form.rating), content: form.content, sortOrder: parseInt(form.sortOrder) };
    if (editing !== null) updateMut.mutate({ id: editing, ...data });
    else createMut.mutate(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-heading text-lg font-semibold">Testimonials</h3>
        <button onClick={() => { setShowForm(true); setEditing(null); resetForm(); }} className="btn-gold px-4 py-2 rounded text-xs flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Add Review
        </button>
      </div>

      {(showForm || editing !== null) && (
        <form onSubmit={handleSubmit} className="bg-navy rounded-xl p-5 mb-5 border border-gold/30">
          <h4 className="text-gold font-heading text-sm font-semibold mb-4">{editing !== null ? "Edit Testimonial" : "New Testimonial"}</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "author", label: "Author Name" },
              { key: "location", label: "Location" },
              { key: "tripType", label: "Trip Type" },
              { key: "rating", label: "Rating (1-5)", type: "number" },
              { key: "sortOrder", label: "Sort Order", type: "number" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-white/60 text-xs font-heading tracking-wider uppercase mb-1">{label}</label>
                <input type={type || "text"} value={(form as Record<string, string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold" min={type === "number" ? "1" : undefined} max={key === "rating" ? "5" : undefined} />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-white/60 text-xs font-heading tracking-wider uppercase mb-1">Review Content</label>
              <textarea rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required
                className="w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={createMut.isPending || updateMut.isPending} className="btn-gold px-5 py-2 rounded text-sm flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> {editing !== null ? "Save Changes" : "Add Review"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-2 rounded text-sm border border-white/20 text-white/60 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-navy rounded-xl h-20 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {reviews?.map((r) => (
            <div key={r.id} className={`bg-navy rounded-xl p-4 border flex items-start gap-4 ${r.active ? "border-white/10" : "border-white/5 opacity-60"}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">{r.author}</span>
                  <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-gold text-gold" />)}</div>
                  {!r.active && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded">Hidden</span>}
                </div>
                <p className="text-white/50 text-xs line-clamp-2">{r.content}</p>
                {(r.tripType || r.location) && <div className="text-white/30 text-xs mt-1">{[r.tripType, r.location].filter(Boolean).join(" · ")}</div>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateMut.mutate({ id: r.id, active: !r.active })} className="p-1.5 text-white/40 hover:text-gold transition-colors">
                  {r.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => startEdit(r)} className="p-1.5 text-white/40 hover:text-gold transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => { if (confirm("Delete this review?")) deleteMut.mutate({ id: r.id }); }} className="p-1.5 text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Inquiries Manager ─────────────────────────────────────────────────────────
function InquiriesManager() {
  const utils = trpc.useUtils();
  const { data: inquiries, isLoading } = trpc.contact.adminList.useQuery();
  const markReadMut = trpc.contact.markRead.useMutation({
    onSuccess: () => utils.contact.adminList.invalidate(),
  });

  const unread = inquiries?.filter((i) => !i.read).length ?? 0;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-white font-heading text-lg font-semibold">Booking Inquiries</h3>
        {unread > 0 && (
          <span className="bg-gold text-navy text-xs font-heading font-bold px-2 py-0.5 rounded-full">{unread} new</span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-navy rounded-xl h-24 animate-pulse" />)}</div>
      ) : inquiries?.length === 0 ? (
        <div className="text-center py-12 text-white/30">
          <Mail className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...(inquiries || [])].reverse().map((inq) => (
            <div key={inq.id} className={`bg-navy rounded-xl p-4 border ${!inq.read ? "border-gold/30" : "border-white/10"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{inq.name}</span>
                    {!inq.read && <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded font-heading">New</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 text-white/50 text-xs mb-2">
                    <a href={`mailto:${inq.email}`} className="hover:text-gold transition-colors">{inq.email}</a>
                    {inq.phone && <span>{inq.phone}</span>}
                    {inq.preferredDate && <span>Date: {inq.preferredDate}</span>}
                    {inq.groupSize && <span>Group: {inq.groupSize}</span>}
                  </div>
                  {inq.message && <p className="text-white/60 text-sm">{inq.message}</p>}
                  <p className="text-white/30 text-xs mt-2">{new Date(inq.createdAt).toLocaleString()}</p>
                </div>
                {!inq.read && (
                  <button onClick={() => markReadMut.mutate({ id: inq.id })} className="flex-shrink-0 p-1.5 text-white/40 hover:text-gold transition-colors" title="Mark as read">
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
type Tab = "charters" | "gallery" | "testimonials" | "inquiries";

function Dashboard() {
  const [tab, setTab] = useState<Tab>("charters");
  const { user, logout } = useAuth();
  const { data: inquiries } = trpc.contact.adminList.useQuery();
  const unread = inquiries?.filter((i) => !i.read).length ?? 0;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "charters", label: "Charters", icon: Fish },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "testimonials", label: "Reviews", icon: MessageSquare },
    { id: "inquiries", label: "Inquiries", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-navy-mid">
      {/* Header */}
      <header className="bg-navy border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center group">
            <img
              src="/manus-storage/reel-smart-logo-transparent_724165ca.png"
              alt="Reel Smart Charters"
              className="h-10 w-auto object-contain rounded-md"
              style={{ backgroundColor: '#ffffff', padding: '3px 6px' }}
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm hidden md:block">{user?.name || user?.email}</span>
          <Link href="/" className="flex items-center gap-1.5 text-white/50 hover:text-gold text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> View Site
          </Link>
          <button onClick={logout} className="flex items-center gap-1.5 text-white/50 hover:text-red-400 text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="container py-8">
        {/* Tab nav */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading text-sm tracking-wider transition-all duration-150 ${
                tab === id ? "bg-gold text-navy font-bold" : "bg-navy text-white/60 hover:text-white border border-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {id === "inquiries" && unread > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${tab === id ? "bg-navy text-gold" : "bg-gold text-navy"}`}>{unread}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-navy-mid rounded-2xl p-6 border border-white/10">
          {tab === "charters" && <CharterManager />}
          {tab === "gallery" && <GalleryManager />}
          {tab === "testimonials" && <TestimonialManager />}
          {tab === "inquiries" && <InquiriesManager />}
        </div>
      </div>
    </div>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  return (
    <AuthGate>
      <Dashboard />
    </AuthGate>
  );
}
