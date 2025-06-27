const { malvin } = require("../malvin");
const axios = require("axios");

malvin({
    pattern: "img",
    alias: ["image", "googleimage", "searchimg"],
    react: "🦋",
    desc: "البحث وتحميل صور من جوجل",
    category: "التحميل",
    use: ".img <كلمات البحث>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ يرجى إدخال كلمات للبحث\nمثال: .img قطط لطيفة");
        }

        await reply(`🔍 جارٍ البحث عن صور لكلمة *"${query}"*...`);

        const url = `https://apis.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        if (!response.data?.success || !response.data.results?.length) {
            return reply("❌ لم يتم العثور على صور. حاول بكلمات بحث مختلفة.");
        }

        const results = response.data.results;
        await reply(`✅ تم العثور على *${results.length}* نتيجة لكلمة *"${query}"*. سيتم إرسال أفضل 5 صور...`);

        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const imageUrl of selectedImages) {
            try {
                await conn.sendMessage(
                    from,
                    {
                        image: { url: imageUrl },
                        caption: `📷 نتيجة البحث عن: *${query}*\n\n👤 تم الطلب بواسطة: @${m.sender.split('@')[0]}\n🔧 تم التنفيذ بواسطة: طرزان الواقدي`,
                        contextInfo: { mentionedJid: [m.sender] }
                    },
                    { quoted: mek }
                );
            } catch (err) {
                console.warn(`⚠️ فشل إرسال الصورة: ${imageUrl}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error('خطأ في البحث عن الصور:', error);
        reply(`❌ حدث خطأ: ${error.message || "فشل في جلب الصور"}`);
    }
});
