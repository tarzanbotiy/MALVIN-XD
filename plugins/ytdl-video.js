const config = require('../settings');
const { malvin } = require('../malvin');
const yts = require('yt-search');

malvin({
    pattern: "video2",
    alias: ["vid", "video2"],
    react: "🎥",
    desc: "تحميل فيديو من يوتيوب",
    category: "التحميل",
    use: ".video2 <رابط أو اسم الفيديو>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ الرجاء إدخال اسم الفيديو أو رابط من يوتيوب!");

        let videoUrl, title;
        
        // التحقق هل هو رابط مباشر
        if (q.match(/(youtube\.com|youtu\.be)/)) {
            videoUrl = q;
            const videoInfo = await yts({ videoId: q.split(/[=/]/).pop() });
            title = videoInfo.title;
        } else {
            // البحث في يوتيوب
            const search = await yts(q);
            if (!search.videos.length) return await reply("❌ لم يتم العثور على نتائج!");
            videoUrl = search.videos[0].url;
            title = search.videos[0].title;
        }

        await reply("⏳ جاري تحميل الفيديو، الرجاء الانتظار...");

        // واجهة API لتحميل الفيديو
        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.success) return await reply("❌ فشل في تحميل الفيديو من الرابط المحدد!");

        // إرسال الفيديو
        await conn.sendMessage(from, {
            video: { url: data.result.download_url },
            mimetype: 'video/mp4',
            caption: `🎬 *${title}*\n\n📥 تم التحميل بواسطة *طرزان الواقدي*`
        }, { quoted: mek });

        await reply(`✅ تم تحميل الفيديو: *${title}* بنجاح!`);

    } catch (error) {
        console.error(error);
        await reply(`❌ حدث خطأ أثناء التحميل:\n${error.message}`);
    }
});
