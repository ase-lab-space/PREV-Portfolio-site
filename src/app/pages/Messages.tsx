import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { Send, Search, MessageSquare, ArrowLeft, Building2, Sparkles } from "lucide-react";
import {
  buildCompanyConversations, buildStudentConversations,
  STUDENT_AUTO_REPLIES, COMPANY_AUTO_REPLIES,
  type DmConversation, type DmMessage, type DmSender,
} from "../data/dmMock";
import { COMPANY_ICONS, ACCENT_MAP } from "./CompanyList";

function nowLabel(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// 会話一覧・スレッドペインで共通のアバター表示（学生＝写真 / 企業＝アイコン）。
function PartnerAvatar({ conv, size = "md" }: { conv: DmConversation; size?: "sm" | "md" }) {
  const box = size === "sm" ? "w-11 h-11" : "w-12 h-12";
  if (conv.partnerAvatar) {
    return (
      <div className={`${box} rounded-full overflow-hidden border-2 border-white shadow-sm bg-white flex-shrink-0`}>
        <img src={conv.partnerAvatar} alt={conv.partnerName} className="w-full h-full object-cover" />
      </div>
    );
  }
  const Icon = COMPANY_ICONS[conv.partnerIcon ?? ""] ?? Building2;
  const accent = ACCENT_MAP[conv.partnerAccent ?? "indigo"] ?? ACCENT_MAP.indigo;
  return (
    <div className={`${box} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${accent.iconBox}`}>
      <Icon className="w-6 h-6" />
    </div>
  );
}

export function Messages() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isCompanyView = location.pathname.startsWith("/company");
  const mySide: DmSender = isCompanyView ? "company" : "student";

  // 視点に応じた会話一覧（企業→学生 / 学生→企業）
  const conversations = useMemo<DmConversation[]>(
    () => (isCompanyView ? buildCompanyConversations() : buildStudentConversations()),
    [isCompanyView],
  );

  // スレッド本文はメモリ保持（会話ID → メッセージ配列）
  const [threads, setThreads] = useState<Record<string, DmMessage[]>>(
    () => Object.fromEntries(conversations.map((c) => [c.id, c.messages])),
  );
  const [activeId, setActiveId] = useState<string>(() => {
    const req = searchParams.get("with");
    return req && conversations.some((c) => c.id === req) ? req : conversations[0]?.id ?? "";
  });
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [showThreadMobile, setShowThreadMobile] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);

  // 視点が切り替わったらスレッドと選択をリセット
  useEffect(() => {
    setThreads(Object.fromEntries(conversations.map((c) => [c.id, c.messages])));
    const req = searchParams.get("with");
    setActiveId(req && conversations.some((c) => c.id === req) ? req : conversations[0]?.id ?? "");
    setShowThreadMobile(!!req);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  const activeConv = conversations.find((c) => c.id === activeId);
  const activeMessages = threads[activeId] ?? [];

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages.length, activeId]);

  const filtered = conversations.filter(
    (c) => c.partnerName.includes(query) || c.subtitle.includes(query),
  );

  const previewOf = (id: string): string => {
    const msgs = threads[id];
    return msgs && msgs.length ? msgs[msgs.length - 1].text : "";
  };

  const openConversation = (id: string) => {
    setActiveId(id);
    setDraft("");
    setShowThreadMobile(true);
  };

  const send = () => {
    const text = draft.trim();
    if (!text || !activeConv) return;
    const mine: DmMessage = { id: `me-${Date.now()}`, from: mySide, text, time: nowLabel() };
    setThreads((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), mine] }));
    setDraft("");
    // 相手からの簡易オート返信（モック）
    const pool = isCompanyView ? STUDENT_AUTO_REPLIES : COMPANY_AUTO_REPLIES;
    const reply = pool[Math.floor(Math.random() * pool.length)];
    const otherSide: DmSender = isCompanyView ? "student" : "company";
    setTimeout(() => {
      setThreads((prev) => ({
        ...prev,
        [activeId]: [
          ...(prev[activeId] ?? []),
          { id: `ot-${Date.now()}`, from: otherSide, text: reply, time: nowLabel() },
        ],
      }));
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
          メッセージ
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isCompanyView ? "参加者（学生）とのダイレクトメッセージ" : "企業とのダイレクトメッセージ"}
        </p>
      </div>

      <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[calc(100vh-13rem)] min-h-[520px]">

        {/* ── 左：会話一覧 ── */}
        <aside
          className={`w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col border-r border-slate-200 bg-slate-50/50 ${
            showThreadMobile ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="p-3 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="名前で検索…"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filtered.length === 0 && (
              <div className="p-6 text-center text-sm text-slate-400">該当する会話がありません</div>
            )}
            {filtered.map((c) => {
              const active = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => openConversation(c.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 text-left border-b border-slate-100 transition-colors ${
                    active ? "bg-indigo-50" : "hover:bg-white"
                  }`}
                >
                  <PartnerAvatar conv={c} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-bold truncate ${active ? "text-indigo-800" : "text-slate-800"}`}>
                        {c.partnerName}
                      </span>
                      <span className="text-[10px] text-slate-400 flex-shrink-0">{c.time}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{c.subtitle}</div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-xs text-slate-500 truncate">{previewOf(c.id)}</span>
                      {c.unread > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── 右：スレッド ── */}
        <section
          className={`flex-1 flex-col min-w-0 ${showThreadMobile ? "flex" : "hidden md:flex"}`}
        >
          {activeConv ? (
            <>
              {/* ヘッダー */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white">
                <button
                  onClick={() => setShowThreadMobile(false)}
                  className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="一覧に戻る"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <PartnerAvatar conv={activeConv} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">{activeConv.partnerName}</div>
                  <div className="text-xs text-slate-400 truncate">{activeConv.subtitle}</div>
                </div>
              </div>

              {/* メッセージ */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50/50">
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {activeConv.partnerName} とのDM
                  </span>
                </div>
                {activeMessages.map((m) => {
                  const mine = m.from === mySide;
                  return (
                    <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div className={`flex flex-col max-w-[75%] ${mine ? "items-end" : "items-start"}`}>
                        <div
                          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            mine
                              ? "bg-indigo-600 text-white rounded-br-sm"
                              : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                      </div>
                    </div>
                  );
                })}
                <div ref={listEndRef} />
              </div>

              {/* 入力欄 */}
              <div className="px-3 py-3 bg-white border-t border-slate-200">
                <div className="flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    placeholder="メッセージを入力…（Enterで送信）"
                    className="flex-1 resize-none max-h-28 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 placeholder:text-slate-400"
                  />
                  <button
                    onClick={send}
                    disabled={!draft.trim()}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="送信"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
              <MessageSquare className="w-10 h-10" />
              <p className="text-sm">左の一覧から会話を選択してください</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
