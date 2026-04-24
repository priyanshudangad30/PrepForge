import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Code2,
  Terminal,
  BarChart3,
  BookOpen,
  ChevronRight,
  Cpu,
  Globe,
  Zap,
  Target,
  Flame,
  Trophy,
  ArrowRight
} from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0D0B21] text-white selection:bg-violet-500/30 font-sans overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      </div>


      {/* Hero Section */}
      <section className="relative z-10 p-20 h-[60vh] flex justify-center items-center container-symmetrical">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8 animate-slide-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-violet-400 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <Zap size={14} className="animate-pulse" />
              Empowering Future Developers
            </div>

            <h1 className="text-xl md:text-5xl font-black leading-tight tracking-tighter">
              Interview prep &
              <span className="gradient-text"> Coding</span> <br />
              Platform
            </h1>

            <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-medium">
              PrepForge is a specialization for the coding stream. We use advanced algorithms, symmetrical design, and high-performance tools to create the best learning experience.
            </p>

            <div className="pt-6">
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="px-10 py-5 bg-violet-600 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-violet-500 transition-all shadow-2xl shadow-purple-600/30 group w-fit text-lg uppercase tracking-widest"
              >
                {user ? "Go to Dashboard" : "JOIN US"} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Dynamic Auth/Welcome Box */}
          <div className="relative group animate-fade-in">
            <div className="absolute inset-0 bg-violet-600/20 blur-[120px] rounded-full group-hover:bg-violet-600/30 transition-all" />
            <div className="relative glass p-10 md:p-12 border-white/10 shadow-2xl bg-black/40 backdrop-blur-2xl rounded-[40px]">
              {user ? (
                <div className="space-y-8 text-center py-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 mx-auto flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-purple-500/40 animate-pulse-glow">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Welcome Back,</h2>
                    <p className="text-xl font-black gradient-text uppercase tracking-widest">{user.name}</p>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Ready to pick up where you left off? Your next challenge is waiting in the vault.
                  </p>
                  <Link
                    to="/dashboard"
                    className="block w-full py-5 bg-white text-[#0D0B21] rounded-2xl font-black text-lg hover:bg-violet-50 transition-all active:scale-95 uppercase tracking-widest"
                  >
                    Enter Platform
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Login Here</h2>
                    <div className="w-20 h-1 bg-violet-500 mx-auto rounded-full" />
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username / Email</label>
                      <input
                        type="text"
                        placeholder="Enter your email"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 transition-all font-bold"
                      />
                    </div>
                  </div>

                  <button className="w-full py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all active:scale-95 uppercase tracking-widest">
                    Login
                  </button>

                  <div className="text-center space-y-4">
                    <p className="text-sm text-slate-400 font-medium">
                      Don't have an account? <Link to="/signup" className="text-violet-400 hover:underline">Sign up</Link> here
                    </p>

                    <div className="flex items-center gap-4 py-2">
                      <div className="flex-1 h-px bg-white/5" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Log in with</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <div className="flex justify-center gap-6 pt-2">
                      {[FaFacebook, FaInstagram, FaXTwitter, FaGithub].map((Icon, i) => (
                        <button key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group">
                          <Icon size={20} className="group-hover:scale-110 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 relative z-10 container-symmetrical max-w-7xl mx-auto px-4">
        <div className="space-y-4 mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center">Built for <span className="gradient-text">Top Engineers</span></h2>
          <p className="text-slate-400 text-lg text-center ">
            Cadstrom-inspired design system meets high-performance coding tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-15 ">
          {[
            {
              title: "Onerous Details",
              desc: "We check the small things that common platforms miss in your logic.",
              icon: Cpu,
              gradient: "from-violet-500 to-indigo-600"
            },
            {
              title: "Symmetric UX",
              desc: "A perfectly aligned interface that reduces cognitive load while you code.",
              icon: Globe,
              gradient: "from-fuchsia-500 to-rose-600"
            },
            {
              title: "Real Impact",
              desc: "Proven tools to help your team focus on solving the truly hard problems.",
              icon: Target,
              gradient: "from-blue-500 to-violet-600"
            },
            {
              title: "Revision Vault",
              desc: "Store and refine your technical notes with a persistent knowledge base.",
              icon: BookOpen,
              gradient: "from-emerald-500 to-teal-600"
            },
            {
              title: "Deep Metrics",
              desc: "Granular breakdown of your strengths and weaknesses across all topics.",
              icon: BarChart3,
              gradient: "from-amber-500 to-orange-600"
            },
            {
              title: "Modern Stack",
              desc: "Built with the latest technologies to ensure a fast, responsive experience.",
              icon: Terminal,
              gradient: "from-indigo-500 to-violet-600"
            }
          ].map((f, i) => (
            <div key={i} className="glass p-12 hover:bg-white/[0.05] transition-all hover:-translate-y-2 group border-white/5">
              <div className={`w-16 h-16 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform`}>
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-5 tracking-tight uppercase">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges Preview Section */}
      <section id="problems" className="py-40 relative z-10 container-symmetrical h-[50vh]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center w-[80vw]">Curated <span className="gradient-text">Challenges</span></h2>
            <p className="text-slate-500 text-lg max-w-xl font-medium">Daily hand-picked algorithm problems designed to challenge your mental models.</p>
          </div>
          <Link to="/problems" className="flex items-center gap-3 text-violet-400 font-black uppercase tracking-widest text-xs hover:text-white transition-colors group">
            View Library <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Recursive Backtracking", level: "Hard", cat: "Algorithms", acceptance: "24%" },
            { title: "Dynamic Tree Pruning", level: "Medium", cat: "Data Structures", acceptance: "48%" },
            { title: "Memory-Safe Pointers", level: "Easy", cat: "Systems", acceptance: "82%" }
          ].map((p, i) => (
            <div key={i} className="glass group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-10">
                <span className={`text-[10px] font-black px-3 py-1 rounded-md border ${p.level === "Hard" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                  p.level === "Medium" ? "bg-violet-500/10 text-violet-400 border-violet-500/20" :
                    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  } uppercase tracking-widest`}>{p.level}</span>
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{p.cat}</div>
              </div>
              <h4 className="text-xl font-black text-white mb-6 group-hover:text-violet-400 transition-colors uppercase tracking-tight">{p.title}</h4>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Success Rate</span>
                  <span className="text-white font-black">{p.acceptance}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Streak & Community Section */}
      <section id="community" className="py-40 relative z-10 container-symmetrical overflow-x-hidden h-[50vh]">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-violet-600/20 blur-[100px] rounded-full" />
            <div className="glass p-10 border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">Active Streak</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Consistency is key</p>
                  </div>
                </div>
                <span className="text-3xl font-black text-white tracking-tighter">148 DAYS</span>
              </div>
              {/* Activity Grid Mockup */}
              <div className="grid grid-cols-12 gap-2">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 rounded-sm ${i % 7 === 0 ? "bg-violet-600 shadow-[0_0_8px_rgba(139,92,246,0.5)]" :
                      i % 4 === 0 ? "bg-violet-800" :
                        i % 3 === 0 ? "bg-violet-900" :
                          "bg-white/5"
                      }`}
                  />
                ))}
              </div>
              <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-700 uppercase tracking-widest">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
              </div>
            </div>
          </div>

          <div className="space-y-10 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/10 border border-violet-600/20 text-violet-400 text-[10px] font-black uppercase tracking-widest">
              <Trophy size={14} /> Leaderboard Integration
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Master <br /> the <span className="gradient-text">Consistency</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Track your daily progress with our advanced activity mapping system. Compete with top engineers globally and maintain your streak to unlock exclusive platform badges.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-black text-white mb-2 tracking-tighter">50K+</div>
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Active Coders</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-2 tracking-tighter">1M+</div>
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Problems Solved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 container-symmetrical relative overflow-hidden h-[50vh]">
        <div className="absolute inset-0 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="glass p-24 text-center space-y-12 border-white/5 relative z-10 bg-white/[0.02]">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Ready to master <br /> your <span className="gradient-text">potential?</span></h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">Join the next generation of engineers who are already mastering their craft on PrepForge.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
            <Link to="/signup" className="px-12 py-6 bg-white text-[#0D0B21] rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-white/10">
              Create Free Account
            </Link>
            <Link to="/problems" className="text-white font-bold text-xl flex items-center gap-2 hover:text-violet-400 transition-colors">
              Browse Challenges <ChevronRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 text-slate-500 text-sm container-symmetrical relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3 font-bold text-white text-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Code2 size={24} className="text-violet-500" />
            </div>
            PrepForge
          </div>
          <div className="flex gap-12 font-bold uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="font-mono text-[10px]">© 2025 PREPFORGE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
