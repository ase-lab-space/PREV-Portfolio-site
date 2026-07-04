import { useParams, Link } from "react-router";
import { Building2, ChevronLeft, ExternalLink, Briefcase, Tag } from "lucide-react";
import { MOCK_COMPANIES } from "../data/mock";
import { COMPANY_ICONS, ACCENT_MAP } from "./CompanyList";

export function CompanyProfile() {
  const { id } = useParams();
  const company = MOCK_COMPANIES.find((c) => c.id === id) ?? MOCK_COMPANIES[0];
  const Icon = COMPANY_ICONS[company.icon] ?? Building2;
  const accent = ACCENT_MAP[company.accent] ?? ACCENT_MAP.indigo;

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-20">
      {/* 戻るリンク */}
      <Link
        to="/student/companies"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        企業紹介一覧に戻る
      </Link>

      {/* ヘッダーカード（バナー + 重なりアイコン） */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* ヘッダー画像（グラデーションバナー） */}
        <div className={`h-32 sm:h-40 w-full bg-gradient-to-r ${company.gradient} relative overflow-hidden`}>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none">
            <Icon className="w-28 h-28 text-white" />
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-7 relative">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* アイコン */}
            <div className={`-mt-12 z-10 w-24 h-24 rounded-3xl border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 ${accent.iconBox}`}>
              <Icon className="w-12 h-12" />
            </div>

            <div className="flex-1 pt-3 sm:pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{company.name}</h1>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">{company.description}</p>
                </div>
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-indigo-600/20 active:scale-95 whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" />
                  公式サイト
                </a>
              </div>

              {/* バッジ群 */}
              <div className="flex flex-wrap gap-2 mt-4 text-xs sm:text-sm">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium border ${accent.chip}`}>
                  <Tag className="w-3.5 h-3.5" />
                  {company.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-200">
                  <Briefcase className="w-3.5 h-3.5" />
                  {company.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 企業説明 */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
          <span className={`w-1.5 h-5 rounded-full ${accent.bar}`}></span>
          企業について
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{company.about}</p>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {company.url}
          </a>
        </div>
      </section>
    </div>
  );
}
