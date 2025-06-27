const { malvin } = require("../malvin");
const axios = require("axios");

malvin({
    pattern: "img",
    alias: ["image", "googleimage", "searchimg"],
    react: "🦋",
    desc: "البحث وتحميل صور بصيغة PNG من جوجل",
    category: "التحميل",
    use: ".img <كلمات البحث>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ يرجى إدخال كلمات للبحث\nمثال: .img قطط لطيفة");
        }

        await reply(`🔍 جارٍ البحث عن صور لكلمة *"${query}"* بصيغة PNG...`);

        const url = `https://apis.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        if (!response.data?.success || !response.data.results?.length) {
            return reply("❌ لم يتم العثور على صور. حاول بكلمات بحث مختلفة.");
        }

        const allImages = response.data.results;

        // نحاول نختار الصور بصيغة PNG فقط
        const pngImages = allImages.filter(img => img.toLowerCase().endsWith(".png"));

        const selectedImages = (pngImages.length ? pngImages : allImages)
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        await reply(`✅ تم العثور على *${selectedImages.length}* صورة ${pngImages.length ? "بصيغة PNG" : "بصيغ مختلفة"} لكلمة *"${query}"*...`);

        for (const imageUrl of selectedImages) {
            try {
                await conn.sendMessage(
                    from,
                    {
                        image: { url: imageUrl },
                        caption: `📷 نتيجة البحث عن: *${query}*\n\n👤 تم الطلب بواسطة: @${m.sender.split('@')[0]}\n🔧 تنفيذ: طرزان الواقدي`,
                        contextInfo: { mentionedJid: [m.sender] }
                    },
                    { quoted: mek }
                );
            } catch (err) {
                console.warn(`⚠️ فشل إرسال الصورة: ${imageUrl}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير بسيط بين كل صورة
        }

    } catch (error) {
        console.error('❌ خطأ في جلب الصور:', error);
        reply(`❌ حدث خطأ: ${error.message || "فشل في جلب الصور"}`);
    }
});
