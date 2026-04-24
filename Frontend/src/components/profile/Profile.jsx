import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import { User, Mail, Calendar, Award, Code2, Flame } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
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
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="skeleton h-48 rounded-2xl"></div>
        <div className="skeleton h-32 rounded-2xl"></div>
      </div>
    );
  }

  const stats = data?.stats || {};

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100">
        <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="px-6 pb-6 -mt-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-3">{user?.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Mail size={14} /> {user?.email}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> Joined{" "}
              {data?.user?.createdAt
                ? new Date(data.user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 text-center">
          <Code2 size={24} className="text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-900">
            {stats.totalSolved || 0}
          </div>
          <div className="text-xs text-slate-500">Problems Solved</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 text-center">
          <Flame size={24} className="text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-900">
            {stats.streak?.current || 0}
          </div>
          <div className="text-xs text-slate-500">Day Streak</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 text-center">
          <Award size={24} className="text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-slate-900">
            {stats.streak?.max || 0}
          </div>
          <div className="text-xs text-slate-500">Best Streak</div>
        </div>
      </div>
    </div>
  );
}
