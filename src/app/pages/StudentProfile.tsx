import { useState } from "react";
import { useParams, useLocation } from "react-router";
import {
  MapPin, BookOpen, GraduationCap, Github, Twitter, Linkedin, Mail,
  Target, Rocket, TrendingUp, Sparkles, MessageSquare, Briefcase,
  ChevronRight, CalendarDays, ExternalLink, Activity, Send
} from "lucide-react";
import { DmPanel } from "../components/DmPanel";
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
  const [dmOpen, setDmOpen] = useState(false);

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
    <div className="max-w-5xl mx-auto space-y-5 pb-20">

      {/* 1. Header Section — リファレンス画像に寄せた淡いパープルグラデ + コンパクト配置 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        {/* Decorative banner — リファレンスの淡い indigo-purple グラデに合わせる */}
        <div className="h-24 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 relative overflow-hidden">
          {/* 星座風アクセント */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-28 h-20 opacity-40 pointer-events-none">
            <svg viewBox="0 0 100 70" className="w-full h-full stroke-white fill-white">
              <circle cx="10" cy="20" r="1.2" />
              <circle cx="40" cy="10" r="1.8" />
              <circle cx="80" cy="40" r="1.4" />
              <circle cx="50" cy="55" r="2" />
              <circle cx="90" cy="60" r="1" />
              <line x1="10" y1="20" x2="40" y2="10" strokeWidth="0.4" />
              <line x1="40" y1="10" x2="80" y2="40" strokeWidth="0.4" />
              <line x1="80" y1="40" x2="50" y2="55" strokeWidth="0.4" />
            </svg>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-6 relative">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <div className="-mt-12 z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex-shrink-0 relative">
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-2 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
            </div>

            <div className="flex-1 pt-3 sm:pt-2">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                    {student.name}
                  </h1>
                  <p className="text-indigo-600 font-medium text-sm sm:text-base mt-1 italic tracking-wide">
                    &ldquo;{student.catchphrase}&rdquo;
                  </p>
                </div>

                {isCompanyView && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setDmOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-indigo-600/20 active:scale-95 whitespace-nowrap"
                    >
                      <Send className="w-4 h-4" />
                      DM
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-semibold transition-colors active:scale-95 whitespace-nowrap">
                      <MessageSquare className="w-4 h-4" />
                      スカウトメッセージ
                    </button>
                  </div>
                )}
              </div>

              {/* 学校・学年・キャンパスのチップ群 */}
              <div className="flex flex-wrap gap-2 mt-3 text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-medium border border-indigo-100">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {student.university} {student.faculty}
                </span>
                <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 px-2.5 py-1 rounded-md font-medium border border-violet-100">
                  <BookOpen className="w-3.5 h-3.5" />
                  {student.grade}
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-200">
                  <MapPin className="w-3.5 h-3.5" />
                  東京キャンパス
                </span>
              </div>

              {/* Bio */}
              <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                {student.bio}
              </p>

              {recommendedRoles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {recommendedRoles.map((m, i) => {
                    const pct = Math.round(m.score * 100);
                    const cls = i === 0
                      ? "bg-amber-50 border-amber-200 text-amber-800"
                      : i === 1
                      ? "bg-slate-50 border-slate-200 text-slate-700"
                      : "bg-orange-50 border-orange-200 text-orange-700";
                    return (
                      <div key={m.role.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${cls}`}>
                        <Sparkles className="w-3 h-3 flex-shrink-0" />
                        <span>{m.role.name}</span>
                        <span className="font-bold opacity-70">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* メイングリッド: 3カラム (左=AstroCampでの成長, 中=経歴・活動歴, 右=ソフトスキル成長 + 専門領域・技術 縦積み) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* AstroCampでの成長 (Before/After) */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">AstroCamp での成長</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">プログラムを通じた価値観とスキルの変化</p>
            </div>
          </div>

          {student.astroCampActivities.map((activity, idx) => (
            <div key={idx} className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-indigo-500" />
                {activity.program}
              </h3>

              <div className="space-y-2 relative">
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 relative">
                  <div className="absolute -top-2 left-2 bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider">
                    BEFORE
                  </div>
                  <div className="mt-1 text-[11px] text-slate-600 leading-snug">
                    {activity.before}
                  </div>
                </div>

                {/* 矢印インジケータ */}
                <div className="flex justify-center">
                  <div className="w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-indigo-500 shadow-sm">
                    <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-2.5 border border-indigo-100 relative">
                  <div className="absolute -top-2 left-2 bg-indigo-600 text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider">
                    AFTER
                  </div>
                  <div className="mt-1 text-[11px] text-indigo-900 leading-snug font-bold">
                    {activity.after}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 経歴・活動歴 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center border border-slate-200">
              <CalendarDays className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">経歴・活動歴</h2>
          </div>

          <div className="relative pl-4 space-y-2.5 before:absolute before:left-[5px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-indigo-200 before:to-slate-200">
            {student.history.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-white border-[2.5px] border-indigo-500"></div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="text-[9px] font-bold text-indigo-600 tracking-wider mb-0.5">{item.year}</div>
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5">{item.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 右カラム: ソフトスキル成長 + 専門領域・技術 を縦積み */}
        <div className="space-y-4">

          {/* ソフトスキル成長 (radar) */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">ソフトスキル成長</h2>
            </div>
            <p className="text-[10px] text-slate-500 ml-9 mb-2">参加前(Week0)と修了時(Week4)</p>

            <div className="h-[170px] w-full -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                  <Radar name="Week 0" dataKey="Week0" stroke="#94a3b8" fill="#cbd5e1" fillOpacity={0.3} />
                  <Radar name="Week 4" dataKey="Week4" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
                  <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 500 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 専門領域・技術 (Space Skill Standard) */}
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
                    <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md font-medium border border-slate-200/60">
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
        </div>
      </div>

      {/* キャリア意向 + リンク を 2 カラムで下部 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">キャリア意向</h2>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">就職・インターン意欲</div>
              <div className={`px-3 py-2 rounded-lg border flex items-center gap-2 text-sm ${
                student.jobInterest === '興味あり' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                student.jobInterest === '検討中' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <Briefcase className="w-4 h-4" />
                <span className="font-bold">{student.jobInterest}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">希望・コメント</div>
              <p className="text-xs text-slate-700 leading-relaxed">{student.jobComment}</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-base font-bold text-slate-900 mb-3">リンク・連絡先</h2>
          <div className="space-y-2">
            {student.links.github && (
              <a href={student.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
              </a>
            )}
            {student.links.twitter && (
              <a href={student.links.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                  <Twitter className="w-4 h-4" /> X (Twitter)
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
              </a>
            )}
            {student.links.linkedin && (
              <a href={student.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
              </a>
            )}
            {student.links.email && isCompanyView && (
              <a href={`mailto:${student.links.email}`} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                  <Mail className="w-4 h-4" /> メールアドレス
                </div>
                <span className="text-[10px] font-medium text-slate-500 truncate max-w-[150px]">{student.links.email}</span>
              </a>
            )}
          </div>
        </section>
      </div>

      {/* 物理プロフィールカード（参加者ビューのみ） */}
      {!isCompanyView && (
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl shadow-lg border border-indigo-900/50 p-5 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Rocket className="w-4 h-4 text-indigo-400" />
                物理プロフィールカード
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">展示会用（名刺サイズ）プレビュー</p>
            </div>
            <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition-colors">
              PDF出力
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 relative z-10">
            <div>
              <div className="text-[9px] text-slate-400 mb-1 font-medium tracking-widest">FRONT</div>
              <div className="w-full aspect-[1.618/1] bg-white rounded-md shadow-md p-3 flex flex-col justify-between text-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-full -mr-3 -mt-3"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <div className="text-[7px] font-bold text-indigo-600 tracking-wider">AstroCamp 2026</div>
                    <h3 className="text-sm font-black leading-tight mt-0.5">{student.name}</h3>
                    <p className="text-[8px] text-slate-500 mt-0.5">{student.university} {student.faculty}</p>
                  </div>
                  <img src={student.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
                </div>
                <div className="relative z-10">
                  <p className="text-[9px] font-bold text-slate-800 mb-1 leading-snug">"{student.catchphrase}"</p>
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
            <div>
              <div className="text-[9px] text-slate-400 mb-1 font-medium tracking-widest">BACK</div>
              <div className="w-full aspect-[1.618/1] bg-slate-900 rounded-md shadow-md p-3 flex items-center justify-center text-white relative border border-slate-700">
                <div className="text-center">
                  <div className="w-14 h-14 bg-white p-1 rounded mx-auto mb-1.5">
                    <div className="w-full h-full border-[3px] border-slate-900 p-0.5 flex flex-wrap gap-[1px]">
                      {Array.from({length: 16}).map((_, i) => <div key={i} className="w-[20%] h-[20%] bg-slate-900"></div>)}
                    </div>
                  </div>
                  <p className="text-[7px] text-slate-400">Scan for Full Portfolio</p>
                  <p className="text-[8px] font-medium mt-0.5">{student.links.email || "student@example.com"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DM パネル（右サイドスライド） */}
      <DmPanel open={dmOpen} onClose={() => setDmOpen(false)} student={student} />
    </div>
  );
}
