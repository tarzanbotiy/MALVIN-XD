const { malvin } = require('../malvin');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require("node-fetch");
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// ✅ أمر تحميل فيديو يوتيوب (MP4)
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

        // المحاولة الأولى: API الأساسي
        const api1 = `https://apis-keith.vercel.app/download/dlmp4?url=${videoUrl}`;
        const api2 = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${videoUrl}`;

        let data;

        try {
            const res1 = await fetch(api1);
            data = await res1.json();
            if (!data?.status || !data?.result?.downloadUrl) throw new Error("فشل API الأساسي");
        } catch {
            const res2 = await fetch(api2);
            data = await res2.json();
            if (!data?.success || !data?.result?.download_url) throw new Error("فشل تحميل الفيديو من جميع المصادر");
        }

        const downloadUrl = data.result.downloadUrl || data.result.download_url;

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
