import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Users, BookmarkCheck, Sparkles, TrendingUp, ChevronRight,
  BarChart2, ListFilter, GraduationCap, Building2, ArrowUpDown, Star,
  Trophy, Briefcase, BookOpen,
} from "lucide-react";
import { MOCK_STUDENTS, MOCK_COMPANY_STATS, AEROSPACE_STUDENT_IDS, STUDENT_DEPARTMENTS } from "../data/mock";
import { recommendRoles } from "../utils/roleRecommendation";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LabelList,
} from "recharts";

type Tab = "dashboard" | "list" | "stats" | "achievements";
type SortKey = "name" | "university" | "grade" | "jobInterest";
type AerospaceFilter = "all" | "aerospace" | "non-aerospace";

const GRADE_ORDER = ["学部1年", "学部2年", "学部3年", "学部4年", "修士1年", "修士2年"];
const UNIV_COLORS = ["#6366f1","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#84cc16","#f97316","#14b8a6"];
const JOB_ORDER = ["興味あり", "検討中", "今は考えていない"];
const JOB_COLOR: Record<string, string> = {
  "興味あり": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "検討中": "bg-amber-50 text-amber-700 border-amber-200",
  "今は考えていない": "bg-slate-50 text-slate-600 border-slate-200",
};
const AEROSPACE_LABELS: Record<AerospaceFilter, string> = {
  all: "全て",
  aerospace: "航空宇宙",
  "non-aerospace": "非航空宇宙",
};

const ACHIEVEMENTS_DATA = [
  { name: "Space BD", description: "宇宙ビジネスを牽引する宇宙商社", type: "インターン採用", category: "宇宙ビジネス" },
  { name: "Astroscale", description: "宇宙ゴミ除去の世界的リーディングカンパニー", type: "インターン採用", category: "デブリ除去" },
  { name: "ArkEdge Space", description: "東大発の超小型衛星スタートアップ", type: "インターン採用", category: "超小型衛星" },
  { name: "天地人", description: "JAXA認定スタートアップ", type: "インターン採用", category: "地球観測" },
  { name: "Synspective", description: "日本を代表するSAR衛星スタートアップ", type: "インターン・内定", category: "SAR衛星" },
  { name: "スカパーJSAT", description: "アジア最大の民間衛星通信事業者", type: "新卒入社", category: "衛星通信" },
  { name: "燈株式会社", description: "東大松尾研発のAIスタートアップ", type: "インターン採用", category: "AI" },
  { name: "Fusic", description: "宇宙×クラウド技術を牽引するテクノロジー企業", type: "インターン採用", category: "クラウド" },
];

