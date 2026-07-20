const steps = [
  {
    title: "Koleksiyonunu Seç",
    desc: "FrogLove, Topkapı Treasures, Shells & Stones veya Alhambra Deluxe Edition'dan birini seç.",
  },
  {
    title: "Şansını Dene",
    desc: "Kutuyu sanal olarak aç, hangi figürün çıkabileceğini eğlenceli bir animasyonla keşfet.",
  },
  {
    title: "Kutunu Satın Al",
    desc: "Beğendiğin koleksiyonu sepete ekle, gerçek blind box'ın kapına gelsin.",
  },
  {
    title: "Sürprizini Aç",
    desc: "5 figürden biri seni bekliyor olacak — hangisi olduğunu yalnızca kutuyu açtığında öğreneceksin.",
  },
];

// No outer max-width/padding wrapper here on purpose — HomePage and
// BlindBoxDetailPage embed this in differently-shaped layouts (full-bleed
// section bands vs. one padded page container), so outer layout stays the
// caller's responsibility. Pass `id` only when a page needs an anchor target
// (HomePage's "Nasıl Çalışır?" nav link).
function HowBlindBoxWorks({ id }) {
  return (
    <div id={id} className={id ? "scroll-mt-20" : undefined}>
      <div className="max-w-xl mx-auto text-center mb-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">
          Blind Box Nasıl Çalışır?
        </h2>
        <p className="mt-3 text-brand-600 dark:text-brand-300">
          Şansını Dene yalnızca eğlence amaçlı bir sanal deneyimdir; gerçek ürünün içeriğini belirlemez.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div key={step.title} className="bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-2xl p-6">
            <div className="w-9 h-9 rounded-full bg-accent-600 text-white flex items-center justify-center text-sm font-bold mb-4">
              {i + 1}
            </div>
            <h3 className="font-semibold text-brand-950 dark:text-white mb-2">{step.title}</h3>
            <p className="text-sm text-brand-600 dark:text-brand-300 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowBlindBoxWorks;
