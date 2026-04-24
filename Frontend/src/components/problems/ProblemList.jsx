import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Code2,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function ProblemList() {
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: "All",
    category: "All",
    search: "",
    status: "All",
  });
  const [solvedIds, setSolvedIds] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [probRes, catRes] = await Promise.all([
          API.get("/problems"),
          API.get("/problems/categories"),
        ]);
        setProblems(probRes.data);
        setCategories(catRes.data);

        if (user) {
          const meRes = await API.get("/auth/me");
          setSolvedIds(new Set(meRes.data.solvedProblems?.map((p) => p._id || p) || []));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const filteredProblems = problems.filter((p) => {
    if (filters.difficulty !== "All" && p.difficulty !== filters.difficulty) return false;
    if (filters.category !== "All" && p.category !== filters.category) return false;
    if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.status === "Solved" && !solvedIds.has(p._id)) return false;
    if (filters.status === "Unsolved" && solvedIds.has(p._id)) return false;
    return true;
  });

  const diffColor = {
    Easy: "bg-emerald-50 text-emerald-600",
    Medium: "bg-amber-50 text-amber-600",
    Hard: "bg-red-50 text-red-500",
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="skeleton h-10 w-48 rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-xl"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton h-16 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Challenge <span className="gradient-text">Library</span></h1>
          <p className="text-slate-500 mt-2 text-lg">
            {problems.length} challenges available · {solvedIds.size} mastered
          </p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-6 py-2.5 bg-violet-600 text-white rounded-full text-xs font-black shadow-2xl shadow-purple-600/20 uppercase tracking-widest">
              Level Up Your Skills
           </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex-1 min-w-[320px] focus-within:border-violet-500/50 transition-all group shadow-2xl">
          <Search size={20} className="text-slate-500 group-focus-within:text-violet-400" />
          <input
            type="text"
            placeholder="Search problems by name or category..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-600 flex-1"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            className="bg-white/5 border border-white/10 text-white rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-violet-500/50 transition-all cursor-pointer hover:bg-white/10 uppercase tracking-widest"
          >
            <option value="All" className="bg-[#0D0B21]">All Difficulty</option>
            <option value="Easy" className="bg-[#0D0B21]">Easy</option>
            <option value="Medium" className="bg-[#0D0B21]">Medium</option>
            <option value="Hard" className="bg-[#0D0B21]">Hard</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="bg-white/5 border border-white/10 text-white rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-violet-500/50 transition-all cursor-pointer hover:bg-white/10 uppercase tracking-widest"
          >
            <option value="All" className="bg-[#0D0B21]">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0D0B21]">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problem Table */}
      <div className="glass overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header */}
            <div className="grid grid-cols-12 gap-6 px-10 py-8 bg-white/5 border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              <div className="col-span-1">Status</div>
              <div className="col-span-5">Challenge Title</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-2 text-right">Success Rate</div>
            </div>

            {filteredProblems.length === 0 ? (
              <div className="text-center py-24 text-slate-600">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-2xl">
                   <Filter size={40} className="text-slate-700" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">No results found</h3>
                <p className="text-slate-500 mt-2">Adjust your filters to see more challenges.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredProblems.map((problem) => {
                  const isSolved = solvedIds.has(problem._id);
                  return (
                    <Link
                      key={problem._id}
                      to={`/problems/${problem.slug}`}
                      className="grid grid-cols-12 gap-6 px-10 py-8 items-center hover:bg-white/[0.03] transition-all group border-b border-white/5 last:border-b-0"
                    >
                      <div className="col-span-1">
                        {isSolved ? (
                          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                            <CheckCircle2 size={24} className="text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                            <Circle size={24} className="text-slate-800 group-hover:text-slate-600" />
                          </div>
                        )}
                      </div>
                      <div className="col-span-5">
                        <span className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                          {problem.title}
                        </span>
                        <div className="flex gap-2 mt-2">
                           <span className="text-[10px] font-black text-slate-600 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 uppercase tracking-widest">Algorithm</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] font-black text-slate-500 bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-[0.1em] border border-white/5">
                          {problem.category}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border ${
                            problem.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : problem.difficulty === "Medium"
                              ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                         <div className="flex flex-col items-end gap-2">
                            <div className="h-1.5 w-20 bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-violet-500/50 shadow-[0_0_8px_rgba(139,92,246,0.3)]" style={{ width: `${problem.acceptance || 60}%` }} />
                            </div>
                            <span className="text-xs font-black text-white tracking-widest">{problem.acceptance || 0}%</span>
                         </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
