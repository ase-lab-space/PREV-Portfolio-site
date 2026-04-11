import { useState } from "react";
import { Search, Filter, BookmarkPlus, BookmarkCheck, ChevronRight, SlidersHorizontal, MapPin, Building2, BookOpen } from "lucide-react";
import { MOCK_STUDENTS } from "../data/mock";
import { Link, useLocation } from "react-router";

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const isCompanyView = location.pathname.startsWith('/company');

  // Filter mocked
  const filteredStudents = MOCK_STUDENTS.filter(s => s.name.includes(searchTerm) || s.catchphrase.includes(searchTerm));

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">参加者一覧</h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
            <UsersIcon className="w-4 h-4" />
            <span className="font-semibold text-slate-700">{MOCK_STUDENTS.length}名</span> の参加者が登録しています
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="名前、スキル、キーワード..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">絞り込み</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} isCompanyView={isCompanyView} />
        ))}
      </div>
    </div>
  );
}

function StudentCard({ student, isCompanyView }: { student: typeof MOCK_STUDENTS[0], isCompanyView: boolean }) {
  const [bookmarked, setBookmarked] = useState(student.isBookmarked);

  // Interest level styling
  const interestColor = {
    "興味あり": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "検討中": "bg-amber-50 text-amber-700 border-amber-200",
    "今は考えていない": "bg-slate-50 text-slate-600 border-slate-200"
  }[student.jobInterest] || "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
      {/* Card Header */}
      <div className="p-6 pb-4 border-b border-slate-100 flex gap-4 relative">
        {isCompanyView && (
          <button 
            onClick={() => setBookmarked(!bookmarked)}
            className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors z-10 bg-white/80 p-1.5 rounded-full"
          >
            {bookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-indigo-600" />
            ) : (
              <BookmarkPlus className="w-5 h-5" />
            )}
          </button>
        )}
        
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm ring-2 ring-slate-50">
          <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0 pr-8">
          <h2 className="text-lg font-bold text-slate-900 truncate">{student.name}</h2>
          <div className="text-sm text-slate-600 mt-1 flex items-center gap-1.5 truncate">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{student.university} {student.faculty}</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            {student.grade}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="px-6 py-4 bg-slate-50/50 flex-1">
        <p className="text-sm font-medium text-slate-800 italic relative">
          <span className="text-indigo-300 text-xl leading-none absolute -left-2 -top-1">"</span>
          {student.catchphrase}
          <span className="text-indigo-300 text-xl leading-none absolute ml-1 mt-1">"</span>
        </p>
        
        {/* Tags */}
        <div className="mt-4 space-y-3">
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Interests</div>
            <div className="flex flex-wrap gap-1.5">
              {student.interests.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium border border-indigo-100/50">
                  {tag}
                </span>
              ))}
              {student.interests.length > 3 && (
                <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-xs rounded-md font-medium border border-slate-100">
                  +{student.interests.length - 3}
                </span>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.slice(0, 4).map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md font-medium border border-slate-200/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white mt-auto">
        <div className={`px-2.5 py-1 rounded-full border text-xs font-bold ${interestColor} shadow-sm`}>
          就職/インターン: {student.jobInterest}
        </div>
        
        <Link 
          to={isCompanyView ? `/company/student/${student.id}` : `/student/profile/${student.id}`} 
          className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-0.5 transition-transform"
        >
          詳細を見る <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// Just a simple helper icon component
function UsersIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
