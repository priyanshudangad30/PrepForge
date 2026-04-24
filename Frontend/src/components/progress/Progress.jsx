import { useState, useEffect } from "react";
import API from "../../api/axios";
import { BarChart3, TrendingUp } from "lucide-react";

export default function Progress() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/progress/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        {[1, 2, 3].map((i) => <div key={i} className="skeleton h-32 rounded-2xl"></div>)}
      </div>
    );
  }

  const stats = data?.stats || {};
  const catBreakdown = stats.categoryBreakdown || {};
  const diffBreakdown = stats.difficultyBreakdown || {};

  return (
    <div className="w-full mx-auto animate-fade-in space-y-12 pb-20">
      {/* Page Header */}
      <div className="px-4 ">
        <h1 className="text-4xl font-black text-center text-white tracking-tight">Performance <span className="gradient-text">Metrics</span></h1>
        <p className="text-slate-500 mt-2 text-center text-lg">Detailed analytical breakdown of your coding performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Overall Progress Circle */}
        <div className="glass lg:col-span-1 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 -z-10 group-hover:opacity-100 transition-opacity opacity-50" />
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-10">Overall Mastery</h2>
          
          <div className="relative w-48 h-48 mx-auto mb-10">
            <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_20px_rgba(139,92,246,0.2)]" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="none" stroke="url(#purpleGradient)" strokeWidth="3" strokeDasharray={`${stats.totalProblems ? Math.round(((stats.totalSolved || 0) / stats.totalProblems) * 100) : 0}, 100`} strokeLinecap="round" className="transition-all duration-1000" />
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#D946EF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white tracking-tighter">{stats.totalSolved || 0}</span>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">OF {stats.totalProblems || 0} SOLVED</span>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 space-y-4">
             <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span>Success Rate</span>
                <span className="text-white">{stats.totalProblems ? Math.round((stats.totalSolved / stats.totalProblems) * 100) : 0}%</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500" style={{ width: `${stats.totalProblems ? (stats.totalSolved / stats.totalProblems) * 100 : 0}%` }} />
             </div>
          </div>
        </div>

        {/* Difficulty & Categories */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass">
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
              <TrendingUp size={24} className="text-violet-400" /> Difficulty Breakdown
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {["Easy", "Medium", "Hard"].map((d) => {
                const info = diffBreakdown[d] || { solved: 0, total: 0 };
                const pct = info.total > 0 ? (info.solved / info.total) * 100 : 0;
                const colors = { 
                   Easy: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]", 
                   Medium: "bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]", 
                   Hard: "bg-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                };
                const textColors = { Easy: "text-emerald-400", Medium: "text-violet-400", Hard: "text-rose-400" };
                return (
                  <div key={d} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className={`text-xs font-black uppercase tracking-widest ${textColors[d]}`}>{d}</span>
                      <span className="text-xl font-black text-white tracking-tighter">{info.solved}<span className="text-[10px] text-slate-600 ml-1">/{info.total}</span></span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <div className={`h-full rounded-full ${colors[d]} transition-all duration-1000`} style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
                       {Math.round(pct)}% Mastery
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass">
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
              <BarChart3 size={24} className="text-violet-400" /> Category Analysis
            </h2>
            <div className="space-y-6">
              {Object.entries(catBreakdown).map(([cat, info]) => {
                const pct = info.total > 0 ? (info.solved / info.total) * 100 : 0;
                return (
                  <div key={cat} className="group">
                    <div className="flex justify-between text-xs mb-3">
                      <span className="font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{cat}</span>
                      <span className="font-black text-white tracking-widest">{info.solved} / {info.total}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-600/50 to-violet-500 transition-all duration-1000 group-hover:from-violet-500 group-hover:to-fuchsia-500 shadow-[0_0_10px_rgba(139,92,246,0.1)]" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
