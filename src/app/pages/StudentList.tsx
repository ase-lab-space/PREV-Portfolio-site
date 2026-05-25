import { useState, useMemo, useRef, useEffect } from "react";
import { Search, BookmarkPlus, BookmarkCheck, ChevronRight, SlidersHorizontal, Building2, BookOpen, X, Tag, Star } from "lucide-react";
import { MOCK_STUDENTS } from "../data/mock";
import { Link, useLocation } from "react-router";
import { SPACE_SKILLS, GYOMU_LIST, SKILL_MAP, GYOMU_MAP } from "../data/spaceSkillStandard";
import { recommendRoles } from "../utils/roleRecommendation";

const ALL_SKILLS = Array.from(new Set(MOCK_STUDENTS.flatMap(s => s.skills))).sort();
const ALL_SPACE_SKILL_IDS = Array.from(new Set(MOCK_STUDENTS.flatMap(s => s.spaceSkills ?? []))).sort();
const ALL_GYOMU_IDS = Array.from(new Set(MOCK_STUDENTS.flatMap(s => s.gyomu ?? []))).sort();
const JOB_OPTIONS = ["興味あり", "検討中", "今は考えていない"] as const;

type Suggestion = { tag: string; id: string; type: "skill" | "spaceSkill" | "gyomu"; count: number };

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSpaceSkills, setSelectedSpaceSkills] = useState<string[]>([]);
  const [selectedGyomu, setSelectedGyomu] = useState<string[]>([]);
  const [selectedJobInterests, setSelectedJobInterests] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isCompanyView = location.pathname.startsWith('/company');

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = useMemo<Suggestion[]>(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();

    const detailSkills = ALL_SKILLS
      .filter(s => s.toLowerCase().includes(term) && !selectedSkills.includes(s))
      .map(s => ({ tag: s, id: s, type: "skill" as const, count: MOCK_STUDENTS.filter(st => st.skills.includes(s)).length }));

    const spaceSkills = ALL_SPACE_SKILL_IDS
      .filter(id => {
        const sk = SKILL_MAP.get(id);
        return sk && sk.name.toLowerCase().includes(term) && !selectedSpaceSkills.includes(id);
      })
      .map(id => {
        const sk = SKILL_MAP.get(id)!;
        return { tag: sk.name, id, type: "spaceSkill" as const, count: MOCK_STUDENTS.filter(st => (st.spaceSkills ?? []).includes(id)).length };
      });

    const gyomus = ALL_GYOMU_IDS
      .filter(id => {
        const g = GYOMU_MAP.get(id);
        return g && g.name.toLowerCase().includes(term) && !selectedGyomu.includes(id);
      })
      .map(id => {
        const g = GYOMU_MAP.get(id)!;
        return { tag: g.name, id, type: "gyomu" as const, count: MOCK_STUDENTS.filter(st => (st.gyomu ?? []).includes(id)).length };
      });

    return [...spaceSkills, ...gyomus, ...detailSkills].slice(0, 8);
  }, [searchTerm, selectedSkills, selectedSpaceSkills, selectedGyomu]);

  const selectSuggestion = (s: Suggestion) => {
    if (s.type === "skill") setSelectedSkills(prev => prev.includes(s.id) ? prev : [...prev, s.id]);
    else if (s.type === "spaceSkill") setSelectedSpaceSkills(prev => prev.includes(s.id) ? prev : [...prev, s.id]);
    else setSelectedGyomu(prev => prev.includes(s.id) ? prev : [...prev, s.id]);
    setSearchTerm("");
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && activeIndex >= 0) { e.preventDefault(); selectSuggestion(suggestions[activeIndex]); }
    else if (e.key === "Escape") { setShowSuggestions(false); setActiveIndex(-1); }
  };

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  const clearAll = () => {
    setSelectedSkills([]);
    setSelectedSpaceSkills([]);
    setSelectedGyomu([]);
    setSelectedJobInterests([]);
    setSearchTerm("");
  };

  const activeFilterCount = selectedSkills.length + selectedSpaceSkills.length + selectedGyomu.length + selectedJobInterests.length;

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(s => {
      const spaceSkills = s.spaceSkills ?? [];
      const gyomu = s.gyomu ?? [];
      const spaceSkillNames = spaceSkills.map(id => SKILL_MAP.get(id)?.name ?? "");
      const gyomuNames = gyomu.map(id => GYOMU_MAP.get(id)?.name ?? "");
      const matchesSearch = !searchTerm
        || s.name.includes(searchTerm)
        || s.catchphrase.includes(searchTerm)
        || s.skills.some(sk => sk.toLowerCase().includes(searchTerm.toLowerCase()))
        || spaceSkillNames.some(n => n.includes(searchTerm))
        || gyomuNames.some(n => n.includes(searchTerm));
      const matchesSkills = selectedSkills.length === 0 || selectedSkills.every(sk => s.skills.includes(sk));
      const matchesSpaceSkills = selectedSpaceSkills.length === 0 || selectedSpaceSkills.every(id => spaceSkills.includes(id));
      const matchesGyomu = selectedGyomu.length === 0 || selectedGyomu.every(id => gyomu.includes(id));
      const matchesJob = selectedJobInterests.length === 0 || selectedJobInterests.includes(s.jobInterest);
      return matchesSearch && matchesSkills && matchesSpaceSkills && matchesGyomu && matchesJob;
    });
  }, [searchTerm, selectedSkills, selectedSpaceSkills, selectedGyomu, selectedJobInterests]);

  const typeLabel: Record<string, string> = { skill: "詳細", spaceSkill: "スキル標準", gyomu: "業務" };
  const typeBadgeClass: Record<string, string> = {
    skill: "bg-slate-100 text-slate-600",
    spaceSkill: "bg-indigo-50 text-indigo-600",
    gyomu: "bg-violet-50 text-violet-600",
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">参加者一覧</h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
              <UsersIcon className="w-4 h-4" />
              <span className="font-semibold text-slate-700">{filteredStudents.length}名</span>
              {activeFilterCount > 0 && <span className="text-slate-400">/ {MOCK_STUDENTS.length}名中</span>}
              {activeFilterCount === 0 && <span>の参加者が登録しています</span>}
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            {/* Search with suggestions */}
            <div ref={searchContainerRef} className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
              <input
                type="text"
                placeholder="名前、スキル、業務..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setShowSuggestions(true); setActiveIndex(-1); }}
                onFocus={() => { if (searchTerm) setShowSuggestions(true); }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />

              {/* Suggestion dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">タグで絞り込む</span>
                  </div>
                  {suggestions.map((s, i) => (
                    <button
                      key={`${s.type}-${s.id}`}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${i === activeIndex ? "bg-indigo-50" : "hover:bg-slate-50"}`}
                      onMouseDown={e => { e.preventDefault(); selectSuggestion(s); }}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <Tag className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-slate-800">
                        <HighlightMatch text={s.tag} query={searchTerm} />
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${typeBadgeClass[s.type]}`}>
                        {typeLabel[s.type]}
                      </span>
                      <span className="text-[10px] text-slate-400 tabular-nums">{s.count}名</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`relative flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm ${showFilter ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">絞り込み</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active filter tags */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 flex-shrink-0">絞り込み中:</span>
            {selectedSpaceSkills.map(id => {
              const sk = SKILL_MAP.get(id);
              return sk ? (
                <span key={id} className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100">
                  <span className="text-[10px] text-indigo-300 font-normal mr-0.5">スキル</span>
                  {sk.name}
                  <button onClick={() => toggleItem(selectedSpaceSkills, setSelectedSpaceSkills, id)} className="ml-0.5 hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : null;
            })}
            {selectedGyomu.map(id => {
              const g = GYOMU_MAP.get(id);
              return g ? (
                <span key={id} className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full border border-violet-100">
                  <span className="text-[10px] text-violet-300 font-normal mr-0.5">業務</span>
                  {g.name}
                  <button onClick={() => toggleItem(selectedGyomu, setSelectedGyomu, id)} className="ml-0.5 hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : null;
            })}
            {selectedSkills.map(tag => (
              <span key={tag} className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200">
                <span className="text-[10px] text-slate-400 font-normal mr-0.5">詳細</span>
                {tag}
                <button onClick={() => toggleItem(selectedSkills, setSelectedSkills, tag)} className="ml-0.5 hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedJobInterests.map(tag => (
              <span key={tag} className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">
                <span className="text-[10px] text-emerald-300 font-normal mr-0.5">就職</span>
                {tag}
                <button onClick={() => toggleItem(selectedJobInterests, setSelectedJobInterests, tag)} className="ml-0.5 hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors ml-1">
              すべてクリア
            </button>
          </div>
        )}

        {/* Filter Panel */}
        {showFilter && (
          <div className="border-t border-slate-100 pt-4 space-y-4">
            {/* スキル（宇宙スキル標準） */}
            <div>
              <div className="text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wider">スキル（宇宙スキル標準）</div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_SPACE_SKILL_IDS.map(id => {
                  const sk = SKILL_MAP.get(id);
                  if (!sk) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => toggleItem(selectedSpaceSkills, setSelectedSpaceSkills, id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${selectedSpaceSkills.includes(id) ? "bg-indigo-600 border-indigo-600 text-white" : "bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100"}`}
                    >
                      {sk.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 業務 */}
            <div>
              <div className="text-xs font-semibold text-violet-600 mb-2 uppercase tracking-wider">業務（宇宙スキル標準）</div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_GYOMU_IDS.map(id => {
                  const g = GYOMU_MAP.get(id);
                  if (!g) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => toggleItem(selectedGyomu, setSelectedGyomu, id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${selectedGyomu.includes(id) ? "bg-violet-600 border-violet-600 text-white" : "bg-violet-50 border-violet-100 text-violet-700 hover:bg-violet-100"}`}
                    >
                      {g.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 詳細スキル */}
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">詳細スキル</div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_SKILLS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleItem(selectedSkills, setSelectedSkills, skill)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${selectedSkills.includes(skill) ? "bg-slate-700 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Interest */}
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">就職/インターン関心度</div>
              <div className="flex flex-wrap gap-1.5">
                {JOB_OPTIONS.map(opt => {
                  const colorMap = {
                    "興味あり": { active: "bg-emerald-600 border-emerald-600 text-white", inactive: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" },
                    "検討中": { active: "bg-amber-500 border-amber-500 text-white", inactive: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" },
                    "今は考えていない": { active: "bg-slate-500 border-slate-500 text-white", inactive: "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100" }
                  };
                  const isActive = selectedJobInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleItem(selectedJobInterests, setSelectedJobInterests, opt)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${isActive ? colorMap[opt].active : colorMap[opt].inactive}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} isCompanyView={isCompanyView} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-slate-500 text-sm">条件に一致する参加者が見つかりません。</p>
            <button onClick={clearAll} className="mt-3 text-indigo-600 text-sm font-medium hover:underline">絞り込みをリセット</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentCard({ student, isCompanyView }: { student: typeof MOCK_STUDENTS[0], isCompanyView: boolean }) {
  const [bookmarked, setBookmarked] = useState(student.isBookmarked);

  const topRole = useMemo(() => {
    const matches = recommendRoles(student.spaceSkills ?? [], student.gyomu ?? [], 1);
    return matches[0] ?? null;
  }, [student]);

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

      {/* Quote + Tags */}
      <div className="px-6 py-4 bg-slate-50/50 flex-1">
        <p className="text-sm font-medium text-slate-800 italic relative">
          <span className="text-indigo-300 text-xl leading-none absolute -left-2 -top-1">"</span>
          {student.catchphrase}
          <span className="text-indigo-300 text-xl leading-none absolute ml-1 mt-1">"</span>
        </p>

        <div className="mt-4 space-y-3">
          {/* スキル（宇宙スキル標準） */}
          {(student.spaceSkills ?? []).length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">スキル</div>
              <div className="flex flex-wrap gap-1.5">
                {(student.spaceSkills ?? []).slice(0, 3).map(id => {
                  const sk = SKILL_MAP.get(id);
                  return sk ? (
                    <span key={id} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium border border-indigo-100/50">
                      {sk.name}
                    </span>
                  ) : null;
                })}
                {(student.spaceSkills ?? []).length > 3 && (
                  <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-xs rounded-md font-medium border border-slate-100">
                    +{(student.spaceSkills ?? []).length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 詳細スキル */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">詳細スキル</div>
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

      {/* Recommended role */}
      {topRole && (
        <div className="px-4 py-2.5 border-t border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="text-xs text-slate-600">推奨ロール:</span>
            <span className="text-xs font-bold text-amber-700 truncate">{topRole.role.name}</span>
            <span className="ml-auto text-xs font-black text-amber-600">{Math.round(topRole.score * 100)}%</span>
          </div>
        </div>
      )}

      {/* Footer */}
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

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-indigo-100 text-indigo-800 not-italic rounded-sm">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
