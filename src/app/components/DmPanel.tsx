import { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles } from "lucide-react";
import {
  CURRENT_COMPANY, initialThread, STUDENT_AUTO_REPLIES,
  type DmMessage,
} from "../data/dmMock";

interface DmPanelProps {
  open: boolean;
  onClose: () => void;
  student: { name: string; avatar: string };
}

function nowLabel(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function DmPanel({ open, onClose, student }: DmPanelProps) {
  const [messages, setMessages] = useState<DmMessage[]>(() => initialThread(student.name));
  const [draft, setDraft] = useState("");
  const listEndRef = useRef<HTMLDivElement>(null);

  // 別の学生のパネルを開いたら会話を初期化（メモリのみ）
  useEffect(() => {
    setMessages(initialThread(student.name));
  }, [student.name]);

  // 新着メッセージで最下部へスクロール
  useEffect(() => {
    if (open) listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Escで閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const mine: DmMessage = { id: `c-${Date.now()}`, from: "company", text, time: nowLabel() };
    setMessages((prev) => [...prev, mine]);
    setDraft("");
    // 学生からの簡易オート返信（モック）
    const reply = STUDENT_AUTO_REPLIES[Math.floor(Math.random() * STUDENT_AUTO_REPLIES.length)];
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `s-${Date.now()}`, from: "student", text: reply, time: nowLabel() },
      ]);
    }, 900);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/25 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Right Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-slate-50 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="ダイレクトメッセージ"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white flex-shrink-0">
            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-slate-900 truncate">{student.name}</div>
            <div className="text-xs text-slate-400 font-medium">ダイレクトメッセージ</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              {CURRENT_COMPANY.name} とのDM
            </span>
          </div>

          {messages.map((m) => {
            const mine = m.from === "company";
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className={`flex flex-col max-w-[80%] ${mine ? "items-end" : "items-start"}`}>
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

        {/* Composer */}
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
      </div>
    </>
  );
}
