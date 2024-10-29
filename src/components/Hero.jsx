// import React from "react";

// export function Hero({ language }) {
//   return (
//     <div className="relative bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//           <div className="flex-1">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               {language === "en" ? (
//                 <>
//                   FIND CLOTHES
//                   <br />
//                   THAT MATCHES
//                   <br />
//                   YOUR STYLE
//                 </>
//               ) : (
//                 <>
//                   የሚስማሽ አልባሳት
//                   <br />
//                   ያግኙ
//                   <br />
//                   በእርስዎ ቅርጽ
//                 </>
//               )}
//             </h1>
//             <p className="text-gray-600 mb-6 max-w-lg">
//               {language === "en"
//                 ? "Browse through our diverse range of meticulously crafted garments, designed to bring your individuality and cater to your sense of style."
//                 : "የተቀናገሩ እና ወሳኝ የሆኑ ልብሶችን ያረጋግጡ እና በእርስዎ ቅርጽ በመስማማት ማንነትዎን የሚገልጹ አልባሳትን ያግኙ።"}
//             </p>
//             <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
//               {language === "en" ? "Shop Now" : "አሁን ይግዙ"}
//             </button>
//             <div className="grid grid-cols-3 gap-8 mt-12">
//               <div>
//                 <h3 className="text-2xl font-bold">200+</h3>
//                 <p className="text-gray-600">
//                   {language === "en" ? "International Brands" : "ዓለም አቀፋዊ ብራንዶች"}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold">2,000+</h3>
//                 <p className="text-gray-600">
//                   {language === "en" ? "High-Quality Products" : "ጥራታማ እቃዎች"}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold">30,000+</h3>
//                 <p className="text-gray-600">
//                   {language === "en" ? "Happy Customers" : "ደስተኞች ደንበኞች"}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1">
//             <img
//               src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
//               alt={language === "en" ? "Fashion" : "ፋሽን"}
//               className="w-full rounded-lg shadow-xl"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="bg-black py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map(
//               (brand) => (
//                 <span key={brand} className="text-white font-bold text-xl">
//                   {brand}
//                 </span>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 whitespace-pre-line">
          {t("hero.title")}
        </h1>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto lg:mx-0">
          {t("hero.description")}
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
          {t("hero.shopNow")}
        </button>
        <div className="grid grid-cols-3 gap-8 mt-12 text-center">
          <div>
            <h3 className="text-2xl font-bold">100+</h3>
            <p className="text-gray-600">{t("hero.internationalBrands")}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-gray-600">{t("hero.highQualityProducts")}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">1000+</h3>
            <p className="text-gray-600">{t("hero.happyCustomers")}</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
          alt="Fashion"
          className="w-full rounded-lg shadow-xl"
        />
      </div>
    </div>
  </div>
  <div className="bg-black py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map((brand) => (
          <span key={brand} className="text-white font-bold text-xl">
            {brand}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>

  );
}
