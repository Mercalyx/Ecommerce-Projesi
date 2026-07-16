const products = [
  {
    id: 1,
    name: "Kablosuz Kulaklık",
    category: "Elektronik",
    price: 899,
    oldPrice: 1099,
    rating: 4.7,
    reviewCount: 214,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description:
      "Aktif gürültü engelleme özellikli bu kablosuz kulaklık, uzun pil ömrü ve yumuşak kulak yastıklarıyla gün boyu konforlu dinleme sunar. Toplu taşımada, ofiste veya sporda; dış sesleri kesip müziğe veya odaklanmanız gereken işe kendinizi vermenizi sağlar.",
    features: [
      "Aktif gürültü engelleme (ANC)",
      "Tek şarjla 30 saate kadar pil ömrü",
      "Bluetooth 5.3 ile kararlı bağlantı",
      "Katlanabilir, seyahat çantası dahil",
    ],
    specs: {
      Bağlantı: "Bluetooth 5.3",
      "Pil Ömrü": "30 saat (ANC kapalı)",
      Ağırlık: "250 g",
      Renk: "Siyah",
      Garanti: "2 yıl",
    },
  },
  {
    id: 2,
    name: "Akıllı Saat",
    category: "Elektronik",
    price: 1450,
    oldPrice: null,
    rating: 4.5,
    reviewCount: 132,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description:
      "Nabız, uyku ve aktivite takibini tek ekranda toplayan bu akıllı saat, su geçirmez gövdesi ve hafif kayışıyla günün her anında yanınızda. Bildirimleri kaçırmaz, antrenmanlarınızı otomatik algılar.",
    features: [
      "7/24 nabız ve uyku takibi",
      "5 ATM su geçirmezlik",
      "10 güne kadar pil ömrü",
      "Telefon bildirimleri ekrana yansır",
    ],
    specs: {
      Ekran: "1.4\" AMOLED",
      "Su Direnci": "5 ATM",
      "Pil Ömrü": "10 gün",
      Uyumluluk: "iOS & Android",
      Garanti: "2 yıl",
    },
  },
  {
    id: 3,
    name: "Deri Cüzdan",
    category: "Aksesuar",
    price: 320,
    oldPrice: null,
    rating: 4.8,
    reviewCount: 89,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    description:
      "Bitkisel tabaklama yöntemiyle işlenmiş gerçek deriden üretilen bu cüzdan, kullandıkça daha da güzelleşen doğal bir patinaya sahiptir. İnce profili sayesinde cebinizde şişkinlik yapmaz.",
    features: [
      "%100 gerçek deri",
      "6 kart bölmesi + 2 gizli cep",
      "İnce, cepte şişkinlik yapmayan tasarım",
      "El işçiliğiyle dikilmiş kenarlar",
    ],
    specs: {
      Materyal: "Bitkisel tabaklanmış deri",
      Boyut: "9.5 x 11 cm",
      Renk: "Kahverengi",
      Menşei: "Türkiye",
      Garanti: "1 yıl",
    },
  },
  {
    id: 4,
    name: "Güneş Gözlüğü",
    category: "Aksesuar",
    price: 480,
    oldPrice: 620,
    rating: 4.3,
    reviewCount: 57,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    description:
      "UV400 korumalı camları sayesinde gözlerinizi zararlı ışınlardan korurken, zamansız çerçeve tasarımıyla her kombine uyum sağlar. Hafif asetat gövdesi uzun süreli kullanımda bile rahatsızlık vermez.",
    features: [
      "UV400 koruma",
      "Polarize cam seçeneği",
      "Hafif asetat çerçeve",
      "Sert kutu ve temizlik bezi dahil",
    ],
    specs: {
      "Cam Koruması": "UV400",
      Çerçeve: "Asetat",
      Renk: "Siyah / Gri cam",
      Menşei: "İtalya",
      Garanti: "1 yıl",
    },
  },
  {
    id: 5,
    name: "Pamuklu Örtü",
    category: "Ev & Yaşam",
    price: 460,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 41,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=800&q=80",
    description:
      "%100 pamuktan dokunan bu örtü, yumuşak dokusu ve şık çizgili deseniyle koltuğunuza veya yatağınıza sıcak bir katman ekler. Nefes alabilir yapısı sayesinde dört mevsim kullanılabilir.",
    features: [
      "%100 pamuk, nefes alabilir doku",
      "140 x 200 cm geniş kullanım alanı",
      "Makinede yıkanabilir",
      "Solmaya dayanıklı doğal boya",
    ],
    specs: {
      Materyal: "%100 pamuk",
      Boyut: "140 x 200 cm",
      Bakım: "30°C'de makine yıkama",
      Renk: "Kahve / Krem çizgili",
      Menşei: "Türkiye",
    },
  },
  {
    id: 6,
    name: "Aromatik Mum",
    category: "Ev & Yaşam",
    price: 210,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 176,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=800&q=80",
    description:
      "Soya bazlı doğal wax ile hazırlanan bu mum, odun ve vanilya notalarıyla eve sakinleştirici bir atmosfer katar. Temiz yanma özelliği sayesinde is bırakmaz, kokusu uzun süre odada kalır.",
    features: [
      "%100 soya wax, temiz yanma",
      "45+ saat yanma süresi",
      "Odun & vanilya aroması",
      "Yeniden kullanılabilir cam kavanoz",
    ],
    specs: {
      Materyal: "Soya wax",
      "Yanma Süresi": "45 saat",
      Koku: "Odun & Vanilya",
      Ağırlık: "220 g",
      Menşei: "Türkiye",
    },
  },
  {
    id: 7,
    name: "Spor Ayakkabı",
    category: "Giyim",
    price: 1290,
    oldPrice: 1590,
    rating: 4.4,
    reviewCount: 298,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description:
      "Örgü üst yüzeyi ve yastıklamalı tabanıyla bu spor ayakkabı, gün boyu yürüyüş ve koşularda ayağınızı rahat tutar. Esnek yapısı sayesinde doğal adım hareketini destekler.",
    features: [
      "Nefes alabilir örgü üst yüzey",
      "Yastıklamalı, esnek taban",
      "Kaymaz dış taban",
      "Hafif tasarım (tek ayak ~280 g)",
    ],
    specs: {
      "Üst Yüzey": "Örgü kumaş",
      Taban: "EVA yastıklama",
      Ağırlık: "280 g (tek ayak)",
      Renk: "Kırmızı / Siyah",
      Beden: "36 - 45 arası",
    },
  },
  {
    id: 8,
    name: "Basic Tişört",
    category: "Giyim",
    price: 350,
    oldPrice: null,
    rating: 4.2,
    reviewCount: 63,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description:
      "%100 organik pamuktan üretilen bu basic tişört, günlük kullanım için yumuşak dokusu ve rahat kesimiyle gardırobunuzun vazgeçilmezi olur. Yıkandıkça formunu korur, esnemez.",
    features: [
      "%100 organik pamuk",
      "Rahat, esnemeyen kesim",
      "Omuzda çift dikişli güçlendirme",
      "Kısık kollu, klasik yaka",
    ],
    specs: {
      Materyal: "%100 organik pamuk",
      Kesim: "Regular fit",
      Bakım: "30°C'de makine yıkama",
      Renk: "Beyaz",
      Beden: "XS - XXL arası",
    },
  },
];

export default products;
