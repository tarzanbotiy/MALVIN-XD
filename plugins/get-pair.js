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
        // استخراج الرقم من الأمر أو من الرقم المرسل
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // التحقق من صحة الرقم
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ يرجى إدخال رقم هاتف صحيح بدون `+`\nمثال: `.pair 26371475xxx`");
        }

        // طلب رمز الاقتران من API الصحيح
        const response = await axios.get(`https://new-session-x1e9.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!response.data || !response.data.code) {
            return await reply("❌ فشل في جلب رمز الاقتران. حاول مرة أخرى لاحقًا.");
        }

        const pairingCode = response.data.code;

        // إرسال الرمز برسالة منسقة
        await reply(`✅ *تم إنشاء رمز الاقتران بنجاح*\n\n🔐 *الرمز الخاص بك:* ${pairingCode}\n\n👑 تم بواسطة: *طرزان الواقدي*`);

        // تأخير بسيط
        await new Promise(resolve => setTimeout(resolve, 2000));

        // إرسال الرمز فقط
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("خطأ في أمر pair:", error.message);
        await reply("❌ حدث خطأ أثناء جلب رمز الاقتران. يرجى المحاولة لاحقًا.");
    }
});
