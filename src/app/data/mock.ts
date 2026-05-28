export const MOCK_STUDENTS = [
  {
    id: "stu-001",
    name: "月島 光輝",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    university: "東京電機大学",
    faculty: "工学研究科",
    grade: "修士1年",
    bio: "衛星搭載通信機器の低消費電力化と高速データ転送技術の研究を行っています。ソフトウェア無線（SDR）を用いた地上局システムの構築に取り組み、将来は深宇宙通信インフラの設計に携わりたいと考えています。",
    spaceSkills: ["sk-38", "sk-109", "sk-152", "sk-44"],
    gyomu: ["gm-40", "gm-42", "gm-98", "gm-102"],
    skills: ["Python", "C", "MATLAB", "GNU Radio", "SDR"],
    catchphrase: "電波で宇宙と地球をつなぐ",
    jobInterest: "興味あり",
    jobComment: "衛星通信・宇宙機器メーカーでの研究開発職に興味があります。",
    history: [
      { year: "2021年4月", title: "東京電機大学 入学", description: "情報通信工学を専攻し、電磁気学・信号処理の基礎を学ぶ。" },
      { year: "2024年3月", title: "学部卒業・大学院進学", description: "卒業研究でSDRを用いた衛星信号受信システムを開発。" },
      { year: "2025年6月", title: "国内学会で発表", description: "衛星通信システムの低消費電力化に関する研究成果を発表。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "通信系サブシステムの設計しか経験がなく、他サブシステムとの連携方法が曖昧だった。",
        after: "システム全体の中での通信系の役割を理解し、要求トレースアビリティを意識した設計ができるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 3, 3, 3],
      week2: [4, 4, 4, 4, 3],
      week4: [5, 5, 5, 4, 4]
    },
    links: { github: "https://github.com", email: "tsukishima@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-002",
    name: "流星 蒼太",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    university: "九州大学",
    faculty: "工学部",
    grade: "学部3年",
    bio: "ロケット推進系、特に液体燃料エンジンの燃焼安定性に関心があります。CFDを用いた燃焼室内の流れ解析に取り組んでおり、将来は実際のエンジン開発現場でハードウェアに携わりたいと思っています。",
    spaceSkills: ["sk-30", "sk-29", "sk-33", "sk-51"],
    gyomu: ["gm-32", "gm-34", "gm-35"],
    skills: ["Python", "MATLAB", "C++", "OpenFOAM"],
    catchphrase: "炎を制して星へ向かう",
    jobInterest: "興味あり",
    jobComment: "宇宙機推進系の開発に関わるインターンを探しています。",
    history: [
      { year: "2022年4月", title: "九州大学 入学", description: "航空宇宙工学を専攻し、流体力学・推進工学の基礎を学ぶ。" },
      { year: "2024年8月", title: "学生ロケットプロジェクト参加", description: "ハイブリッドロケットの推進系チームに参加し、燃焼試験を実施。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "推進系以外の知識が薄く、ミッション全体の観点から推進系要求を考えられていなかった。",
        after: "デルタV予算やペイロード要求から逆算して推進系仕様を導出するアプローチを習得した。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 4, 3, 4],
      week2: [4, 4, 4, 4, 4],
      week4: [4, 5, 5, 4, 5]
    },
    links: { github: "https://github.com", twitter: "https://twitter.com" },
    isBookmarked: true
  },
  {
    id: "stu-003",
    name: "明星 燈",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    university: "名古屋大学",
    faculty: "工学研究科",
    grade: "修士1年",
    bio: "宇宙推進剤として注目されるグリーンプロペラントの合成と特性評価を研究しています。環境負荷の低い次世代推進剤の実用化に向け、燃焼特性の最適化に取り組んでいます。",
    spaceSkills: ["sk-32", "sk-33", "sk-45", "sk-70"],
    gyomu: ["gm-32", "gm-33", "gm-34", "gm-35"],
    skills: ["Python", "MATLAB", "COMSOL", "実験計画法"],
    catchphrase: "クリーンな炎で宇宙へ",
    jobInterest: "検討中",
    jobComment: "宇宙推進・化学メーカーでの研究職か大学院博士課程進学を検討中です。",
    history: [
      { year: "2021年4月", title: "名古屋大学 入学", description: "化学・材料工学の基礎を学ぶ。" },
      { year: "2025年4月", title: "大学院進学", description: "グリーンプロペラントの研究を開始。国際会議への投稿準備中。" }
    ],
    astroCampActivities: [
      {
        program: "技術プレゼンテーション研修",
        before: "専門用語に頼りすぎて、他分野の人に自分の研究を伝えられないことが多かった。",
        after: "聴衆の背景に合わせたアナロジーを使った説明ができるようになり、研究の意義が伝わりやすくなった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [2, 3, 4, 3, 3],
      week2: [3, 4, 4, 4, 3],
      week4: [4, 4, 5, 4, 4]
    },
    links: { email: "myojo@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-004",
    name: "天球 楓",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    university: "慶應義塾大学",
    faculty: "理工学部",
    grade: "学部1年",
    bio: "入学したばかりで方向性を模索中ですが、子どもの頃から宇宙探査に強い関心があります。AstroCampで多様な専門を持つ仲間たちと交流し、自分の進む道を見つけたいと思っています。",
    spaceSkills: ["sk-1", "sk-101", "sk-4"],
    gyomu: ["gm-1", "gm-2"],
    skills: ["Python", "C"],
    catchphrase: "知らない星を探す旅の始まり",
    jobInterest: "今は考えていない",
    jobComment: "まずは学びを深めることに集中したいです。",
    history: [
      { year: "2026年4月", title: "慶應義塾大学 入学", description: "理工学部に進学し、自分の専門分野を探索中。" }
    ],
    astroCampActivities: [
      {
        program: "チームビルディングワークショップ",
        before: "自分の意見を発言するのが苦手で、ディスカッションでは聞き役になりがちだった。",
        after: "小グループでの発表を繰り返すことで、積極的に発言できるようになってきた。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [2, 2, 4, 3, 3],
      week2: [3, 3, 4, 3, 4],
      week4: [3, 4, 5, 4, 4]
    },
    links: {},
    isBookmarked: false
  },
  {
    id: "stu-005",
    name: "宙野 悠",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
    university: "立教大学",
    faculty: "理学研究科",
    grade: "修士1年",
    bio: "X線天文学を専攻し、銀河団の高温ガスのスペクトル解析を行っています。観測データの統計的解析に強みがあり、宇宙機搭載センサのデータ処理アルゴリズム開発にも関心があります。",
    spaceSkills: ["sk-108", "sk-110", "sk-111", "sk-107"],
    gyomu: ["gm-119", "gm-118", "gm-112", "gm-111"],
    skills: ["Python", "C", "MATLAB", "ROOT", "HEASoft"],
    catchphrase: "宇宙の声をデータで聴く",
    jobInterest: "検討中",
    jobComment: "博士課程進学か、宇宙機データ処理の民間研究職を検討しています。",
    history: [
      { year: "2022年4月", title: "立教大学 入学", description: "物理学科に進学。天体物理学の基礎を学ぶ。" },
      { year: "2024年8月", title: "国際天文学連合ポスター発表", description: "X線観測データの解析手法に関する研究をポスター発表。" },
      { year: "2025年4月", title: "大学院進学", description: "銀河団の高温ガス研究を継続。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "観測・データ解析の知識はあるが、ミッション全体設計やエンジニアリング的観点が弱かった。",
        after: "センサ要求からシステム要求を導くトップダウン設計の考え方を理解し、工学系メンバーとの協議がスムーズになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [4, 5, 3, 3, 3],
      week2: [4, 5, 4, 4, 4],
      week4: [5, 5, 4, 4, 4]
    },
    links: { github: "https://github.com", email: "sorano@example.com" },
    isBookmarked: true
  },
  {
    id: "stu-006",
    name: "北斗 渚",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    university: "九州工業大学",
    faculty: "工学部",
    grade: "学部4年",
    bio: "超小型衛星の電源系（EPS）設計と太陽電池パネルの最大電力点追従（MPPT）制御アルゴリズムの研究をしています。九工大のCubeSatプロジェクトで実際のFM開発に携わっています。",
    spaceSkills: ["sk-37", "sk-44", "sk-24", "sk-35"],
    gyomu: ["gm-36", "gm-38", "gm-39", "gm-13"],
    skills: ["C++", "Python", "MATLAB", "SolidWorks", "KiCad"],
    catchphrase: "電力を無駄なく、衛星を力強く",
    jobInterest: "興味あり",
    jobComment: "衛星バスの電源系・電装系の開発職を中心に探しています。",
    history: [
      { year: "2022年4月", title: "九州工業大学 入学", description: "宇宙システム工学科に進学。" },
      { year: "2024年4月", title: "CubeSatプロジェクト加入", description: "電源系サブリーダーに就任。" },
      { year: "2025年10月", title: "衛星FM開発参加", description: "フライトモデルの電源系回路設計・試験を担当。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "電源系の設計はできるが、電力バジェットをミッション要求に紐づけて説明するのが苦手だった。",
        after: "ミッション要求から電力バジェットを策定し、他サブシステムへの制約として提示できるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 3, 4, 4],
      week2: [4, 4, 4, 4, 4],
      week4: [5, 5, 5, 5, 5]
    },
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    isBookmarked: true
  },
  {
    id: "stu-007",
    name: "惑星 一",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop",
    university: "日本大学",
    faculty: "理工学部",
    grade: "学部2年",
    bio: "飛行機の空力形状設計に興味があり、CFDと風洞実験を組み合わせた翼型最適化の研究を目指しています。将来は宇宙機の再突入カプセル形状設計に挑戦したいと考えています。",
    spaceSkills: ["sk-29", "sk-26", "sk-43"],
    gyomu: ["gm-24", "gm-26", "gm-32"],
    skills: ["Python", "MATLAB", "SolidWorks", "CATIA"],
    catchphrase: "形を極めて大気を切り裂く",
    jobInterest: "今は考えていない",
    jobComment: "まず学業に専念し、専門知識を深めたいです。",
    history: [
      { year: "2024年4月", title: "日本大学 入学", description: "航空宇宙工学科に進学。力学・材料力学の基礎を学ぶ。" },
      { year: "2025年6月", title: "航空学生研究会 入部", description: "紙飛行機競技を通じて揚力・抗力の基礎を体得。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "空力の知識はあるが、システムレベルでの設計経験がなかった。",
        after: "ミッションレベルから空力要求を導く手順を学び、チーム内での役割分担の重要性を実感した。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [2, 3, 4, 3, 3],
      week2: [3, 3, 4, 4, 4],
      week4: [4, 4, 5, 4, 4]
    },
    links: {},
    isBookmarked: false
  },
  {
    id: "stu-008",
    name: "星川 涼子",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    university: "早稲田大学",
    faculty: "社会科学部",
    grade: "学部4年",
    bio: "宇宙活動法と国際宇宙法の研究をしています。特に月資源採掘をめぐる国際協定の形成プロセスに関心があり、技術者と法学者・政策立案者をつなぐブリッジ人材を目指しています。",
    spaceSkills: ["sk-124", "sk-125", "sk-143", "sk-1"],
    gyomu: ["gm-150", "gm-149", "gm-3", "gm-148"],
    skills: ["Python", "R", "Excel", "統計分析"],
    catchphrase: "ルールが宇宙の扉を開く",
    jobInterest: "興味あり",
    jobComment: "宇宙機関・政策研究機関・宇宙ビジネス企業の渉外・政策部門を志望しています。",
    history: [
      { year: "2022年4月", title: "早稲田大学 入学", description: "社会科学部に進学。法学・国際関係論を学ぶ。" },
      { year: "2024年6月", title: "宇宙政策研究会 設立", description: "学内に宇宙政策研究会を設立し、代表として活動。" },
      { year: "2025年8月", title: "国際宇宙法模擬裁判参加", description: "月条約に関する模擬裁判で最優秀弁護士賞を受賞。" }
    ],
    astroCampActivities: [
      {
        program: "チーム間ディスカッションセッション",
        before: "技術的な議論についていくのが大変で、貢献できる場面が限られていた。",
        after: "技術要求と法的・政策的制約の橋渡し役として独自の視点で貢献できるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [4, 4, 4, 3, 5],
      week2: [5, 4, 5, 3, 5],
      week4: [5, 5, 5, 4, 5]
    },
    links: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", email: "hoshikawa@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-009",
    name: "昴 詩",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop",
    university: "日本文理大学",
    faculty: "工学部",
    grade: "学部1年",
    bio: "故郷の星空に魅せられ航空宇宙の道へ。まだ専門知識は浅いですが、ロケット・衛星両方に興味があり、幅広い視野を持ちながら自分の専門を磨いていきたいと思っています。",
    spaceSkills: ["sk-24", "sk-26", "sk-101"],
    gyomu: ["gm-1", "gm-13"],
    skills: ["Python", "C"],
    catchphrase: "プレアデスの数だけ夢がある",
    jobInterest: "今は考えていない",
    jobComment: "将来の方向性を模索しながら学んでいます。",
    history: [
      { year: "2026年4月", title: "日本文理大学 入学", description: "工学部航空宇宙工学科に入学。基礎的な数学・物理を学ぶ。" }
    ],
    astroCampActivities: [
      {
        program: "チームビルディングワークショップ",
        before: "入学直後で宇宙工学の知識が少なく、自信を持って発言できなかった。",
        after: "知識の量より問いを立てる姿勢が大切だと気づき、積極的に質問できるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [2, 3, 5, 4, 4],
      week2: [3, 3, 5, 4, 4],
      week4: [3, 4, 5, 4, 5]
    },
    links: {},
    isBookmarked: false
  },
  {
    id: "stu-010",
    name: "月読 陸",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop",
    university: "筑波大学",
    faculty: "理工学群",
    grade: "学部2年",
    bio: "宇宙環境計測のための小型センサシステムに興味があります。原子状酸素センサや微小重力計の小型化・高感度化に関心があり、将来は宇宙機搭載計測器の開発に携わりたいと考えています。",
    spaceSkills: ["sk-45", "sk-110", "sk-69"],
    gyomu: ["gm-27", "gm-62", "gm-69"],
    skills: ["Python", "MATLAB", "C", "LabVIEW"],
    catchphrase: "微小な変化を、宇宙規模で読み解く",
    jobInterest: "検討中",
    jobComment: "宇宙環境計測・センサ開発系のインターンに興味があります。",
    history: [
      { year: "2024年4月", title: "筑波大学 入学", description: "応用理工学類に入学。物理・化学の基礎を学ぶ。" },
      { year: "2025年9月", title: "宇宙工学研究会 入部", description: "センサ研究班に配属され、基礎実験を開始。" }
    ],
    astroCampActivities: [
      {
        program: "技術プレゼンテーション研修",
        before: "実験データはあるが、それをストーリーとして伝えるスキルが不足していた。",
        after: "データから仮説を立て、結論へ論理的に導くプレゼン構造を習得した。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 4, 3, 3],
      week2: [3, 4, 4, 4, 4],
      week4: [4, 5, 5, 4, 4]
    },
    links: { github: "https://github.com" },
    isBookmarked: false
  },
  {
    id: "stu-011",
    name: "天文 葵",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop",
    university: "筑波大学",
    faculty: "理工学群",
    grade: "学部2年",
    bio: "組み込みシステムとIoTの観点から宇宙機の搭載コンピュータ設計に興味があります。低コスト・高信頼性の搭載コンピュータ開発を目標に、ArduinoとRaspberry Piを用いた姿勢制御プロトタイプを制作中です。",
    spaceSkills: ["sk-42", "sk-101", "sk-69", "sk-40"],
    gyomu: ["gm-52", "gm-56", "gm-48"],
    skills: ["Python", "C++", "ROS", "Arduino", "Raspberry Pi"],
    catchphrase: "小さな基板で宇宙を動かす",
    jobInterest: "興味あり",
    jobComment: "宇宙機搭載コンピュータ・組込み開発のインターンを希望しています。",
    history: [
      { year: "2024年4月", title: "筑波大学 入学", description: "工学システム学類に入学。制御工学・プログラミングを学ぶ。" },
      { year: "2025年3月", title: "ハッカソン参加・入賞", description: "マイコンを使った自律ライントレースロボットで3位入賞。" }
    ],
    astroCampActivities: [
      {
        program: "ソフトウェア開発ブートキャンプ",
        before: "個人での組込み開発経験はあるが、チームでのコード管理方法を知らなかった。",
        after: "GitフローとCI/CDを活用したチーム開発の進め方を習得し、コードレビューの重要性を理解した。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 3, 4, 4, 3],
      week2: [3, 4, 4, 4, 4],
      week4: [4, 4, 5, 5, 4]
    },
    links: { github: "https://github.com", email: "tenmon@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-012",
    name: "星雲 碧",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    university: "広島大学",
    faculty: "情報科学部",
    grade: "学部3年",
    bio: "衛星画像の機械学習を用いた解析に取り組んでいます。特に農地モニタリング・災害検知への応用に関心があり、リモートセンシングデータと深層学習を組み合わせた研究を進めています。",
    spaceSkills: ["sk-111", "sk-112", "sk-108", "sk-154"],
    gyomu: ["gm-115", "gm-119", "gm-116", "gm-118"],
    skills: ["Python", "Java", "C++", "PyTorch", "TensorFlow"],
    catchphrase: "AIの目で地球を、宇宙から見守る",
    jobInterest: "検討中",
    jobComment: "衛星データ解析・リモートセンシング系の企業や大学院進学を検討しています。",
    history: [
      { year: "2023年4月", title: "広島大学 入学", description: "情報科学科に進学。アルゴリズム・機械学習の基礎を学ぶ。" },
      { year: "2025年2月", title: "Kaggleコンペ参加", description: "衛星画像分類コンペティションで銀メダルを獲得。" }
    ],
    astroCampActivities: [
      {
        program: "データ解析ワークショップ",
        before: "機械学習モデルの構築は得意だが、宇宙ミッション要求との紐づけ方がわからなかった。",
        after: "ミッション要求から検出精度・レイテンシ仕様を導き、モデル設計に反映できるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 3, 5, 3],
      week2: [4, 4, 4, 5, 4],
      week4: [4, 5, 5, 5, 4]
    },
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    isBookmarked: true
  },
  {
    id: "stu-013",
    name: "星見 大輝",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    university: "筑波大学",
    faculty: "理工学群",
    grade: "学部3年",
    bio: "宇宙機の姿勢制御系（ADCS）設計に力を入れています。特に磁気トルカとリアクションホイールを組み合わせたハイブリッド制御システムの最適化に取り組んでいます。",
    spaceSkills: ["sk-39", "sk-40", "sk-24", "sk-25"],
    gyomu: ["gm-48", "gm-50", "gm-51", "gm-13"],
    skills: ["C++", "Python", "MATLAB", "Simulink"],
    catchphrase: "宇宙機の姿勢は、制御が決める",
    jobInterest: "興味あり",
    jobComment: "衛星バスの姿勢制御系開発に特化したキャリアを目指しています。",
    history: [
      { year: "2023年4月", title: "筑波大学 入学", description: "工学システム学類に入学。制御理論を学ぶ。" },
      { year: "2025年4月", title: "CubeSat研究班 リーダー就任", description: "大学のCubeSatプロジェクトでADCSサブシステムリーダーに就任。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "制御アルゴリズム設計は得意だが、ミッションからADCS要求を導出するプロセスを理解していなかった。",
        after: "ポインティング精度要求からトルク・角速度要求を逆算するプロセスを習得した。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 4, 4, 3],
      week2: [4, 5, 4, 4, 4],
      week4: [5, 5, 5, 5, 4]
    },
    links: { github: "https://github.com", twitter: "https://twitter.com" },
    isBookmarked: false
  },
  {
    id: "stu-014",
    name: "光星 桜子",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop",
    university: "東洋大学",
    faculty: "理工学部",
    grade: "学部2年",
    bio: "宇宙機構造の熱応力解析と、複合材料を用いた軽量構造設計に関心があります。有限要素法（FEM）を使った宇宙機パネルの最適化を目指し、基礎的なANSYS解析を学んでいます。",
    spaceSkills: ["sk-26", "sk-28", "sk-45", "sk-75"],
    gyomu: ["gm-24", "gm-44", "gm-26"],
    skills: ["SolidWorks", "MATLAB", "Python", "ANSYS"],
    catchphrase: "軽くて強い構造が、宇宙機の命",
    jobInterest: "検討中",
    jobComment: "宇宙機構造設計・機械設計系の職種を検討中です。",
    history: [
      { year: "2024年4月", title: "東洋大学 入学", description: "機械工学科に入学。材料力学・熱力学を学ぶ。" },
      { year: "2025年7月", title: "FEM入門セミナー参加", description: "有限要素法の基礎を習得。構造解析ソフトの使用を開始。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "機械設計の視点しかなく、宇宙環境での特殊な設計要求（放射線・真空・温度サイクル）を考慮できていなかった。",
        after: "宇宙環境条件を構造設計要求に落とし込む手順を理解し、設計マージンの考え方が身についた。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 3, 4, 3, 4],
      week2: [4, 3, 4, 4, 4],
      week4: [4, 4, 5, 4, 5]
    },
    links: { email: "kosei@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-015",
    name: "暁 悠斗",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop",
    university: "東京都市大学",
    faculty: "理工学部",
    grade: "学部1年",
    bio: "ロボットと宇宙機の両方に興味があり、惑星探査ローバーのメカニズム設計を将来の目標にしています。現在は3DCADとプログラミングの基礎を並行して学んでいます。",
    spaceSkills: ["sk-27", "sk-159", "sk-26"],
    gyomu: ["gm-28", "gm-60"],
    skills: ["Python", "SolidWorks", "C"],
    catchphrase: "機械が走れば、夢も動き出す",
    jobInterest: "今は考えていない",
    jobComment: "学部でしっかり基礎を固めてから将来を考えます。",
    history: [
      { year: "2026年4月", title: "東京都市大学 入学", description: "機械システム工学科に入学。機械設計・制御の基礎を学ぶ。" }
    ],
    astroCampActivities: [
      {
        program: "チームビルディングワークショップ",
        before: "宇宙開発の大きな流れや業界構造についての知識が乏しかった。",
        after: "実際の衛星開発プロジェクトの事例を学び、自分が将来携わりたい領域のイメージが明確になった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [2, 3, 5, 4, 4],
      week2: [3, 3, 5, 4, 5],
      week4: [3, 4, 5, 4, 5]
    },
    links: {},
    isBookmarked: false
  },
  {
    id: "stu-016",
    name: "彗 麗",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
    university: "工学院大学",
    faculty: "先進工学部",
    grade: "学部1年",
    bio: "量子光学と宇宙観測の融合に関心があります。量子センサを使った重力波検出の高感度化や、宇宙望遠鏡の光学系設計に将来的に携わりたいと考えています。",
    spaceSkills: ["sk-110", "sk-155", "sk-69"],
    gyomu: ["gm-62", "gm-119"],
    skills: ["Python", "MATLAB", "C", "Julia"],
    catchphrase: "光の量子で宇宙の謎を解く",
    jobInterest: "今は考えていない",
    jobComment: "まずは物理の基礎をしっかり固めたいです。",
    history: [
      { year: "2026年4月", title: "工学院大学 入学", description: "先進工学部に進学。量子力学・電磁気学の基礎を学ぶ。" }
    ],
    astroCampActivities: [
      {
        program: "技術プレゼンテーション研修",
        before: "物理の理論は得意だが、工学的な応用への橋渡しが苦手だった。",
        after: "「なぜそれが宇宙ミッションに必要か」を常に意識して話す習慣がついた。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [2, 4, 4, 3, 3],
      week2: [3, 4, 4, 3, 3],
      week4: [3, 5, 5, 4, 4]
    },
    links: { email: "sui@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-017",
    name: "天河 奏",
    avatar: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=150&h=150&fit=crop",
    university: "筑波大学",
    faculty: "工学システム学類",
    grade: "学部2年",
    bio: "宇宙探査ロボットの自律行動計画と環境認識に関心があります。ROSを使った移動ロボットのナビゲーションシステム開発と、強化学習を用いた自律意思決定の統合を目指しています。",
    spaceSkills: ["sk-112", "sk-159", "sk-101", "sk-40"],
    gyomu: ["gm-56", "gm-60", "gm-48"],
    skills: ["Python", "ROS2", "C++", "Gazebo", "PyTorch"],
    catchphrase: "ロボットが自ら考え、宇宙を歩く未来へ",
    jobInterest: "興味あり",
    jobComment: "宇宙探査ロボット・自律システム開発のインターンを希望しています。",
    history: [
      { year: "2024年4月", title: "筑波大学 入学", description: "知的・機能工学システムを専攻。AI・ロボティクスの基礎を学ぶ。" },
      { year: "2025年8月", title: "ロボコン参加", description: "自律移動ロボット競技で3位。SLAM実装を経験。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "ロボット単体の機能設計に偏っており、ミッション全体の中での役割を意識できていなかった。",
        after: "探査ミッション要求からロボットの機能・性能仕様を導出するアプローチを習得した。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 4, 4, 4],
      week2: [4, 4, 4, 5, 4],
      week4: [4, 5, 5, 5, 5]
    },
    links: { github: "https://github.com", twitter: "https://twitter.com" },
    isBookmarked: true
  },
  {
    id: "stu-018",
    name: "月光 朔",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop",
    university: "九州大学",
    faculty: "工学部",
    grade: "学部3年",
    bio: "軌道設計と電気推進系の組み合わせによる低コスト軌道遷移手法の研究に興味があります。ホールスラスタの推力・比推力最適化を目指した数値シミュレーションに取り組んでいます。",
    spaceSkills: ["sk-31", "sk-51", "sk-52", "sk-30"],
    gyomu: ["gm-32", "gm-34", "gm-106"],
    skills: ["Python", "MATLAB", "C++", "SolidWorks", "STK"],
    catchphrase: "軌道を設計する者が、使命を決める",
    jobInterest: "興味あり",
    jobComment: "軌道設計・推進系開発に特化した職種を希望しています。",
    history: [
      { year: "2023年4月", title: "九州大学 入学", description: "航空宇宙工学科に入学。軌道力学・推進工学を学ぶ。" },
      { year: "2025年5月", title: "ISTS学生セッション発表", description: "電気推進系の軌道最適化に関する研究を国際シンポジウムで発表。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "推進系・軌道設計の専門知識は深いが、他サブシステムへの影響を考慮した提案ができなかった。",
        after: "システム全体の質量・電力バジェットを意識した推進系設計ができるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [4, 5, 3, 3, 3],
      week2: [4, 5, 4, 4, 4],
      week4: [5, 5, 5, 4, 4]
    },
    links: { github: "https://github.com", email: "gekko@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-019",
    name: "極星 梨花",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    university: "九州工業大学",
    faculty: "工学部",
    grade: "学部4年",
    bio: "微小重力環境での機械知能システムの挙動研究をしています。宇宙ステーション内での自律搬送ロボットの制御精度向上に取り組み、機械学習による適応制御を研究しています。",
    spaceSkills: ["sk-159", "sk-40", "sk-112", "sk-39"],
    gyomu: ["gm-48", "gm-50", "gm-105"],
    skills: ["Python", "C++", "ROS", "MATLAB", "Simulink"],
    catchphrase: "北極星のように、ぶれない精度を宇宙へ",
    jobInterest: "興味あり",
    jobComment: "宇宙ロボット・搭載システム開発の職種を希望しています。",
    history: [
      { year: "2022年4月", title: "九州工業大学 入学", description: "機械知能工学科に入学。ロボティクス・制御工学を学ぶ。" },
      { year: "2024年10月", title: "学生ロボコン全国大会出場", description: "自律ロボットチームのリーダーとして全国大会に出場。" },
      { year: "2025年8月", title: "JAXA宇宙探査研究インターン参加", description: "微小重力環境での制御系設計を研究。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "ロボット制御は得意だが、宇宙ミッション特有の信頼性・フォールトトレランスの考え方が不足していた。",
        after: "冗長設計とフェールセーフモードの設計原則を理解し、宇宙仕様のシステム設計ができるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [4, 4, 4, 4, 4],
      week2: [4, 5, 4, 5, 4],
      week4: [5, 5, 5, 5, 5]
    },
    links: { github: "https://github.com", linkedin: "https://linkedin.com", email: "kyokusei@example.com" },
    isBookmarked: true
  },
  {
    id: "stu-020",
    name: "天海 颯",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
    university: "北里大学",
    faculty: "未来工学部",
    grade: "学部3年",
    bio: "宇宙ビッグデータの解析基盤構築と、大規模衛星コンステレーションの運用最適化に関心があります。機械学習を用いた衛星異常検知システムの開発を研究テーマとして取り組んでいます。",
    spaceSkills: ["sk-107", "sk-112", "sk-110", "sk-108"],
    gyomu: ["gm-119", "gm-104", "gm-112", "gm-124"],
    skills: ["Python", "R", "TensorFlow", "SQL", "Spark"],
    catchphrase: "データが宇宙の真実を語り出す",
    jobInterest: "検討中",
    jobComment: "宇宙データ解析・衛星運用系の企業か、大学院のデータ科学系研究室進学を検討中です。",
    history: [
      { year: "2023年4月", title: "北里大学 入学", description: "データサイエンス学科に進学。統計・機械学習を学ぶ。" },
      { year: "2025年1月", title: "宇宙データ解析コンペ参加", description: "衛星テレメトリの異常検知コンペで準優勝。" }
    ],
    astroCampActivities: [
      {
        program: "データ解析ワークショップ",
        before: "データ処理の技術はあるが、宇宙機のテレメトリデータの意味・文脈を理解できていなかった。",
        after: "衛星の各サブシステムのデータとその物理的意味を理解し、より適切な異常検知モデルを構築できるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [4, 4, 4, 5, 3],
      week2: [4, 5, 4, 5, 4],
      week4: [5, 5, 5, 5, 4]
    },
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
    isBookmarked: false
  },
  {
    id: "stu-021",
    name: "輝星 空音",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop",
    university: "愛媛大学",
    faculty: "農学研究科",
    grade: "修士2年",
    bio: "衛星リモートセンシングを用いた農地・森林の環境変化モニタリング研究を行っています。多時期の光学・SAR画像融合による土地被覆分類精度の向上に取り組んでいます。",
    spaceSkills: ["sk-154", "sk-155", "sk-156", "sk-157", "sk-111"],
    gyomu: ["gm-119", "gm-115", "gm-118", "gm-111"],
    skills: ["Python", "R", "QGIS", "Google Earth Engine", "SAR解析"],
    catchphrase: "宇宙から見れば、地球の声が聞こえる",
    jobInterest: "興味あり",
    jobComment: "地球観測衛星の利用・データ解析系の職種を希望しています。",
    history: [
      { year: "2020年4月", title: "愛媛大学 入学", description: "農学部に進学。生態学・GISを学ぶ。" },
      { year: "2024年4月", title: "大学院進学", description: "生物環境学専攻に進学。衛星リモートセンシング研究を開始。" },
      { year: "2025年11月", title: "国際リモートセンシング学会発表", description: "SAR・光学画像融合手法の研究成果を国際学会で発表。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "衛星データの利用者として関わってきたが、衛星設計・運用側の視点を持っていなかった。",
        after: "地球観測ミッションのミッション要求を利用者視点で定式化できるようになり、設計チームとの対話が実質的になった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [4, 4, 4, 3, 4],
      week2: [4, 5, 4, 4, 4],
      week4: [5, 5, 5, 4, 5]
    },
    links: { github: "https://github.com", email: "kisei@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-022",
    name: "望月 伊純",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop",
    university: "大阪公立大学",
    faculty: "工学部",
    grade: "学部3年",
    bio: "宇宙機の空力減速技術、特にスペースデブリ除去のための空力捕捉システムの研究に興味があります。高速流中での展開膜構造の空力特性解析に取り組んでいます。",
    spaceSkills: ["sk-29", "sk-26", "sk-160", "sk-30"],
    gyomu: ["gm-24", "gm-26", "gm-32", "gm-34"],
    skills: ["Python", "MATLAB", "C++", "SolidWorks", "OpenFOAM"],
    catchphrase: "デブリのない宇宙を、後世に",
    jobInterest: "興味あり",
    jobComment: "宇宙デブリ問題・持続可能な宇宙利用に関わる研究開発職を希望。",
    history: [
      { year: "2023年4月", title: "大阪公立大学 入学", description: "航空宇宙工学科に入学。空力・構造の基礎を学ぶ。" },
      { year: "2025年3月", title: "宇宙デブリ対策コンペ入賞", description: "学生向けデブリ除去ミッション提案コンテストで優秀賞を受賞。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "デブリ除去の技術要素は調べていたが、ミッション全体の費用対効果や実現性の評価が苦手だった。",
        after: "ミッション・アーキテクチャトレードオフの方法論を学び、複数の技術案を比較・評価できるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 4, 3, 4],
      week2: [4, 4, 4, 4, 4],
      week4: [5, 5, 5, 4, 5]
    },
    links: { github: "https://github.com", twitter: "https://twitter.com", email: "mochizuki@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-023",
    name: "金星 昊",
    avatar: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=150&h=150&fit=crop",
    university: "帝京大学",
    faculty: "理工学部",
    grade: "学部3年",
    bio: "複合材料（CFRP）を用いたロケット機体の軽量化設計に取り組んでいます。製造コストと強度のトレードオフを考慮した最適積層設計の研究を進めています。",
    spaceSkills: ["sk-26", "sk-45", "sk-150", "sk-66"],
    gyomu: ["gm-24", "gm-25", "gm-26"],
    skills: ["Python", "MATLAB", "SolidWorks", "CATIA", "ANSYS"],
    catchphrase: "材料の可能性が、宇宙の可能性",
    jobInterest: "検討中",
    jobComment: "航空宇宙機体設計・材料開発系の職種か大学院進学を検討中です。",
    history: [
      { year: "2023年4月", title: "帝京大学 入学", description: "航空宇宙工学科に入学。材料力学・製造工学を学ぶ。" },
      { year: "2025年6月", title: "複合材製造実習参加", description: "CFRPのハンドレイアップとオートクレーブ成形を経験。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "材料・製造の視点はあるが、ミッション要求から構造要求を導く上流工程の経験がなかった。",
        after: "打上げ環境（振動・衝撃・熱）の要求から構造仕様を設定するアプローチを習得した。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 3, 4, 3, 4],
      week2: [3, 4, 4, 4, 4],
      week4: [4, 4, 5, 4, 5]
    },
    links: { email: "kinsei@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-024",
    name: "北極 黎",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop",
    university: "東北大学",
    faculty: "工学部",
    grade: "学部4年",
    bio: "宇宙機搭載ミッション機器のFPGA実装と放射線耐性設計を研究しています。宇宙放射線環境でのシングルイベント効果（SEE）に対する回路設計手法の確立に取り組んでいます。",
    spaceSkills: ["sk-35", "sk-36", "sk-42", "sk-77", "sk-50"],
    gyomu: ["gm-36", "gm-52", "gm-54"],
    skills: ["Python", "C", "FPGA", "Verilog", "MATLAB"],
    catchphrase: "回路の一点が、宇宙の任務を守る",
    jobInterest: "興味あり",
    jobComment: "宇宙機搭載機器の電気設計・FPGA開発職を志望しています。",
    history: [
      { year: "2022年4月", title: "東北大学 入学", description: "電気情報物理工学科に入学。電子回路・プログラミングを学ぶ。" },
      { year: "2024年7月", title: "FPGA設計コンテスト参加", description: "画像処理アクセラレータをFPGA実装し、2位入賞。" },
      { year: "2025年10月", title: "ISAS放射線試験見学", description: "宇宙部品の放射線試験プロセスを学ぶ機会を得た。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "回路単体の設計はできるが、システムレベルでの電気設計要求の導出が苦手だった。",
        after: "ミッション要求から電気系要求仕様書を作成するプロセスを習得し、上位設計との接続ができるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 5, 3, 4, 3],
      week2: [4, 5, 4, 4, 3],
      week4: [4, 5, 5, 5, 4]
    },
    links: { github: "https://github.com", email: "hokkyoku@example.com" },
    isBookmarked: true
  },
  {
    id: "stu-025",
    name: "浮星 伊吹",
    avatar: "https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=150&h=150&fit=crop",
    university: "早稲田大学",
    faculty: "創造理工学部",
    grade: "学部1年",
    bio: "宇宙建築・月面居住施設の設計に関心があります。建築の視点から、宇宙環境特有の放射線・真空・微小重力に対応した居住モジュールのデザインを探求したいと考えています。",
    spaceSkills: ["sk-162", "sk-26", "sk-161", "sk-89"],
    gyomu: ["gm-60", "gm-62"],
    skills: ["Python", "Rhinoceros", "Grasshopper", "AutoCAD", "Revit"],
    catchphrase: "地球の果てに、人が住める場所を",
    jobInterest: "今は考えていない",
    jobComment: "まず建築の基礎を身につけながら、宇宙建築の可能性を探りたいです。",
    history: [
      { year: "2026年4月", title: "早稲田大学 入学", description: "創造理工学部建築学科に入学。空間デザイン・構造を学ぶ。" }
    ],
    astroCampActivities: [
      {
        program: "チームビルディングワークショップ",
        before: "建築出身として工学系メンバーとの共通言語を持っておらず、ディスカッションに溶け込めなかった。",
        after: "宇宙機開発における「要求」の概念が建築の「設計与条件」に近いと気づき、自分の視点を活かして貢献できるようになった。"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 3, 5, 3, 4],
      week2: [3, 4, 5, 3, 5],
      week4: [4, 4, 5, 4, 5]
    },
    links: { email: "ukiboshi@example.com" },
    isBookmarked: false
  },
  {
    id: "stu-026",
    name: "銀星 翼",
    avatar: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=150&h=150&fit=crop",
    university: "名古屋大学",
    faculty: "工学部",
    grade: "学部4年",
    bio: "小型衛星コンステレーションの軌道最適化とスラスタ設計の統合研究を行っています。多機能衛星群の分散型軌道維持戦略の策定に力を入れており、将来は衛星システム全体のシステムエンジニアを目指しています。",
    spaceSkills: ["sk-24", "sk-51", "sk-52", "sk-31"],
    gyomu: ["gm-1", "gm-13", "gm-14", "gm-106"],
    skills: ["Python", "MATLAB", "C++", "SolidWorks", "STK"],
    catchphrase: "銀河系の星の数だけ、衛星を飛ばす夢を",
    jobInterest: "興味あり",
    jobComment: "衛星コンステレーション開発を手掛ける宇宙ベンチャーや大手宇宙機器メーカーのインターンを探しています。",
    history: [
      { year: "2022年4月", title: "名古屋大学 入学", description: "機械・航空宇宙工学科に入学。軌道力学・推進工学を学ぶ。" },
      { year: "2024年4月", title: "CanSatプロジェクト参加", description: "軌道計算・推進系設計を担当。" },
      { year: "2025年6月", title: "宇宙工学コンペ最優秀賞", description: "コンステレーション設計提案コンペで最優秀賞を受賞。" }
    ],
    astroCampActivities: [
      {
        program: "ミッション設計ワークショップ",
        before: "軌道計算と推進系の個別最適化はできるが、コンステレーション全体の統合最適化の手法を知らなかった。",
        after: "ミッション要求からコンステレーション設計パラメータを系統的に導く手法を習得し、システムレベルの提案ができるようになった。",
        image: "https://images.unsplash.com/photo-1541888086225-f6740f90d341?w=400&h=250&fit=crop"
      }
    ],
    skillMatrix: {
      labels: ["進捗報告力", "質問の的確性", "レビュー受容度", "改善実行速度", "チーム協調性"],
      week0: [3, 4, 4, 4, 4],
      week2: [4, 5, 4, 5, 4],
      week4: [5, 5, 5, 5, 5]
    },
    links: { github: "https://github.com", twitter: "https://twitter.com", linkedin: "https://linkedin.com", email: "ginsei@example.com" },
    isBookmarked: true
  }
];

export const AEROSPACE_STUDENT_IDS = new Set([
  "stu-001", "stu-002", "stu-003", "stu-005", "stu-006", "stu-007", "stu-009",
  "stu-011", "stu-013", "stu-014", "stu-015", "stu-017", "stu-018", "stu-019",
  "stu-022", "stu-023", "stu-024", "stu-026",
]);

export const STUDENT_DEPARTMENTS: Record<string, string> = {
  "stu-001": "電気情報工学科",
  "stu-002": "航空宇宙工学科",
  "stu-003": "化学・材料工学科",
  "stu-004": "物理情報工学科",
  "stu-005": "物理学科",
  "stu-006": "宇宙システム工学科",
  "stu-007": "航空宇宙工学科",
  "stu-008": "社会科学科",
  "stu-009": "航空宇宙工学科",
  "stu-010": "応用理工学類",
  "stu-011": "工学システム学類",
  "stu-012": "情報科学科",
  "stu-013": "工学システム学類",
  "stu-014": "機械工学科",
  "stu-015": "機械システム工学科",
  "stu-016": "先進工学科",
  "stu-017": "工学システム学類",
  "stu-018": "航空宇宙工学科",
  "stu-019": "機械知能工学科",
  "stu-020": "データサイエンス学科",
  "stu-021": "生物環境学専攻",
  "stu-022": "航空宇宙工学科",
  "stu-023": "航空宇宙工学科",
  "stu-024": "電気情報物理工学科",
  "stu-025": "建築学科",
  "stu-026": "機械・航空宇宙工学科",
};

export const MOCK_COMPANY_STATS = {
  totalStudents: 26,
  skillDistribution: [
    { tag: "構造設計・解析", count: 8 },
    { tag: "機械学習・深層学習（AI）", count: 6 },
    { tag: "ソフトウェアエンジニアリング", count: 5 },
    { tag: "軌道設計・解析", count: 4 },
    { tag: "姿勢制御系の設計・解析", count: 4 },
    { tag: "リモートセンシング", count: 4 },
    { tag: "画像処理・解析技術", count: 4 },
    { tag: "推進系設計・解析", count: 3 },
    { tag: "データ前処理・アノテーション技術", count: 3 },
    { tag: "ロボティクス", count: 3 }
  ]
};
