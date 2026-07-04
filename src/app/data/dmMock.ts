// DM（ダイレクトメッセージ）用のモックデータ。
// バックエンドなし・メモリのみ（GitHub Pages 展示想定）。リロードで初期化される。

import { MOCK_STUDENTS, MOCK_COMPANIES } from "./mock";

export type DmSender = "company" | "student";

export interface DmMessage {
  id: string;
  from: DmSender;
  text: string;
  time: string; // 表示用の時刻文字列（例: "10:24"）
}

// DMの送信元となる企業（採用担当）。Layout の "ASE-Lab.採用担当" に倣う。
export const CURRENT_COMPANY = {
  id: "co-ase-lab",
  name: "ASE-Lab. 採用担当",
  avatar:
    "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=150&h=150&fit=crop",
};

// 学生ごとの初期会話（モック）。マウント時に useState の初期値として使う。
export function initialThread(studentName: string): DmMessage[] {
  const first = studentName.split(/\s+/)[0] || studentName;
  return [
    {
      id: "m1",
      from: "company",
      text: `${first}さん、はじめまして。${CURRENT_COMPANY.name}です。AstroCampでのご活動を拝見し、ぜひ一度お話しできればと思いご連絡しました。`,
      time: "10:24",
    },
    {
      id: "m2",
      from: "student",
      text: "ご連絡ありがとうございます！ぜひお話しさせてください。",
      time: "10:31",
    },
    {
      id: "m3",
      from: "company",
      text: "ありがとうございます。来週でご都合のよい日時はありますか？オンラインでのカジュアル面談を考えています。",
      time: "10:35",
    },
  ];
}

// 学生からの簡易オート返信（モック）。送信時にランダムで1つ返す。
export const STUDENT_AUTO_REPLIES = [
  "ありがとうございます、確認します！",
  "承知しました。詳細を教えていただけますか？",
  "ぜひお願いします！楽しみにしています。",
  "なるほど、検討してみますね。",
];

// 企業（採用担当）からの簡易オート返信（モック）。学生視点のDMで使う。
export const COMPANY_AUTO_REPLIES = [
  "ご返信ありがとうございます！ぜひ前向きに進めさせてください。",
  "承知しました。あらためて日程候補をお送りしますね。",
  "ありがとうございます。詳しい資料をお送りします。",
  "了解です！何かご不明点があればいつでもご連絡ください。",
];

// ── 専用DMページ用：会話一覧モデル ────────────────────────────
// 企業視点では相手は学生、学生視点では相手は企業になる。
export interface DmConversation {
  id: string;              // 会話ID（相手のID）
  partnerName: string;     // 相手の表示名
  subtitle: string;        // 大学・学年 / 企業カテゴリ など
  time: string;            // 最終メッセージの時刻ラベル
  unread: number;          // 未読数（モック）
  messages: DmMessage[];   // 会話スレッド
  partnerAvatar?: string;  // 学生の場合：顔写真URL
  partnerIcon?: string;    // 企業の場合：lucideアイコン名
  partnerGradient?: string;// 企業の場合：バナーのグラデーション
  partnerAccent?: string;  // 企業の場合：アクセント色キー
}

const TIME_LABELS = ["10:35", "昨日", "昨日", "月曜", "9/24", "9/22"];
const UNREADS = [2, 0, 0, 1, 0, 0];

// 学生視点：企業（相手）→ 自分（学生）の初期スレッド。
export function studentThread(companyName: string): DmMessage[] {
  return [
    {
      id: "m1",
      from: "company",
      text: `星野さん、はじめまして。${companyName} 採用担当です。AstroCampでのプロフィールを拝見し、ぜひ一度お話しできればと思いご連絡しました。`,
      time: "10:24",
    },
    {
      id: "m2",
      from: "student",
      text: "ご連絡ありがとうございます！ぜひお話しさせてください。",
      time: "10:31",
    },
    {
      id: "m3",
      from: "company",
      text: "ありがとうございます。来週でご都合のよい日時はありますか？オンラインでのカジュアル面談を考えています。",
      time: "10:35",
    },
  ];
}

// 企業視点の会話一覧（相手＝学生）。
export function buildCompanyConversations(): DmConversation[] {
  return MOCK_STUDENTS.slice(0, 6).map((s, i) => ({
    id: s.id,
    partnerName: s.name,
    subtitle: `${s.university}・${s.grade}`,
    time: TIME_LABELS[i] ?? "",
    unread: UNREADS[i] ?? 0,
    messages: initialThread(s.name),
    partnerAvatar: s.avatar,
  }));
}

// 学生視点の会話一覧（相手＝企業）。
export function buildStudentConversations(): DmConversation[] {
  return MOCK_COMPANIES.slice(0, 6).map((c, i) => ({
    id: c.id,
    partnerName: c.name,
    subtitle: c.category,
    time: TIME_LABELS[i] ?? "",
    unread: UNREADS[i] ?? 0,
    messages: studentThread(c.name),
    partnerIcon: c.icon,
    partnerGradient: c.gradient,
    partnerAccent: c.accent,
  }));
}
