const { malvin, commands } = require('../malvin');
const axios = require('axios');

malvin({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "استخراج رمز الاقتران مع بوت MALVIN-XD",
    category: "بوتات",
    use: ".pair 263714757xxx",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
    try {
        // استخراج رقم الهاتف من الأمر أو من مرسل الرسالة
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // التحقق من صحة الرقم
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ يرجى إدخال رقم هاتف صحيح بدون `+`\nمثال: `.pair 26371475xxx`");
        }

        // طلب رمز الاقتران من API
        const response = await axios.get(`https://new-session-1-d2kb.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!response.data || !response.data.code) {
            return await reply("❌ فشل في جلب رمز الاقتران. حاول مرة أخرى لاحقًا.");
        }

        const pairingCode = response.data.code;

        // إرسال الرسالة الأولى بتنسيق
        await reply(`✅ *تم إنشاء رمز الاقتران بنجاح*\n\n🔐 *الرمز الخاص بك:* ${pairingCode}\n\n👑 تم بواسطة: *طرزان الواقدي*`);

        // تأخير اختياري 2 ثانية
        await new Promise(resolve => setTimeout(resolve, 2000));

        // إرسال الرمز النظيف
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("خطأ في أمر pair:", error);
        await reply("❌ حدث خطأ أثناء جلب رمز الاقتران. يرجى المحاولة لاحقًا.");
    }
});
