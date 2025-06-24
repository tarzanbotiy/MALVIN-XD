const axios = require("axios");
const { malvin } = require("../malvin");

// دالة مساعده لتحويل رمز الدولة إلى علم
function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(letter => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

malvin({
    pattern: "check",
    desc: "تحقق من رمز الدولة الدولي وأظهر اسم الدولة والعلم",
    category: "أدوات",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        let code = args[0];
        if (!code) {
            return reply("❌ الرجاء إدخال رمز دولة. مثال: `.check 966`");
        }

        // إزالة أي علامات '+' إن وُجدت
        code = code.replace(/\+/g, '');

        // جلب بيانات الدول من API
        const url = "https://restcountries.com/v2/all";
        const { data } = await axios.get(url);

        // البحث عن الدول التي تحتوي على رمز الاتصال المدخل
        const matchingCountries = data.filter(country =>
            country.callingCodes && country.callingCodes.includes(code)
        );

        if (matchingCountries.length > 0) {
            const countryNames = matchingCountries
                .map(country => `${getFlagEmoji(country.alpha2Code)} ${country.translations.ar || country.name}`)
                .join("\n");

            reply(`✅ *رمز الدولة:* +${code}\n🌍 *الدولة/الدول:*\n${countryNames}\n\n🔖 تم بواسطة: *طرزان الواقدي*`);
        } else {
            reply(`❌ لا توجد دولة مطابقة للرمز: +${code}`);
        }
    } catch (error) {
        console.error(error);
        reply("❌ حدث خطأ أثناء التحقق من رمز الدولة.");
    }
});
