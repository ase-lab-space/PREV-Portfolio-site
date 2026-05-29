import { useState, useEffect } from "react";
import { Search, BarChart2, Users, Star, Bookmark, Rocket } from "lucide-react";

interface Props {
  onDismiss: () => void;
}

const SLIDE_DURATION_MS = 8000;

const SLIDES = [
  {
    key: "overview",
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-700",
    accentBorder: "border-indigo-200",
    badge: "開発中のポートフォリオサイトについて",
    title: "宇宙人材と企業を\nつなぐプラットフォーム",
    desc: "宇宙分野を志す学生のポートフォリオを一元管理。スキル・業務・推奨ロールで絞り込み、採用担当者が最適な人材を発見できます。",
    Visual: OverviewPreview,
  },
  {
    key: "participants",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    accentBg: "bg-blue-50",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200",
    badge: "参加者一覧",
    title: "多様な大学・専攻の\n学生を一覧で確認",
    desc: "全国の大学から集まった参加者を一覧表示。大学・学年・推奨ロールを一目で確認し、気になる学生のプロフィールへ素早くアクセスできます。",
    Visual: ParticipantsPreview,
  },
  {
    key: "profile",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    accentBg: "bg-violet-50",
    accentText: "text-violet-700",
    accentBorder: "border-violet-200",
    badge: "個人詳細ページ",
    title: "一人ひとりの\n詳細情報を確認",
    desc: "推奨ロール・宇宙スキル標準のスキルと業務・詳細スキル・経歴と活動歴・ソフトスキル成長・就職インターン意欲・物理プロフィールカードを一画面で確認できます。",
    Visual: ProfilePreview,
  },
  {
    key: "search",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    accentBg: "bg-cyan-50",
    accentText: "text-cyan-700",
    accentBorder: "border-cyan-200",
    badge: "スキル検索・絞り込み",
    title: "宇宙スキル標準で\n目的の人材を絞り込む",
    desc: "「軌道設計」「推進系」などのスキルや業務でリアルタイム検索。航空宇宙 / 非航空宇宙フィルターで専攻別の絞り込みも可能です。",
    Visual: SearchFilterPreview,
  },
  {
    key: "dashboard",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    badge: "企業ダッシュボード",
    title: "参加者データを\nグラフで分析・管理",
    desc: "大学・学部・学科・学年の分布をグラフで一覧。就職関心度の傾向分析やタブ切り替えで統計・参加者リスト・ブックマークを管理できます。",
    Visual: DashboardPreview,
  },
  {
    key: "bookmark",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    accentBg: "bg-rose-50",
    accentText: "text-rose-700",
    accentBorder: "border-rose-200",
    badge: "ブックマーク機能",
    title: "気になる人材を\n保存して比較",
    desc: "プロフィールをブックマークして後で一覧表示。複数の候補者を並べて比較しながら、採用活動を効率的に進められます。",
    Visual: BookmarkPreview,
  },
] as const;

