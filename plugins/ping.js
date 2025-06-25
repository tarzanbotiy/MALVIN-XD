const config = require('../settings');
const { malvin, commands } = require('../malvin');

malvin({
    pattern: "ping",
    alias: ["speed", "pong", "ping2", "ping3"],
    use: '.ping',
    desc: "تحقق من سرعة استجابة البوت.",
    category: "الرئيسية",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const startTime = Date.now();

        const emojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹', '💎', '🏆', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // تفاعل مباشر مع إيموجي عشوائي
        await conn.sendMessage(from, {
            react: { text: randomEmoji, key: mek.key }
        });

        const ping = Date.now() - startTime;

        // تصنيف السرعة
        let badge = '🐢 بطيء', color = '🔴';
        if (ping <= 150) {
            badge = '🚀 سريع جدًا';
            color = '🟢';
        } else if (ping <= 300) {
            badge = '⚡ سريع';
            color = '🟡';
        } else if (ping <= 600) {
            badge = '⚠️ متوسط';
            color = '🟠';
        }

        // الرد النهائي
        await conn.sendMessage(from, {
            text: `> *الاستجابة: ${ping} مللي ثانية ${randomEmoji}*\n> *الحالة: ${color} ${badge}*\n> *الإصدار: ${config.version}*\n\n👑 تم بواسطة: *طرزان الواقدي*`,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418716672821@newsletter',
                    newsletterName: "Tarzan Alwaqdiy",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("❌ خطأ في أمر ping:", e);
        reply(`⚠️ حدث خطأ: ${e.message}`);
    }
});
