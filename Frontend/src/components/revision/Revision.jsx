import { useState, useEffect } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import {
  BookOpen,
  Plus,
  Search,
  X,
  Save,
  Trash2,
  Tag,
} from "lucide-react";

export default function Revision() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", tags: "" });

  const fetchNotes = async () => {
    try {
      const res = await API.get("/revision", { params: { search } });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, [search]);

  const handleSave = async () => {
    if (!form.title || !form.content) return toast.error("Title and content required");
    try {
      const tagArr = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      if (editNote) {
        await API.put(`/revision/${editNote._id}`, { ...form, tags: tagArr });
        toast.success("Note updated!");
      } else {
        await API.post("/revision", { ...form, tags: tagArr });
        toast.success("Note saved!");
      }
      setShowEditor(false);
      setEditNote(null);
      setForm({ title: "", content: "", tags: "" });
      fetchNotes();
    } catch (err) {
      toast.error("Failed to save note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/revision/${id}`);
      toast.success("Note deleted");
      fetchNotes();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const openEdit = (note) => {
    setEditNote(note);
    setForm({ title: note.title, content: note.content, tags: note.tags?.join(", ") || "" });
    setShowEditor(true);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in space-y-12 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Revision <span className="gradient-text">Vault</span></h1>
          <p className="text-slate-500 mt-2 text-lg">
             Manage your persistent knowledge and interview notes.
          </p>
        </div>
        <button
          onClick={() => { setShowEditor(true); setEditNote(null); setForm({ title: "", content: "", tags: "" }); }}
          className="flex items-center gap-2 bg-violet-600 text-white px-8 py-3 rounded-full text-xs font-black shadow-2xl shadow-purple-600/20 uppercase tracking-widest hover:bg-violet-500 transition-all active:scale-95"
        >
          <Plus size={18} /> New Entry
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="glass flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex-1 min-w-[320px] focus-within:border-violet-500/50 transition-all group shadow-2xl">
          <Search size={20} className="text-slate-500 group-focus-within:text-violet-400" />
          <input
            type="text"
            placeholder="Search your notes by title, content or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-600 flex-1"
          />
        </div>
        <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
           Total entries: {notes.length}
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-fade-in">
          <div className="glass w-full max-w-3xl border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden bg-[#0D0B21]/90">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 -z-10" />
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                {editNote ? "Edit Entry" : "New Entry"}
              </h2>
              <button onClick={() => setShowEditor(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Title</label>
                <input
                  type="text"
                  placeholder="Note title (e.g. Dynamic Programming Patterns)"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Content (Markdown Supported)</label>
                <textarea
                  placeholder="Write your technical notes here..."
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-all resize-none font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="arrays, algorithms, hard"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-4 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all active:scale-95 uppercase tracking-widest"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-64 rounded-[40px]"></div>)}
        </div>
      ) : notes.length === 0 ? (
        <div className="glass text-center py-32 space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-2xl">
             <BookOpen size={48} className="text-slate-700" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">No entries recorded</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Your technical vault is empty. Start by creating your first technical revision note.</p>
          <button
            onClick={() => setShowEditor(true)}
            className="text-sm font-black text-violet-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
             Initialize Vault +
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {notes.map((note) => (
            <div
              key={note._id}
              className="glass hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden flex flex-col min-h-[300px]"
              onClick={() => openEdit(note)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                   <Tag size={20} className="text-white" />
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(note._id); }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-violet-400 transition-colors mb-4 tracking-tight">
                {note.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-4 flex-1 mb-6">
                {note.content}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {note.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black bg-white/5 text-slate-500 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-widest group-hover:border-violet-500/20 group-hover:text-violet-400 transition-colors"
                    >
                       {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest whitespace-nowrap ml-4">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
