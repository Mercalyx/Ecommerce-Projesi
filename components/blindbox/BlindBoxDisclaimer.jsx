function BlindBoxDisclaimer() {
  return (
    <div className="mt-10 space-y-4 text-sm text-brand-600 dark:text-brand-300 leading-relaxed bg-brand-50/70 dark:bg-brand-900/60 border border-brand-100 dark:border-brand-800 rounded-xl p-5">
      <p>
        Her blind box, koleksiyondaki beş figürden birini içerir. Kutunun içerisindeki figür satın almadan önce bilinemez.
        Aynı seriden birden fazla kutu aldığında aynı figür çıkabilir. Şansını Dene özelliği yalnızca eğlence amaçlı bir
        sanal açılış deneyimidir ve satın alınan fiziksel ürünün içeriğini belirlemez.
      </p>
      <p className="text-brand-500 dark:text-brand-400">
        Açılmış blind box ürünleri, koleksiyon niteliği ve ürün güvenliği nedeniyle iade edilemez.
      </p>
    </div>
  );
}

export default BlindBoxDisclaimer;
