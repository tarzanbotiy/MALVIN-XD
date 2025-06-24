const { malvin } = require("../malvin");

malvin({
  pattern: "newsletter",
  alias: ["cjid", "id"],
  react: "📡",
  desc: "جلب معلومات قناة واتساب من الرابط",
  category: "واتساب",
  filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
  try {
    if (!q)
      return reply(`❗ *يرجى إدخال رابط قناة واتساب.*\n\n📌 *مثال:*\n.newsletter https://whatsapp.com/channel/xxxxxxxxxx`);

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match)
      return reply(`⚠️ *الرابط غير صالح!*\nتأكد أن الرابط يبدو هكذا:\nhttps://whatsapp.com/channel/xxxxxxxxx`);

    const inviteId = match[1];
    let metadata;

    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch {
      return reply("🚫 *فشل في جلب معلومات القناة.*\nتحقق من الرابط وحاول مرة أخرى.");
    }

    if (!metadata?.id)
      return reply("❌ *القناة غير موجودة أو لا يمكن الوصول إليها.*");

    const infoText = `
╭──❖『 📡 معلومات القناة 』❖──
│
│ 🆔 *المعرف:* ${metadata.id}
│ 📛 *الاسم:* ${metadata.name}
│ 👥 *عدد المتابعين:* ${metadata.subscribers?.toLocaleString() || "غير متوفر"}
│ 🗓️ *تاريخ الإنشاء:* ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString("ar-EG") : "غير معروف"}
│
╰─⌯ تم بواسطة: *طرزان الواقدي*
`;

    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText
      }, { quoted: m });
    } else {
      reply(infoText);
    }

  } catch (err) {
    console.error("❌ خطأ في جلب معلومات القناة:", err);
    reply("⚠️ *حدث خطأ غير متوقع أثناء جلب معلومات القناة.*");
  }
});
