import { Hiragana } from '@/types'

export interface Kanji {
  character: string
  meaning: string
  readings: string[]
  romaji: string[]
  category: string
}

export const kanjiN5Data: Kanji[] = [
  // Angka
  { character: "一", meaning: "satu", readings: ["いち"], romaji: ["ichi"], category: "angka" },
  { character: "二", meaning: "dua", readings: ["に"], romaji: ["ni"], category: "angka" },
  { character: "三", meaning: "tiga", readings: ["さん"], romaji: ["san"], category: "angka" },
  { character: "四", meaning: "empat", readings: ["し", "よん"], romaji: ["shi", "yon"], category: "angka" },
  { character: "五", meaning: "lima", readings: ["ご"], romaji: ["go"], category: "angka" },
  { character: "六", meaning: "enam", readings: ["ろく"], romaji: ["roku"], category: "angka" },
  { character: "七", meaning: "tujuh", readings: ["しち", "なな"], romaji: ["shichi", "nana"], category: "angka" },
  { character: "八", meaning: "delapan", readings: ["はち"], romaji: ["hachi"], category: "angka" },
  { character: "九", meaning: "sembilan", readings: ["く", "きゅう"], romaji: ["ku", "kyuu"], category: "angka" },
  { character: "十", meaning: "sepuluh", readings: ["じゅう"], romaji: ["juu"], category: "angka" },
  { character: "百", meaning: "seratus", readings: ["ひゃく"], romaji: ["hyaku"], category: "angka" },
  { character: "千", meaning: "seribu", readings: ["せん"], romaji: ["sen"], category: "angka" },
  { character: "万", meaning: "sepuluh ribu", readings: ["まん"], romaji: ["man"], category: "angka" },
  { character: "円", meaning: "yen", readings: ["えん"], romaji: ["en"], category: "angka" },

  // Waktu
  { character: "日", meaning: "hari, matahari", readings: ["にち", "ひ"], romaji: ["nichi", "hi"], category: "waktu" },
  { character: "月", meaning: "bulan", readings: ["げつ", "つき"], romaji: ["getsu", "tsuki"], category: "waktu" },
  { character: "火", meaning: "api", readings: ["か"], romaji: ["ka"], category: "waktu" },
  { character: "水", meaning: "air", readings: ["すい", "みず"], romaji: ["sui", "mizu"], category: "waktu" },
  { character: "木", meaning: "pohon", readings: ["もく", "き"], romaji: ["moku", "ki"], category: "waktu" },
  { character: "金", meaning: "emas, uang", readings: ["きん"], romaji: ["kin"], category: "waktu" },
  { character: "土", meaning: "tanah", readings: ["ど", "つち"], romaji: ["do", "tsuchi"], category: "waktu" },
  { character: "時", meaning: "waktu", readings: ["じ"], romaji: ["ji"], category: "waktu" },
  { character: "分", meaning: "menit, bagian", readings: ["ふん", "ぶん"], romaji: ["fun", "bun"], category: "waktu" },
  { character: "間", meaning: "selang, antara", readings: ["かん", "あいだ"], romaji: ["kan", "aida"], category: "waktu" },
  { character: "半", meaning: "setengah", readings: ["はん"], romaji: ["han"], category: "waktu" },

  // Orang dan Keluarga
  { character: "人", meaning: "orang", readings: ["じん", "にん"], romaji: ["jin", "nin"], category: "orang" },
  { character: "男", meaning: "laki-laki", readings: ["だん", "おとこ"], romaji: ["dan", "otoko"], category: "orang" },
  { character: "女", meaning: "perempuan", readings: ["じょ", "おんな"], romaji: ["jo", "onna"], category: "orang" },
  { character: "子", meaning: "anak", readings: ["し", "こ"], romaji: ["shi", "ko"], category: "orang" },
  { character: "父", meaning: "ayah", readings: ["ふ", "ちち"], romaji: ["fu", "chichi"], category: "orang" },
  { character: "母", meaning: "ibu", readings: ["ぼ", "はは"], romaji: ["bo", "haha"], category: "orang" },
  { character: "友", meaning: "teman", readings: ["ゆう"], romaji: ["yuu"], category: "orang" },
  { character: "口", meaning: "mulut", readings: ["こう", "くち"], romaji: ["kou", "kuchi"], category: "orang" },
  { character: "目", meaning: "mata", readings: ["もく", "め"], romaji: ["moku", "me"], category: "orang" },
  { character: "耳", meaning: "telinga", readings: ["みみ"], romaji: ["mimi"], category: "orang" },
  { character: "手", meaning: "tangan", readings: ["しゅ", "て"], romaji: ["shu", "te"], category: "orang" },
  { character: "足", meaning: "kaki", readings: ["そく", "あし"], romaji: ["soku", "ashi"], category: "orang" },

  // Alam
  { character: "山", meaning: "gunung", readings: ["さん", "やま"], romaji: ["san", "yama"], category: "alam" },
  { character: "川", meaning: "sungai", readings: ["せん", "かわ"], romaji: ["sen", "kawa"], category: "alam" },
  { character: "田", meaning: "sawah", readings: ["でん", "た"], romaji: ["den", "ta"], category: "alam" },
  { character: "空", meaning: "langit, kosong", readings: ["くう", "そら"], romaji: ["kuu", "sora"], category: "alam" },
  { character: "気", meaning: "energi, udara", readings: ["き", "け"], romaji: ["ki", "ke"], category: "alam" },
  { character: "雨", meaning: "hujan", readings: ["う", "あめ"], romaji: ["u", "ame"], category: "alam" },
  { character: "花", meaning: "bunga", readings: ["か", "はな"], romaji: ["ka", "hana"], category: "alam" },
  { character: "草", meaning: "rumput", readings: ["そう", "くさ"], romaji: ["sou", "kusa"], category: "alam" },
  { character: "林", meaning: "hutan", readings: ["りん", "はやし"], romaji: ["rin", "hayashi"], category: "alam" },

  // Arah dan Lokasi
  { character: "上", meaning: "atas", readings: ["じょう", "うえ"], romaji: ["jou", "ue"], category: "arah" },
  { character: "下", meaning: "bawah", readings: ["か", "した"], romaji: ["ka", "shita"], category: "arah" },
  { character: "左", meaning: "kiri", readings: ["さ", "ひだり"], romaji: ["sa", "hidari"], category: "arah" },
  { character: "右", meaning: "kanan", readings: ["う", "みぎ"], romaji: ["u", "migi"], category: "arah" },
  { character: "中", meaning: "tengah", readings: ["ちゅう", "なか"], romaji: ["chuu", "naka"], category: "arah" },
  { character: "外", meaning: "luar", readings: ["がい", "そと"], romaji: ["gai", "soto"], category: "arah" },
  { character: "前", meaning: "depan", readings: ["ぜん", "まえ"], romaji: ["zen", "mae"], category: "arah" },
  { character: "後", meaning: "belakang", readings: ["ご", "うしろ"], romaji: ["go", "ushiro"], category: "arah" },
  { character: "東", meaning: "timur", readings: ["とう", "ひがし"], romaji: ["tou", "higashi"], category: "arah" },
  { character: "西", meaning: "barat", readings: ["せい", "にし"], romaji: ["sei", "nishi"], category: "arah" },
  { character: "南", meaning: "selatan", readings: ["なん", "みなみ"], romaji: ["nan", "minami"], category: "arah" },
  { character: "北", meaning: "utara", readings: ["ほく", "きた"], romaji: ["hoku", "kita"], category: "arah" },

  // Aktivitas dan Kata Kerja
  { character: "見", meaning: "melihat", readings: ["けん", "み"], romaji: ["ken", "mi"], category: "aktivitas" },
  { character: "聞", meaning: "mendengar", readings: ["ぶん", "き"], romaji: ["bun", "ki"], category: "aktivitas" },
  { character: "書", meaning: "menulis", readings: ["しょ", "か"], romaji: ["sho", "ka"], category: "aktivitas" },
  { character: "読", meaning: "membaca", readings: ["どく", "よ"], romaji: ["doku", "yo"], category: "aktivitas" },
  { character: "行", meaning: "pergi", readings: ["こう", "い"], romaji: ["kou", "i"], category: "aktivitas" },
  { character: "来", meaning: "datang", readings: ["らい", "く"], romaji: ["rai", "ku"], category: "aktivitas" },
  { character: "食", meaning: "makan", readings: ["しょく", "た"], romaji: ["shoku", "ta"], category: "aktivitas" },
  { character: "飲", meaning: "minum", readings: ["いん", "の"], romaji: ["in", "no"], category: "aktivitas" },
  { character: "言", meaning: "berkata", readings: ["げん", "い"], romaji: ["gen", "i"], category: "aktivitas" },
  { character: "話", meaning: "berbicara", readings: ["わ", "はな"], romaji: ["wa", "hana"], category: "aktivitas" },
  { character: "立", meaning: "berdiri", readings: ["りつ", "た"], romaji: ["ritsu", "ta"], category: "aktivitas" },
  { character: "休", meaning: "istirahat", readings: ["きゅう", "やす"], romaji: ["kyuu", "yasu"], category: "aktivitas" },

  // Kata Sifat dan Lainnya
  { character: "大", meaning: "besar", readings: ["だい", "おお"], romaji: ["dai", "oo"], category: "sifat" },
  { character: "小", meaning: "kecil", readings: ["しょう", "ちい"], romaji: ["shou", "chii"], category: "sifat" },
  { character: "多", meaning: "banyak", readings: ["た"], romaji: ["ta"], category: "sifat" },
  { character: "少", meaning: "sedikit", readings: ["しょう", "すく"], romaji: ["shou", "suku"], category: "sifat" },
  { character: "新", meaning: "baru", readings: ["しん", "あたら"], romaji: ["shin", "atara"], category: "sifat" },
  { character: "古", meaning: "lama", readings: ["こ", "ふる"], romaji: ["ko", "furu"], category: "sifat" },
  { character: "高", meaning: "tinggi", readings: ["こう", "たか"], romaji: ["kou", "taka"], category: "sifat" },
  { character: "安", meaning: "murah", readings: ["あん", "やす"], romaji: ["an", "yasu"], category: "sifat" },
  { character: "白", meaning: "putih", readings: ["はく", "しろ"], romaji: ["haku", "shiro"], category: "sifat" },
  { character: "黒", meaning: "hitam", readings: ["こく", "くろ"], romaji: ["koku", "kuro"], category: "sifat" },
  { character: "赤", meaning: "merah", readings: ["せき", "あか"], romaji: ["seki", "aka"], category: "sifat" },
  { character: "青", meaning: "biru/hijau", readings: ["せい", "あお"], romaji: ["sei", "ao"], category: "sifat" },

  // Kata Benda Umum
  { character: "車", meaning: "mobil", readings: ["しゃ", "くるま"], romaji: ["sha", "kuruma"], category: "benda" },
  { character: "電", meaning: "listrik", readings: ["でん"], romaji: ["den"], category: "benda" },
  { character: "語", meaning: "bahasa", readings: ["ご"], romaji: ["go"], category: "benda" },
  { character: "学", meaning: "belajar", readings: ["がく", "まな"], romaji: ["gaku", "mana"], category: "benda" },
  { character: "校", meaning: "sekolah", readings: ["こう"], romaji: ["kou"], category: "benda" },
  { character: "生", meaning: "hidup", readings: ["せい", "なま"], romaji: ["sei", "nama"], category: "benda" },
  { character: "店", meaning: "toko", readings: ["てん", "みせ"], romaji: ["ten", "mise"], category: "benda" },
  { character: "社", meaning: "perusahaan", readings: ["しゃ", "やしろ"], romaji: ["sha", "yashiro"], category: "benda" },
  { character: "会", meaning: "bertemu", readings: ["かい", "あ"], romaji: ["kai", "a"], category: "benda" },
  { character: "道", meaning: "jalan", readings: ["どう", "みち"], romaji: ["dou", "michi"], category: "benda" },
  { character: "駅", meaning: "stasiun", readings: ["えき"], romaji: ["eki"], category: "benda" },
  { character: "名", meaning: "nama", readings: ["めい", "な"], romaji: ["mei", "na"], category: "benda" }
]