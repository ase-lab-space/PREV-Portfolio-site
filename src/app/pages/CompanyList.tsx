import { Link } from "react-router";
import {
  Rocket, Orbit, Satellite, Globe, Radar, SatelliteDish, Cpu, Cloud,
  Building2, ChevronRight,
} from "lucide-react";
import { MOCK_COMPANIES } from "../data/mock";

// icon 名 → lucide コンポーネント
export const COMPANY_ICONS: Record<string, React.ElementType> = {
  Rocket, Orbit, Satellite, Globe, Radar, SatelliteDish, Cpu, Cloud,
};

// accent → 静的クラス（Tailwind JIT 対応のため文字列を直書き）
export const ACCENT_MAP: Record<string, { chip: string; iconBox: string; bar: string }> = {
  indigo: { chip: "bg-indigo-50 text-indigo-700 border-indigo-200", iconBox: "bg-indigo-100 text-indigo-600", bar: "bg-indigo-500" },
  cyan:   { chip: "bg-cyan-50 text-cyan-700 border-cyan-200",       iconBox: "bg-cyan-100 text-cyan-600",     bar: "bg-cyan-500" },
  violet: { chip: "bg-violet-50 text-violet-700 border-violet-200", iconBox: "bg-violet-100 text-violet-600", bar: "bg-violet-500" },
  emerald:{ chip: "bg-emerald-50 text-emerald-700 border-emerald-200", iconBox: "bg-emerald-100 text-emerald-600", bar: "bg-emerald-500" },
  blue:   { chip: "bg-blue-50 text-blue-700 border-blue-200",       iconBox: "bg-blue-100 text-blue-600",     bar: "bg-blue-500" },
  sky:    { chip: "bg-sky-50 text-sky-700 border-sky-200",          iconBox: "bg-sky-100 text-sky-600",       bar: "bg-sky-500" },
  amber:  { chip: "bg-amber-50 text-amber-700 border-amber-200",    iconBox: "bg-amber-100 text-amber-600",   bar: "bg-amber-500" },
  teal:   { chip: "bg-teal-50 text-teal-700 border-teal-200",       iconBox: "bg-teal-100 text-teal-600",     bar: "bg-teal-500" },
};

export function CompanyList() {
  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-20">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-indigo-600" />
          企業紹介
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          AstroCamp 参加者の活躍する宇宙関連企業をご紹介します。各社をクリックすると、企業の詳細をご覧いただけます。
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_COMPANIES.map((company) => {
          const Icon = COMPANY_ICONS[company.icon] ?? Building2;
          const accent = ACCENT_MAP[company.accent] ?? ACCENT_MAP.indigo;
          return (
            <Link
              key={company.id}
              to={`/student/company/${company.id}`}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all flex flex-col"
            >
              {/* Banner */}
              <div className={`h-20 bg-gradient-to-r ${company.gradient} relative`}>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30">
                  <Icon className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="px-5 pb-5 relative flex-1 flex flex-col">
                {/* Icon */}
                <div className={`-mt-7 w-14 h-14 rounded-2xl border-4 border-white shadow-sm flex items-center justify-center ${accent.iconBox}`}>
                  <Icon className="w-7 h-7" />
                </div>

                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-3">{company.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5 group-hover:text-indigo-700 transition-colors">{company.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-1.5 flex-1">{company.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${accent.chip}`}>{company.type}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    詳しく見る <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
