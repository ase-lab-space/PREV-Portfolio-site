export const MOCK_STUDENTS = [
  {
    id: "stu-001",
    name: "星野 宇宙",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    university: "東京工業大学",
    faculty: "工学院",
    grade: "修士1年",
    bio: "小型人工衛星の熱制御サブシステムに関する研究を行っています。特に深宇宙探査機向けの新型ラジエーター開発に興味があります。AstroCampでは実践的なシステムズエンジニアリングの手法を学び、チームでのミッション設計に挑戦したいです。",
    interests: ["熱制御工学", "システムズエンジニアリング", "深宇宙探査"],
    skills: ["Python", "MATLAB", "SolidWorks", "C++", "STK"],
    catchphrase: "熱を制する者が宇宙を制す",
    jobInterest: "興味あり", // 興味あり, 検討中, 今は考えていない
    jobComment: "特に小型衛星ベンチャーでの長期インターンを探しています。",
    history: [
      { year: "2022年4月", title: "東京工業大学 入学", description: "工学院に進学し、基礎的な機械工学・宇宙工学を学ぶ。" },
      { year: "2024年8月", title: "学生宇宙団体 入部", description: "CanSatプロジェクトの熱・構造系サブリーダーを担当。全国大会で技術賞を受賞。" },
      { year: "2026年4月", title: "大学院進学", description: "同大学院の修士課程に進学し、深宇宙探査機の熱制御研究を開始。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "システム全体を見る視点が弱く、自分の専門分野（熱）ばかりに偏りがちだった。",
        after: "システムズエンジニアリングの考え方を学び、他サブシステムとのトレードオフを意識して設計できるようになった。",
        image: "https://images.unsplash.com/photo-1541888086225-f6740f90d341?w=400&h=250&fit=crop"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [2, 3, 4, 2, 3],
      week2: [3, 4, 4, 3, 4],
      week4: [4, 5, 5, 4, 5]
    },
    links: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "hoshino@example.com"
    },
    isBookmarked: true
  },
  {
    id: "stu-002",
    name: "天野 月子",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    university: "京都大学",
    faculty: "工学部",
    grade: "学部4年",
    bio: "姿勢制御（ADCS）のアルゴリズム開発に興味があります。機械学習を用いた自律的な異常検知・姿勢回復システムの構築を目指しています。",
    interests: ["ADCS", "軌道力学", "機械学習"],
    skills: ["Python", "C", "ROS", "PyTorch"],
    catchphrase: "AIで拓く自律宇宙機",
    jobInterest: "検討中",
    jobComment: "大学院への進学も視野に入れつつ、R&D系のインターンに興味があります。",
    history: [
      { year: "2023年4月", title: "京都大学 入学", description: "宇宙工学を専攻。" },
      { year: "2025年10月", title: "AI系ハッカソン 優勝", description: "衛星画像解析のハッカソンで最優秀賞を受賞。" }
    ],
    astroCampActivities: [
      {
        program: "ソフトウェア開発ブートキャンプ",
        before: "個人開発の経験しかなく、Gitを使ったチーム開発の作法がわからなかった。",
        after: "CI/CDの構築や、コードレビューを通じた品質向上のプロセスを身につけた。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 3, 3, 4, 2],
      week2: [4, 4, 4, 4, 3],
      week4: [4, 5, 5, 5, 4]
    },
    links: {
      github: "https://github.com"
    },
    isBookmarked: false
  },
  {
    id: "stu-003",
    name: "銀河 翔",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    university: "東北大学",
    faculty: "理学部",
    grade: "修士2年",
    bio: "惑星探査ローバーの自律走行システムの研究をしています。特に不整地でのナビゲーション技術に強みがあります。",
    interests: ["ロボティクス", "ナビゲーション", "画像処理"],
    skills: ["C++", "ROS2", "OpenCV", "Gazebo"],
    catchphrase: "どんな星でも走り抜ける",
    jobInterest: "興味あり",
    jobComment: "ハードウェアとソフトウェアの両方に関われるポジションを探しています。",
    history: [
      { year: "2024年4月", title: "大学院進学", description: "ロボティクス研究室に所属。" }
    ],
    astroCampActivities: [],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [4, 4, 3, 3, 4],
      week2: [4, 4, 4, 4, 4],
      week4: [5, 4, 5, 4, 5]
    },
    links: {},
    isBookmarked: true
  }
];

export const MOCK_COMPANY_STATS = {
  totalStudents: 156,
  skillDistribution: [
    { tag: "Python", count: 120 },
    { tag: "C++", count: 85 },
    { tag: "MATLAB", count: 64 },
    { tag: "SolidWorks", count: 52 },
    { tag: "ROS", count: 48 },
    { tag: "機械学習", count: 45 },
    { tag: "熱制御", count: 30 },
    { tag: "ADCS", count: 28 },
    { tag: "システムズエンジニアリング", count: 25 },
    { tag: "推進系", count: 22 }
  ]
};
