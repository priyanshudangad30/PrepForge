import { useState, useEffect } from "react";
import API from "../../api/axios";
import { Flame, Trophy, Calendar, TrendingUp } from "lucide-react";

export default function Streak() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/progress/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div className="skeleton h-48 rounded-2xl"></div>
      </div>
    );
  }

  const streak = data?.stats?.streak || {};
  const activity = data?.activityData || [];

  const today = new Date();
  const days = [];
  for (let i = 179; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const found = activity.find((a) => a._id === dateStr);
    days.push({ date: dateStr, count: found?.count || 0 });
  }

  const getIntensity = (count) => {
    if (count === 0) return "bg-slate-100";
    if (count === 1) return "bg-emerald-200";
    if (count <= 3) return "bg-emerald-400";
    return "bg-emerald-600";
  };

  return (
    <div className="w-full flex justify-center flex-col items-center animate-fade-in space-y-12 pb-20 px-6">
      {/* Page Header */}
      <div >
        <h1 className="text-4xl font-black text-white tracking-tight text-center w-full">Activity <span className="gradient-text">Milestones</span></h1>
        <p className="text-slate-500 mt-2 text-lg text-center w-full mt-4">Track your consistency and maintain your daily momentum.</p>
      </div>

      {/* Streak Hero Card */}
      <div className="w-[84vw] glass text-center relative overflow-hidden group  flex flex-col justify-center items-center p-10 md:p-14">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 -z-10 group-hover:opacity-100 transition-opacity opacity-50 w-full"  />
        <div className="w-28 h-28 rounded-[40px] bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/30 group-hover:scale-110 transition-transform duration-700">
           <Flame size={56} className="text-white drop-shadow-lg" />
        </div>
        <div className="text-8xl font-black text-white mb-3 tracking-tighter">{streak.current || 0}</div>
        <div className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">Current Daily Streak</div>
        
        <div className="flex items-center justify-center gap-16 mt-12">
          <div className="text-center">
             <div className="text-xl font-black text-white flex items-center gap-3 justify-center">
                <Trophy size={20} className="text-amber-400" /> {streak.max || 0}
             </div>
             <div className="text-[10px] text-slate-600 uppercase tracking-widest mt-2 font-black">All-Time High</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
             <div className="text-xl font-black text-white flex items-center gap-3 justify-center">
                <Calendar size={20} className="text-violet-400" /> 
                {streak.lastSolvedDate ? new Date(streak.lastSolvedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : "N/A"}
             </div>
             <div className="text-[10px] text-slate-600 uppercase tracking-widest mt-2 font-black">Last Contribution</div>
          </div>
        </div>
      </div>

      {/* Activity Map */}
      <div className="glass max-w-7xl mx-auto p-10 md:p-14">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <TrendingUp size={24} className="text-violet-400" /> Contribution Matrix
          </h2>
          <div className="flex items-center gap-5 text-[10px] text-slate-600 font-black uppercase tracking-widest">
            <span>Less</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-white/5" />
              <div className="w-4 h-4 rounded-[4px] bg-violet-900/40" />
              <div className="w-4 h-4 rounded-[4px] bg-violet-700/60" />
              <div className="w-4 h-4 rounded-[4px] bg-violet-500" />
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-6">
          <div className="flex flex-wrap gap-2 ">
            {days.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                className={`w-4 h-4 rounded-[4px] transition-all duration-500 hover:scale-150 hover:z-10 cursor-help ${
                  day.count === 0 ? "bg-white/5" : 
                  day.count === 1 ? "bg-violet-900/40" : 
                  day.count <= 3 ? "bg-violet-700/60 shadow-[0_0_10px_rgba(139,92,246,0.3)]" : 
                  "bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
           <div className="text-sm font-black text-white uppercase tracking-widest text-[10px]">
              Continuous monitoring of performance metrics
           </div>
           <div className="flex items-center gap-6">
              <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                 Export Logs
              </button>
              <button className="text-[10px] font-black text-violet-400 uppercase tracking-widest hover:text-violet-300 transition-colors">
                 Sync Data
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
