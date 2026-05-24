import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Users, BookmarkCheck, Sparkles, TrendingUp, ChevronRight,
  BarChart2, ListFilter, GraduationCap, Building2, ArrowUpDown
} from "lucide-react";
import { MOCK_STUDENTS, MOCK_COMPANY_STATS } from "../data/mock";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

type Tab = "dashboard" | "list" | "stats";
type SortKey = "name" | "university" | "grade" | "jobInterest";

const GRADE_ORDER = ["学部1年", "学部2年", "学部3年", "学部4年", "修士1年", "修士2年"];
const JOB_ORDER = ["興味あり", "検討中", "今は考えていない"];
const JOB_COLOR: Record<string, string> = {
  "興味あり": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "検討中": "bg-amber-50 text-amber-700 border-amber-200",
  "今は考えていない": "bg-slate-50 text-slate-600 border-slate-200",
};

export function CompanyDashboard() {
  const [tab, setTab] = useState<Tab>("dashboard");

  const bookmarked = useMemo(() => MOCK_STUDENTS.filter(s => s.isBookmarked), []);

  const universityStats = useMemo(() => {
    const map: Record<string, number> = {};
    MOCK_STUDENTS.forEach(s => { map[s.university] = (map[s.university] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, []);

  const gradeStats = useMemo(() => {
    const map: Record<string, number> = {};
    MOCK_STUDENTS.forEach(s => { map[s.grade] = (map[s.grade] || 0) + 1; });
    return GRADE_ORDER.filter(g => map[g]).map(g => ({ name: g, count: map[g] || 0 }));
  }, []);

  const jobStats = useMemo(() => [
    { name: "興味あり", count: MOCK_STUDENTS.filter(s => s.jobInterest === "興味あり").length, color: "#10b981" },
    { name: "検討中", count: MOCK_STUDENTS.filter(s => s.jobInterest === "検討中").length, color: "#f59e0b" },
    { name: "今は考えていない", count: MOCK_STUDENTS.filter(s => s.jobInterest === "今は考えていない").length, color: "#94a3b8" },
  ], []);

  const interestPercent = Math.round((jobStats[0].count / MOCK_STUDENTS.length) * 100);

  const tabs = [
    { key: "dashboard" as Tab, label: "概要", icon: BarChart2 },
    { key: "list" as Tab, label: "参加者一覧", icon: ListFilter },
    { key: "stats" as Tab, label: "統計・分析", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ダッシュボード</h1>
        <p className="text-sm text-slate-500 mt-1">AstroCamp 2026 の参加者データとブックマーク状況</p>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <DashboardTab bookmarked={bookmarked} interestPercent={interestPercent} />
      )}
      {tab === "list" && <StudentListTab />}
      {tab === "stats" && (
        <StatsTab
          universityStats={universityStats}
          gradeStats={gradeStats}
          jobStats={jobStats}
          interestPercent={interestPercent}
        />
      )}
    </div>
  );
}

// ─── 概要タブ ───────────────────────────────────────────────────────────────
function DashboardTab({ bookmarked, interestPercent }: { bookmarked: typeof MOCK_STUDENTS; interestPercent: number }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Users} colorKey="indigo" label="総登録参加者数" value={String(MOCK_STUDENTS.length)} unit="名" />
        <StatCard icon={BookmarkCheck} colorKey="amber" label="ブックマーク済" value={String(bookmarked.length)} unit="名" />
        <StatCard icon={TrendingUp} colorKey="emerald" label="インターン興味あり層" value={String(interestPercent)} unit="%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-amber-500" />
              ブックマークリスト
            </h2>
            <Link to="/company/bookmarks" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              すべて見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {bookmarked.slice(0, 5).map(s => <CompactStudentRow key={s.id} student={s} />)}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              新着の参加者
            </h2>
            <Link to="/company/students" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              参加者一覧へ <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_STUDENTS.slice(0, 3).map(s => (
              <div key={s.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate pr-2">{s.name}</h3>
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">1日前</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{s.university} {s.faculty}</p>
                  <p className="text-xs text-slate-700 mt-1 truncate italic">"{s.catchphrase}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-bold text-slate-900">スキル・興味分野の分布</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {MOCK_COMPANY_STATS.skillDistribution.map(item => {
            const ratio = item.count / MOCK_COMPANY_STATS.skillDistribution[0].count;
            const cls = ratio > 0.8
              ? "text-base px-4 py-2 font-bold bg-indigo-100 text-indigo-800 border-indigo-200"
              : ratio > 0.5
              ? "text-sm px-3 py-1.5 font-medium bg-indigo-50 text-indigo-700 border-indigo-100"
              : "text-xs px-2 py-1 bg-slate-50 text-slate-600 border-slate-200";
            return (
              <div key={item.tag} className={`rounded-lg border shadow-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer ${cls}`}>
                <span>{item.tag}</span>
                <span className="opacity-60 text-[0.8em] bg-white/50 px-1.5 rounded-md">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── 参加者一覧タブ ─────────────────────────────────────────────────────────
function StudentListTab() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(v => !v);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = useMemo(() => {
    return [...MOCK_STUDENTS].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "grade") cmp = GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade);
      else if (sortKey === "jobInterest") cmp = JOB_ORDER.indexOf(a.jobInterest) - JOB_ORDER.indexOf(b.jobInterest);
      else cmp = a[sortKey].localeCompare(b[sortKey], "ja");
      return sortAsc ? cmp : -cmp;
    });
  }, [sortKey, sortAsc]);

  const SortTh = ({ colKey, label }: { colKey: SortKey; label: string }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-900 select-none"
      onClick={() => handleSort(colKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={`w-3 h-3 transition-colors ${sortKey === colKey ? "text-indigo-500" : "text-slate-300"}`} />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-slate-500" />
          参加者一覧
          <span className="text-sm font-normal text-slate-400 ml-1">({MOCK_STUDENTS.length}名)</span>
        </h2>
        <Link to="/company/students" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          カード表示で見る <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
              <SortTh colKey="name" label="氏名" />
              <SortTh colKey="university" label="大学" />
              <SortTh colKey="grade" label="学年" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">スキル</th>
              <SortTh colKey="jobInterest" label="就職関心" />
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.map((s, i) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-xs text-slate-400 font-mono">{String(i + 1).padStart(2, "0")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap max-w-[160px] truncate">{s.university}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">{s.grade}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap max-w-[180px]">
                    {s.skills.slice(0, 3).map(sk => (
                      <span key={sk} className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-100 whitespace-nowrap">{sk}</span>
                    ))}
                    {s.skills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded whitespace-nowrap">+{s.skills.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border whitespace-nowrap ${JOB_COLOR[s.jobInterest]}`}>
                    {s.jobInterest}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/company/student/${s.id}`}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                  >
                    詳細 →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── 統計・分析タブ ─────────────────────────────────────────────────────────
function StatsTab({
  universityStats,
  gradeStats,
  jobStats,
  interestPercent,
}: {
  universityStats: { name: string; count: number }[];
  gradeStats: { name: string; count: number }[];
  jobStats: { name: string; count: number; color: string }[];
  interestPercent: number;
}) {
  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniStat label="参加者数" value={`${MOCK_STUDENTS.length}名`} sub="合計" />
        <MiniStat label="参加大学数" value={`${universityStats.length}校`} sub="国内各地" />
        <MiniStat label="興味あり" value={`${interestPercent}%`} sub="就職・インターン" />
        <MiniStat
          label="最多学年"
          value={gradeStats.reduce((a, b) => a.count > b.count ? a : b).name}
          sub={`${gradeStats.reduce((a, b) => a.count > b.count ? a : b).count}名`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* University distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-slate-500" />
            大学別参加者数
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={universityStats} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
              <Tooltip
                formatter={(v: number) => [`${v}名`, "参加者数"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-5">
            <GraduationCap className="w-4 h-4 text-slate-500" />
            学年別参加者数
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gradeStats} margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => [`${v}名`, "参加者数"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Grade breakdown list */}
          <div className="mt-4 space-y-2">
            {gradeStats.map(g => (
              <div key={g.name} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-20 flex-shrink-0">{g.name}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-violet-400 rounded-full transition-all"
                    style={{ width: `${(g.count / MOCK_STUDENTS.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 w-12 text-right">
                  {g.count}名 ({Math.round((g.count / MOCK_STUDENTS.length) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job interest distribution */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-slate-500" />
          就職・インターン関心度の分布
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={jobStats}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="count"
              >
                {jobStats.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => [`${v}名`, ""]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Legend
                formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-4">
            {jobStats.map(j => (
              <div key={j.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{j.name}</span>
                  <span className="font-bold text-slate-900">
                    {j.count}名 <span className="text-slate-400 font-normal">({Math.round((j.count / MOCK_STUDENTS.length) * 100)}%)</span>
                  </span>
                </div>
                <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(j.count / MOCK_STUDENTS.length) * 100}%`,
                      backgroundColor: j.color,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-400 pt-2">
              就職・インターンへの関心が高い参加者が全体の
              <span className="font-bold text-slate-600"> {interestPercent}%</span> を占めています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 共通コンポーネント ─────────────────────────────────────────────────────
function StatCard({ icon: Icon, colorKey, label, value, unit }: {
  icon: React.ElementType;
  colorKey: "indigo" | "amber" | "emerald";
  label: string;
  value: string;
  unit: string;
}) {
  const colors = {
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
    amber: "bg-amber-50 border-amber-100 text-amber-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colors[colorKey]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-sm font-medium text-slate-500">{label}</div>
        <div className="text-2xl font-bold text-slate-900">
          {value}<span className="text-sm font-normal text-slate-500 ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="text-xs font-medium text-slate-500 mb-1">{label}</div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
    </div>
  );
}

function CompactStudentRow({ student }: { student: typeof MOCK_STUDENTS[0] }) {
  return (
    <div className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
      <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-bold text-slate-900 truncate pr-2">{student.name}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${JOB_COLOR[student.jobInterest]}`}>
            {student.jobInterest}
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate">{student.university} {student.faculty}</p>
        <div className="flex gap-1 mt-1.5 overflow-hidden">
          {student.skills.slice(0, 3).map(sk => (
            <span key={sk} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded whitespace-nowrap">{sk}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
