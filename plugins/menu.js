const moment = require("moment-timezone");
const { malvin } = require("../malvin");

malvin({
  pattern: "menu",
  alias: ["help", "?"],
  react: "📚",
  desc: "عرض قائمة الأوامر الرئيسية",
  category: "الواجهة",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const now = moment().tz("Asia/Riyadh");
    const time = now.format("HH:mm:ss");
    const date = now.format("dddd, MMMM Do YYYY");

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeFormatted = `${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية`;

    const response = `
╭─╼『 🤖 *طرزان الواقدي* 』╾─
│
│ 👤 المستخدم : @${m.sender.split("@")[0]}
│ 🕒 الوقت   : ${time}
│ 📆 التاريخ : ${date}
│ 📊 مدة التشغيل : ${uptimeFormatted}
│ 📚 الأوامر : .menu3
│
╰──────⭑

📚 *قائمة الأقسام:*
➊ ⬇️ التحميل
➋ 💬 المجموعات
➌ 🕹️ المرح
➍ 👑 المالك
➎ 🧠 الذكاء الاصطناعي
➏ 🌸 الأنمي
➐ 🔁 التحويلات
➑ 🧩 أخرى
➒ 💫 التفاعلات
➓ 🏕️ الرئيسية
⓫ 🎨 تصميم الشعارات
⓬ ⚙️ الإعدادات

💡 اكتب *.menu3* لعرض جميع الأوامر.

> 🛠️ *تم بواسطة: طرزان الواقدي*
`;

    await reply(response);
  } catch (err) {
    console.error("Menu Error:", err);
    await reply("❌ حدث خطأ أثناء عرض القائمة.");
  }
});
