import { Link } from "react-router";
import { Users, BookmarkCheck, Sparkles, TrendingUp, ChevronRight, BarChart } from "lucide-react";
import { MOCK_STUDENTS, MOCK_COMPANY_STATS } from "../data/mock";

export function CompanyDashboard() {
  const bookmarked = MOCK_STUDENTS.filter(s => s.isBookmarked);
  const newStudents = MOCK_STUDENTS.slice(0, 3); // Mocking new students

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ダッシュボード</h1>
        <p className="text-sm text-slate-500 mt-1">
          AstroCamp 2026 の参加者データとブックマーク状況
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">総登録参加者数</div>
            <div className="text-2xl font-bold text-slate-900">{MOCK_COMPANY_STATS.totalStudents}<span className="text-sm font-normal text-slate-500 ml-1">名</span></div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
            <BookmarkCheck className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">ブックマーク済</div>
            <div className="text-2xl font-bold text-slate-900">{bookmarked.length}<span className="text-sm font-normal text-slate-500 ml-1">名</span></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">インターン興味あり層</div>
            <div className="text-2xl font-bold text-slate-900">42<span className="text-sm font-normal text-slate-500 ml-1">%</span></div>
          </div>
        </div>
      </div>

      {/* Main Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Bookmarked Students */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-amber-500" />
              ブックマークリスト
            </h2>
            <Link to="/company/bookmarks" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              すべて見る <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {bookmarked.map(student => (
              <div key={student.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate pr-2">{student.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                      {student.jobInterest}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{student.university} {student.faculty}</p>
                  <div className="flex gap-1 mt-1.5 overflow-hidden">
                    {student.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded whitespace-nowrap">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: New Students */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              新着の参加者
            </h2>
            <Link to="/company/students" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              参加者一覧へ <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {newStudents.map(student => (
              <div key={student.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate pr-2">{student.name}</h3>
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">1日前</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{student.university} {student.faculty}</p>
                  <p className="text-xs text-slate-700 mt-1 truncate italic">"{student.catchphrase}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Skill Distribution */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-bold text-slate-900">スキル・興味分野の分布</h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {MOCK_COMPANY_STATS.skillDistribution.map((item, index) => {
            // Calculate size based on count relative to max count (which is 120 in mock)
            const maxCount = MOCK_COMPANY_STATS.skillDistribution[0].count;
            const ratio = item.count / maxCount;
            
            // Determine size classes
            let sizeClass = "text-xs px-2 py-1";
            if (ratio > 0.8) sizeClass = "text-base px-4 py-2 font-bold bg-indigo-100 text-indigo-800 border-indigo-200";
            else if (ratio > 0.5) sizeClass = "text-sm px-3 py-1.5 font-medium bg-indigo-50 text-indigo-700 border-indigo-100";
            else sizeClass = "text-xs px-2 py-1 bg-slate-50 text-slate-600 border-slate-200";

            return (
              <div 
                key={item.tag} 
                className={`rounded-lg border shadow-sm flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer ${sizeClass}`}
              >
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