// ─── Main component ──────────────────────────────────────────────────────────
export function IdleAnimation({ onDismiss }: Props) {
  const [slide, setSlide] = useState(0);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION_MS) * 100, 100));
      if (elapsed < SLIDE_DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setSlide(s => (s + 1) % SLIDES.length);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [slide]);

  const { gradient, badge, title, desc, Visual, accentBg, accentText, accentBorder } = SLIDES[slide];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center cursor-pointer idle-overlay"
      onClick={onDismiss}
      onMouseMove={onDismiss}
    >
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-6xl mx-4 rounded-3xl overflow-hidden shadow-2xl bg-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient bar */}
        <div className={`bg-gradient-to-r ${gradient} h-1.5`} />

        {/* Body */}
        <div className="p-10 md:p-14">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-slate-700 text-base font-bold tracking-widest uppercase">AstroCamp 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 tabular-nums">
                {String(slide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`rounded-full transition-all duration-300 ${i === slide ? "w-8 h-3 bg-indigo-600" : "w-3 h-3 bg-slate-200 hover:bg-slate-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Two-column */}
          <div key={`slide-${slide}`} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span
                className={`inline-block text-sm font-black uppercase tracking-widest px-4 py-2 rounded-full ${accentBg} ${accentText} border ${accentBorder} mb-6 idle-content-in`}
                style={{ animationDelay: "0s" }}
              >
                {badge}
              </span>
              <h2
                className="text-5xl font-black text-slate-900 leading-tight mb-6 whitespace-pre-line idle-content-in"
                style={{ animationDelay: "0.08s" }}
              >
                {title}
              </h2>
              <p
                className="text-lg text-slate-600 leading-relaxed mb-10 idle-content-in"
                style={{ animationDelay: "0.18s" }}
              >
                {desc}
              </p>
            </div>

            {/* Visual */}
            <div className="idle-content-in" style={{ animationDelay: "0.10s" }}>
              <Visual />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-none`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-slate-400 whitespace-nowrap">マウスを動かすと閉じます</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide previews (light theme) ───────────────────────────────────────────

function OverviewPreview() {
  return (
    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-indigo-700 flex items-center justify-center">
            <Rocket className="w-3 h-3 text-white" />
          </div>
          <span className="text-slate-800 text-[11px] font-bold">AstroCamp 2026</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md font-semibold">企業</span>
          <span className="text-[9px] px-2 py-0.5 text-slate-400">個人</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[["26名", "参加者数"], ["14校", "参加大学"], ["59", "ロール数"]].map(([val, label]) => (
            <div key={label} className="bg-white rounded-xl p-2.5 text-center border border-slate-100 shadow-sm">
              <div className="text-slate-900 font-black text-sm">{val}</div>
              <div className="text-slate-500 text-[8px] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
        {[
          { bg: "bg-indigo-100", tag: "M2" },
          { bg: "bg-violet-100", tag: "B4" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-slate-100">
            <div className={`w-8 h-8 rounded-full ${item.bg} flex-shrink-0`} />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 bg-slate-200 rounded w-3/4" />
              <div className="h-1.5 bg-slate-100 rounded w-1/2" />
            </div>
            <span className="text-[9px] text-indigo-600 font-bold">{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParticipantsPreview() {
  const rows = [
    { bg: "bg-indigo-100", univ: "九州大学", year: "M2" },
    { bg: "bg-violet-100", univ: "東京大学", year: "B4" },
    { bg: "bg-blue-100", univ: "筑波大学", year: "M1" },
  ];
  return (
    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-white p-3 border-b border-slate-200 space-y-2">
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
          <Search className="w-3 h-3 text-slate-400" />
          <span className="text-slate-400 text-[10px]">スキル・業務を検索...</span>
        </div>
        <div className="flex gap-1.5">
          {["全て", "航空宇宙", "非航空宇宙"].map((f, i) => (
            <span key={f} className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${i === 1 ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200"}`}>{f}</span>
          ))}
        </div>
      </div>
      <div className="p-3 space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 border border-slate-100">
            <div className={`w-8 h-8 rounded-full ${r.bg} flex items-center justify-center flex-shrink-0`}>
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-2 bg-slate-200 rounded w-16 mb-1" />
              <div className="text-[9px] text-slate-500">{r.univ} · {r.year}</div>
            </div>
            <div className="text-[9px] text-slate-400">詳細 →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilePreview() {
  return (
    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm text-[10px]">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-3 flex gap-2.5 border-b border-slate-200">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-2.5 bg-slate-300 rounded w-20 mb-1" />
          <div className="text-slate-500 text-[9px]">九州大学 工学部 4年</div>
          <div className="flex gap-1 mt-1 flex-wrap">
            {["就職に非常に興味あり"].map(t => (
              <span key={t} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] rounded-full border border-emerald-200">{t}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Sections overview */}
      <div className="p-3 space-y-2">
        {/* Roles */}
        <div className="bg-white rounded-xl p-2 border border-amber-100">
          <div className="font-bold text-amber-600 flex items-center gap-1 mb-1.5">
            <Star className="w-2.5 h-2.5" /> 推奨ロール
          </div>
          {[{ role: "通信系エンジニア", pct: 87 }, { role: "軌道設計者", pct: 72 }].map(r => (
            <div key={r.role} className="flex items-center gap-1.5 mb-1">
              <div className="flex-1 text-[9px] text-slate-700 truncate">{r.role}</div>
              <div className="w-12 bg-slate-200 rounded-full h-1 overflow-hidden flex-shrink-0">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${r.pct}%` }} />
              </div>
              <div className="text-[9px] text-amber-600 font-bold w-6 text-right flex-shrink-0">{r.pct}%</div>
            </div>
          ))}
        </div>
        {/* Skills & Tasks */}
        <div className="bg-white rounded-xl p-2 border border-slate-100">
          <div className="font-bold text-slate-500 mb-1">スキル・業務（宇宙スキル標準）</div>
          <div className="flex gap-1 flex-wrap">
            {["軌道通信", "SDR", "深宇宙探査", "推進系設計"].map(t => (
              <span key={t} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] rounded-md border border-indigo-100">{t}</span>
            ))}
          </div>
        </div>
        {/* Other sections list */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "経歴・活動歴", color: "bg-blue-50 text-blue-700 border-blue-100" },
            { label: "ソフトスキル成長", color: "bg-violet-50 text-violet-700 border-violet-100" },
            { label: "就職インターン意欲", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
            { label: "物理プロフィールカード", color: "bg-slate-100 text-slate-600 border-slate-200" },
          ].map(s => (
            <div key={s.label} className={`px-2 py-1.5 rounded-lg border text-[8px] font-semibold text-center ${s.color}`}>
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchFilterPreview() {
  return (
    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-white p-3 border-b border-slate-200 space-y-2">
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 text-[10px]">スキル・業務を検索...</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[
            { label: "全て", active: false },
            { label: "航空宇宙", active: true },
            { label: "非航空宇宙", active: false },
          ].map(f => (
            <span key={f.label} className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${f.active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200"}`}>
              {f.label}
            </span>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {["軌道設計 ×", "推進系 +", "構造解析 +"].map((tag, i) => (
            <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-full border ${i === 0 ? "bg-violet-100 text-violet-700 border-violet-200" : "bg-slate-50 text-slate-400 border-slate-200"}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2">
        {[
          { bg: "bg-blue-100", tc: "text-blue-600", role: "推進系エンジニア" },
          { bg: "bg-violet-100", tc: "text-violet-600", role: "軌道設計者" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-2.5 border border-slate-200">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className={`w-6 h-6 rounded-full ${s.bg} flex-shrink-0`} />
              <div className="h-2 bg-slate-200 rounded flex-1" />
            </div>
            <div className="flex items-center gap-0.5 mt-1">
              <Star className={`w-2.5 h-2.5 ${s.tc}`} />
              <span className={`text-[9px] font-medium ${s.tc}`}>{s.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPreview() {
  const bars = [
    { label: "東大", h: 70, color: "bg-indigo-400" },
    { label: "九大", h: 55, color: "bg-violet-400" },
    { label: "筑波", h: 85, color: "bg-blue-400" },
    { label: "早大", h: 45, color: "bg-cyan-400" },
    { label: "名大", h: 60, color: "bg-purple-400" },
  ];
  return (
    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-white p-3 grid grid-cols-3 gap-2 border-b border-slate-200">
        {[
          { label: "参加者数", value: "26名" },
          { label: "大学数", value: "14校" },
          { label: "就職関心", value: "高 62%" },
        ].map(s => (
          <div key={s.label} className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
            <div className="text-slate-900 font-black text-xs">{s.value}</div>
            <div className="text-slate-500 text-[8px] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <BarChart2 className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-700">大学別参加者数</span>
        </div>
        <div className="flex items-end gap-1.5 h-16 justify-around">
          {bars.map((b, idx) => (
            <div key={b.label} className="flex flex-col items-center gap-0.5 flex-1">
              <div
                className={`w-full rounded-t ${b.color} idle-bar-1`}
                style={{ height: `${b.h}%`, animationDelay: `${idx * 0.1}s` }}
              />
              <div className="text-[7px] text-slate-500">{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookmarkPreview() {
  const items = [
    { bg: "bg-indigo-100", univ: "東京大学", role: "軌道設計者", saved: true },
    { bg: "bg-violet-100", univ: "九州大学", role: "推進系エンジニア", saved: true },
    { bg: "bg-blue-100", univ: "筑波大学", role: "通信エンジニア", saved: false },
  ];
  return (
    <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-white p-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[11px] font-bold text-slate-700">ブックマーク一覧</span>
        </div>
        <span className="text-[9px] text-slate-400">3件保存</span>
      </div>
      <div className="p-3 space-y-2">
        {items.map((b, i) => (
          <div key={i} className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 border border-slate-100">
            <div className={`w-8 h-8 rounded-full ${b.bg} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="h-2 bg-slate-200 rounded w-16 mb-1" />
              <div className="text-[9px] text-slate-500">{b.univ}</div>
              <div className="mt-0.5 flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 text-amber-400" />
                <span className="text-[9px] text-slate-600">{b.role}</span>
              </div>
            </div>
            <Bookmark
              className={`w-4 h-4 flex-shrink-0 ${b.saved ? "text-rose-500 fill-rose-500" : "text-slate-300"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