export function CompanyDashboard() {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) ?? "dashboard";
  const [tab, setTab] = useState<Tab>(initialTab);
  const [aerospaceFilter, setAerospaceFilter] = useState<AerospaceFilter>("all");

  const filteredStudents = useMemo(() => {
    if (aerospaceFilter === "all") return MOCK_STUDENTS;
    if (aerospaceFilter === "aerospace") return MOCK_STUDENTS.filter(s => AEROSPACE_STUDENT_IDS.has(s.id));
    return MOCK_STUDENTS.filter(s => !AEROSPACE_STUDENT_IDS.has(s.id));
  }, [aerospaceFilter]);

  const allBookmarked = useMemo(() => MOCK_STUDENTS.filter(s => s.isBookmarked), []);
  const allInterestPercent = Math.round(
    (MOCK_STUDENTS.filter(s => s.jobInterest === "興味あり").length / MOCK_STUDENTS.length) * 100,
  );

  const universityStats = useMemo(() => {
    const map: Record<string, number> = {};
    filteredStudents.forEach(s => { map[s.university] = (map[s.university] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, [filteredStudents]);

  const facultyStats = useMemo(() => {
    const map: Record<string, number> = {};
    filteredStudents.forEach(s => { map[s.faculty] = (map[s.faculty] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, [filteredStudents]);

  const departmentStats = useMemo(() => {
    const map: Record<string, number> = {};
    filteredStudents.forEach(s => {
      const dept = STUDENT_DEPARTMENTS[s.id] ?? "その他";
      map[dept] = (map[dept] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, [filteredStudents]);

  const gradeStats = useMemo(() => {
    const map: Record<string, number> = {};
    filteredStudents.forEach(s => { map[s.grade] = (map[s.grade] || 0) + 1; });
    return GRADE_ORDER.filter(g => map[g]).map(g => ({ name: g, count: map[g] || 0 }));
  }, [filteredStudents]);

  const jobStats = useMemo(() => [
    { name: "興味あり", count: filteredStudents.filter(s => s.jobInterest === "興味あり").length, color: "#10b981" },
    { name: "検討中", count: filteredStudents.filter(s => s.jobInterest === "検討中").length, color: "#f59e0b" },
    { name: "今は考えていない", count: filteredStudents.filter(s => s.jobInterest === "今は考えていない").length, color: "#94a3b8" },
  ], [filteredStudents]);

  const interestPercent = filteredStudents.length > 0
    ? Math.round((jobStats[0].count / filteredStudents.length) * 100)
    : 0;

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "dashboard", label: "概要", icon: BarChart2 },
    { key: "list", label: "参加者一覧", icon: ListFilter },
    { key: "stats", label: "統計・分析", icon: TrendingUp },
    { key: "achievements", label: "実績", icon: Trophy },
  ];

  const showAerospaceFilter = tab === "list" || tab === "stats";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ダッシュボード</h1>
        <p className="text-sm text-slate-500 mt-1">AstroCamp 2026 の参加者データとブックマーク状況</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
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

        {/* Aerospace Filter */}
        {showAerospaceFilter && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400">分野:</span>
            {(Object.keys(AEROSPACE_LABELS) as AerospaceFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setAerospaceFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${aerospaceFilter === f ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"}`}
              >
                {AEROSPACE_LABELS[f]}
              </button>
            ))}
            {aerospaceFilter !== "all" && (
              <span className="text-xs text-slate-400">{filteredStudents.length}名表示中</span>
            )}
          </div>
        )}
      </div>

      {tab === "dashboard" && (
        <DashboardTab bookmarked={allBookmarked} interestPercent={allInterestPercent} />
      )}
      {tab === "list" && <StudentListTab students={filteredStudents} />}
      {tab === "stats" && (
        <StatsTab
          universityStats={universityStats}
          facultyStats={facultyStats}
          departmentStats={departmentStats}
          gradeStats={gradeStats}
          jobStats={jobStats}
          interestPercent={interestPercent}
          totalStudents={filteredStudents.length}
        />
      )}
      {tab === "achievements" && <AchievementsTab />}
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
function StudentListTab({ students }: { students: typeof MOCK_STUDENTS }) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(v => !v);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = useMemo(() => {
    return [...students].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "grade") cmp = GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade);
      else if (sortKey === "jobInterest") cmp = JOB_ORDER.indexOf(a.jobInterest) - JOB_ORDER.indexOf(b.jobInterest);
      else cmp = a[sortKey].localeCompare(b[sortKey], "ja");
      return sortAsc ? cmp : -cmp;
    });
  }, [sortKey, sortAsc, students]);

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
          <span className="text-sm font-normal text-slate-400 ml-1">({students.length}名)</span>
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
  facultyStats,
  departmentStats,
  gradeStats,
  jobStats,
  interestPercent,
  totalStudents,
}: {
  universityStats: { name: string; count: number }[];
  facultyStats: { name: string; count: number }[];
  departmentStats: { name: string; count: number }[];
  gradeStats: { name: string; count: number }[];
  jobStats: { name: string; count: number; color: string }[];
  interestPercent: number;
  totalStudents: number;
}) {
  const maxGrade = gradeStats.length > 0
    ? gradeStats.reduce((a, b) => a.count > b.count ? a : b)
    : null;

  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniStat label="参加者数" value={`${totalStudents}名`} sub="合計" />
        <MiniStat label="参加大学数" value={`${universityStats.length}校`} sub="国内各地" />
        <MiniStat label="興味あり" value={`${interestPercent}%`} sub="就職・インターン" />
        <MiniStat
          label="最多学年"
          value={maxGrade ? maxGrade.name : "-"}
          sub={maxGrade ? `${maxGrade.count}名` : ""}
        />
      </div>

      {/* University + Grade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-slate-500" />
            大学別参加者数
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={universityStats}
                cx="50%"
                cy="38%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="count"
                nameKey="name"
                startAngle={90}
                endAngle={-270}
                labelLine={false}
              >
                {universityStats.map((_, i) => (
                  <Cell key={i} fill={UNIV_COLORS[i % UNIV_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, name) => [`${v}名`, name]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Legend
                formatter={(value, entry: any) => {
                  const pct = Math.round((entry.payload?.percent ?? 0) * 100);
                  return <span style={{ fontSize: 11 }}>{value}（{pct}%）</span>;
                }}
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-5">
            <GraduationCap className="w-4 h-4 text-slate-500" />
            学年別参加者数
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={gradeStats} margin={{ left: 0, right: 16, top: 20, bottom: 4 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(v: number) => [`${v}名`, "参加者数"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="count" position="top" formatter={(v: number) => `${v}名`} style={{ fontSize: 11, fill: "#64748b" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Faculty + Department */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-slate-500" />
            学部別参加者数
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={facultyStats}
                cx="50%"
                cy="38%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="count"
                nameKey="name"
                startAngle={90}
                endAngle={-270}
                labelLine={false}
              >
                {facultyStats.map((_, i) => (
                  <Cell key={i} fill={UNIV_COLORS[i % UNIV_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, name) => [`${v}名`, name]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Legend
                formatter={(value, entry: any) => {
                  const pct = Math.round((entry.payload?.percent ?? 0) * 100);
                  return <span style={{ fontSize: 11 }}>{value}（{pct}%）</span>;
                }}
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-5">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            学科別参加者数
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={departmentStats}
              layout="vertical"
              margin={{ left: 8, right: 48, top: 4, bottom: 4 }}
            >
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={148} />
              <Tooltip
                formatter={(v: number) => [`${v}名`, "参加者数"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="count" position="right" formatter={(v: number) => `${v}名`} style={{ fontSize: 11, fill: "#64748b" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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
                startAngle={90}
                endAngle={-270}
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
                    {j.count}名 <span className="text-slate-400 font-normal">({totalStudents > 0 ? Math.round((j.count / totalStudents) * 100) : 0}%)</span>
                  </span>
                </div>
                <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: totalStudents > 0 ? `${(j.count / totalStudents) * 100}%` : "0%",
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

// ─── 実績タブ ────────────────────────────────────────────────────────────────
function AchievementsTab() {
  const typeConfig: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
    "インターン採用": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: Briefcase },
    "インターン・内定": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: Star },
    "新卒入社": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: Trophy },
  };

  const internCount = ACHIEVEMENTS_DATA.filter(a => a.type === "インターン採用").length;
  const offerCount = ACHIEVEMENTS_DATA.filter(a => a.type === "インターン・内定").length;
  const fullTimeCount = ACHIEVEMENTS_DATA.filter(a => a.type === "新卒入社").length;

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Trophy} colorKey="indigo" label="総活動実績" value={String(ACHIEVEMENTS_DATA.length)} unit="社" />
        <StatCard icon={Briefcase} colorKey="indigo" label="インターン採用" value={String(internCount)} unit="社" />
        <StatCard icon={Star} colorKey="amber" label="内定獲得" value={String(offerCount)} unit="社" />
        <StatCard icon={Trophy} colorKey="emerald" label="新卒入社" value={String(fullTimeCount)} unit="社" />
      </div>

      {/* Companies */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          活動実績一覧
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {ACHIEVEMENTS_DATA.map((company, i) => {
            const conf = typeConfig[company.type] ?? typeConfig["インターン採用"];
            const TypeIcon = conf.icon;
            return (
              <div
                key={company.name}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{company.category}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5 truncate">{company.name}</h3>
                  </div>
                  <span className="text-2xl font-black text-slate-100 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{company.description}</p>
                <div className={`self-start flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${conf.bg} ${conf.text} ${conf.border}`}>
                  <TypeIcon className="w-3.5 h-3.5" />
                  {company.type}
                </div>
              </div>
            );
          })}
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
  const topRole = recommendRoles(student.spaceSkills ?? [], student.gyomu ?? [], 1)[0];
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
        {topRole && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="w-3 h-3 text-amber-500 flex-shrink-0" />
            <span className="text-[10px] text-amber-700 font-medium truncate">{topRole.role.name}</span>
            <span className="text-[10px] text-amber-500 font-bold whitespace-nowrap">{Math.round(topRole.score * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
