const { malvin } = require('../malvin');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require("node-fetch");

malvin({
    pattern: "video",
    alias: ["ytvideo", "mp4"],
    react: "📽",
    desc: "تحميل فيديو من يوتيوب بصيغة MP4",
    category: "التحميل",
    use: ".video <اسم الفيديو أو الرابط>",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("❓ ما هو الفيديو الذي تريد تحميله؟ الرجاء إدخال اسم أو رابط.");

        await reply("🔍 *جاري البحث عن الفيديو، الرجاء الانتظار...*");

        const search = await ytsearch(q);
        if (!search.results.length) return reply("❌ لم يتم العثور على نتائج لهذا البحث.");

        const { title, thumbnail, timestamp, url } = search.results[0];
        const videoUrl = encodeURIComponent(url);

        // استخدم فقط API واحد موثوق
        const api = `https://apis-keith.vercel.app/download/dlmp4?url=${videoUrl}`;

        const res = await fetch(api);
        const data = await res.json();

        if (!data?.status || !data?.result?.downloadUrl) {
            return reply("❌ فشل تحميل الفيديو من المصدر الأساسي.");
        }

        const downloadUrl = data.result.downloadUrl;

        // إرسال صورة الفيديو وتفاصيله
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: `🎬 *تم العثور على الفيديو:*\n\n📌 *العنوان:* ${title}\n⏱️ *المدة:* ${timestamp}\n🔗 *الرابط:* ${url}\n\n> © بواسطة طرزان الواقدي`
        }, { quoted: mek });

        // إرسال الفيديو
        await conn.sendMessage(from, {
            video: { url: downloadUrl },
            mimetype: "video/mp4",
            caption: `✅ *تم تحميل الفيديو بنجاح!*\n\n> © بواسطة طرزان الواقدي`
        }, { quoted: mek });

    } catch (error) {
        reply(`❌ حدث خطأ أثناء التحميل:\n${error.message}`);
    }
});
