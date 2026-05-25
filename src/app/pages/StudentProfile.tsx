import { useParams, useLocation } from "react-router";
import { 
  MapPin, BookOpen, GraduationCap, Github, Twitter, Linkedin, Mail, 
  Target, Rocket, TrendingUp, Sparkles, MessageSquare, Briefcase, 
  ChevronRight, CalendarDays, ExternalLink, Activity
} from "lucide-react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Legend, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { MOCK_STUDENTS } from "../data/mock";
import { SKILL_MAP, GYOMU_MAP } from "../data/spaceSkillStandard";
import { recommendRoles } from "../utils/roleRecommendation";

export function StudentProfile() {
  const { id } = useParams();
  const location = useLocation();
  const isCompanyView = location.pathname.startsWith('/company');
  
  // Use mock data or first student if ID not found (for prototype)
  const student = MOCK_STUDENTS.find(s => s.id === id) || MOCK_STUDENTS[0];

  const recommendedRoles = recommendRoles(student.spaceSkills ?? [], student.gyomu ?? []);

  // Radar Chart Data Prep
  const radarData = student.skillMatrix.labels.map((label, index) => ({
    subject: label,
    Week0: student.skillMatrix.week0[index],
    Week4: student.skillMatrix.week4[index],
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* 1. Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        {/* Decorative Space Header Background */}
        <div className="h-32 w-full bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=400&fit=crop')] opacity-20 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
          
          {/* Constellation dots decoration */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-32 h-32 opacity-30 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-white">
              <circle cx="10" cy="20" r="1.5" />
              <circle cx="40" cy="10" r="2" />
              <circle cx="80" cy="40" r="1.5" />
              <circle cx="50" cy="70" r="2.5" />
              <circle cx="90" cy="80" r="1" />
              <line x1="10" y1="20" x2="40" y2="10" strokeWidth="0.5" />
              <line x1="40" y1="10" x2="80" y2="40" strokeWidth="0.5" />
              <line x1="80" y1="40" x2="50" y2="70" strokeWidth="0.5" />
              <line x1="50" y1="70" x2="10" y2="20" strokeWidth="0.5" />
              <line x1="80" y1="40" x2="90" y2="80" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="-mt-16 z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white ring-4 ring-indigo-50/50 flex-shrink-0 relative">
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
              {/* Online/Status indicator */}
              <div className="absolute bottom-1 right-4 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
            </div>
            
            <div className="mt-2 flex-1 pt-2 sm:pt-0">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{student.name}</h1>
                  <p className="text-indigo-600 font-medium text-lg mt-1 italic tracking-wide">"{student.catchphrase}"</p>
                </div>
                
                {isCompanyView && (
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-indigo-600/20 active:scale-95 whitespace-nowrap">
                    <MessageSquare className="w-4 h-4" />
                    スカウトメッセージ
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  {student.university} {student.faculty}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  {student.grade}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  東京キャンパス
                </div>
              </div>
              
              <div className="mt-6 text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                <div className="absolute -left-2 -top-2 w-6 h-6 bg-white border border-slate-100 rounded-full flex items-center justify-center text-indigo-300 shadow-sm font-serif text-2xl leading-none pt-1">"</div>
                {student.bio}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 5. AstroCamp Activities (Before/After) - Key Differentiator */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-[100%] opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8 relative">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">AstroCamp での成長</h2>
                <p className="text-sm text-slate-500 font-medium mt-0.5">プログラムを通じた価値観とスキルの変化</p>
              </div>
            </div>

            {student.astroCampActivities.map((activity, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Rocket className="w-5 h-5 text-indigo-500" />
                  {activity.program}
                </h3>
                
                {/* Before / After Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                  {/* Arrow connecting Before/After */}
                  <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-indigo-500">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                  
                  {/* Before Card */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
                    <div className="absolute -top-3 left-4 bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm border border-slate-300">
                      BEFORE
                    </div>
                    <div className="mt-2 text-slate-600 leading-relaxed font-medium">
                      {activity.before}
                    </div>
                  </div>

                  {/* After Card */}
                  <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100 relative shadow-inner">
                    <div className="absolute -top-3 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm shadow-indigo-600/20">
                      AFTER
                    </div>
                    <div className="mt-2 text-indigo-900 leading-relaxed font-bold">
                      {activity.after}
                    </div>
                  </div>
                </div>

                {activity.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 max-h-64 shadow-sm group relative">
                    <img src={activity.image} alt="Activity Outcome" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-white font-medium text-sm flex items-center gap-1.5"><Activity className="w-4 h-4"/> ワークショップ成果物</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* 3. Timeline / History */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center border border-slate-200">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">経歴・活動歴</h2>
            </div>
            
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:inset-0 before:ml-[1.4rem] sm:before:ml-[1.9rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-indigo-200 before:to-slate-200">
              {student.history.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-6 sm:-left-8 w-4 h-4 rounded-full bg-white border-4 border-indigo-500 shadow-sm mt-1.5"></div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-xs font-bold text-indigo-600 tracking-wider mb-1">{item.year}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          
          {/* 4. Career Intentions (Crucial for Companies) */}
          <section className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">キャリア意向</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">就職・インターン意欲</div>
                <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 ${
                  student.jobInterest === '興味あり' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 
                  student.jobInterest === '検討中' ? 'bg-amber-50 border-amber-200 text-amber-800' : 
                  'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <Briefcase className="w-5 h-5" />
                  <span className="font-bold">{student.jobInterest}</span>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">希望・コメント</div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">{student.jobComment}</p>
              </div>
            </div>
          </section>

          {/* 6. Skill Growth Matrix */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">ソフトスキル成長</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6 font-medium">参加前(Week0)と修了時(Week4)の自己/他己評価</p>
            
            <div className="h-[250px] w-full -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="Week 0" dataKey="Week0" stroke="#94a3b8" fill="#cbd5e1" fillOpacity={0.3} />
                  <Radar name="Week 4" dataKey="Week4" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
                  <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 2. Skills / Gyomu (Space Skill Standard) */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              専門領域・技術
            </h2>

            <div className="space-y-5">
              {/* スキル（宇宙スキル標準） */}
              {student.spaceSkills && student.spaceSkills.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">スキル（宇宙スキル標準）</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.spaceSkills.map(id => {
                      const s = SKILL_MAP.get(id);
                      return s ? (
                        <span key={id} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-lg font-bold border border-indigo-100/50 hover:bg-indigo-100 transition-colors cursor-default">
                          {s.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* 業務（宇宙スキル標準） */}
              {student.gyomu && student.gyomu.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">業務（宇宙スキル標準）</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.gyomu.map(id => {
                      const g = GYOMU_MAP.get(id);
                      return g ? (
                        <span key={id} className="px-3 py-1 bg-violet-50 text-violet-700 text-sm rounded-lg font-medium border border-violet-100/50 hover:bg-violet-100 transition-colors cursor-default">
                          {g.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* 詳細スキル */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">詳細スキル</h3>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium border border-slate-200/50 hover:bg-slate-200 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 推奨ロール */}
          {recommendedRoles.length > 0 && (
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                推奨ロール
              </h2>
              <div className="space-y-3">
                {recommendedRoles.map((match, idx) => {
                  const pct = Math.round(match.score * 100);
                  const medals = ["1位", "2位", "3位"];
                  const barColors = ["bg-amber-400", "bg-slate-400", "bg-orange-300"];
                  const textColors = ["text-amber-600", "text-slate-500", "text-orange-500"];
                  return (
                    <div key={match.role.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black ${textColors[idx] ?? "text-slate-500"}`}>{medals[idx] ?? `${idx+1}位`}</span>
                          <span className="font-bold text-slate-800">{match.role.name}</span>
                        </div>
                        <span className={`text-sm font-black ${textColors[idx] ?? "text-slate-500"}`}>{pct}%</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">{match.role.category}　{match.role.subcategory !== "ー" ? `/ ${match.role.subcategory}` : ""}</div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className={`${barColors[idx] ?? "bg-slate-400"} h-1.5 rounded-full transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 7. Links */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">リンク・連絡先</h2>
            <div className="space-y-3">
              {student.links.github && (
                <a href={student.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <Github className="w-5 h-5" /> GitHub
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </a>
              )}
              {student.links.twitter && (
                <a href={student.links.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <Twitter className="w-5 h-5" /> X (Twitter)
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </a>
              )}
              {student.links.linkedin && (
                <a href={student.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </a>
              )}
              {student.links.email && isCompanyView && (
                <a href={`mailto:${student.links.email}`} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <Mail className="w-5 h-5" /> メールアドレス
                  </div>
                  <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 truncate max-w-[150px]">{student.links.email}</span>
                </a>
              )}
            </div>
          </section>

          {/* 8. Physical Card Design Preview (For students only) */}
          {!isCompanyView && (
            <section className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl shadow-lg border border-indigo-900/50 p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-indigo-400" />
                    物理プロフィールカード
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">展示会用（名刺サイズ）プレビュー</p>
                </div>
                <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition-colors">
                  PDF出力
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                {/* Front */}
                <div>
                  <div className="text-[10px] text-slate-400 mb-1.5 font-medium tracking-widest">FRONT</div>
                  <div className="w-full aspect-[1.618/1] bg-white rounded-md shadow-md p-4 flex flex-col justify-between text-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <div className="text-[8px] font-bold text-indigo-600 tracking-wider">AstroCamp 2026</div>
                        <h3 className="text-lg font-black leading-tight mt-1">{student.name}</h3>
                        <p className="text-[9px] text-slate-500 mt-0.5">{student.university} {student.faculty}</p>
                      </div>
                      <img src={student.avatar} alt="" className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-bold text-slate-800 mb-1 leading-snug">"{student.catchphrase}"</p>
                      <div className="flex gap-1">
                        {(student.spaceSkills ?? []).slice(0, 2).map(id => {
                          const s = SKILL_MAP.get(id);
                          return s ? (
                            <span key={id} className="text-[7px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-sm font-medium">{s.name}</span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div>
                  <div className="text-[10px] text-slate-400 mb-1.5 font-medium tracking-widest">BACK</div>
                  <div className="w-full aspect-[1.618/1] bg-slate-900 rounded-md shadow-md p-4 flex items-center justify-center text-white relative border border-slate-700">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white p-1 rounded mx-auto mb-2">
                        {/* Mock QR Code */}
                        <div className="w-full h-full border-[3px] border-slate-900 p-0.5 flex flex-wrap gap-[1px]">
                           {Array.from({length: 16}).map((_, i) => <div key={i} className="w-[20%] h-[20%] bg-slate-900"></div>)}
                        </div>
                      </div>
                      <p className="text-[8px] text-slate-400">Scan for Full Portfolio</p>
                      <p className="text-[9px] font-medium mt-1">{student.links.email || "student@example.com"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
