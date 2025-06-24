const { malvin } = require("../malvin"); const moment = require("moment-timezone");

malvin({ pattern: "menu", alias: ["help", "?"], react: "📚", desc: "عرض قائمة الأوامر الرئيسية", category: "الواجهة", filename: __filename }, async (conn, mek, m, { from, reply }) => { try { const now = moment().tz("Asia/Riyadh"); const time = now.format("HH:mm:ss"); const date = now.format("dddd, MMMM Do YYYY"); const uptime = process.uptime(); const hours = Math.floor(uptime / 3600); const minutes = Math.floor((uptime % 3600) / 60); const seconds = Math.floor(uptime % 60); const uptimeFormatted = ${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية;

const text = `

╭─╼『 👑 طرزان الواقدي بوت 』╾─ │ │ 🧑‍💻 المستخدم : ©️طرزان الواقدي │ 🌍 الحالة : [ عامة ] │ 🕒 الوقت : ${time} │ 📅 التاريخ : ${date} │ ⚙️ البادئة : [ . ] │ 📊 الأوامر : 348 │ 🔁 التشغيل : ${uptimeFormatted} │ 🛠️ المطور : طرزان الواقدي │ 🚀 الإصدار : 0.0.6 │ ╰──────⭑

📚 قائمة الأقسام: رد على الرقم لفتح القسم المطلوب

╭──〔 🗂️ أقسام الأوامر 〕── │ │ ➊  ⬇️  قسم التحميلات │ ➋  💬  قسم المجموعات │ ➌  🕹️  قسم التسلية │ ➍  👑  قسم المطوّر │ ➎  🧠  قسم الذكاء الاصطناعي │ ➏  🌸  قسم الأنمي │ ➐  🔁  قسم التحويلات │ ➑  🧩  قسم متنوع │ ➒  💫  قسم التفاعلات │ ➓  🏕️  القائمة الرئيسية │ ⓫  🎨  صانع الشعارات │ ⓬  ⚙️  الإعدادات │ ╰─⭑ 💡 اكتب الأمر (.allmenu) لعرض جميع الأوامر

> 🦍 تم بواسطة طرزان الواقدي`;



await reply(text);

} catch (error) { console.error("menu command error:", error); await reply("❌ حدث خطأ

