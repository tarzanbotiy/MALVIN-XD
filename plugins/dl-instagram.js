const axios = require("axios");
const { malvin } = require("../malvin");

// تحميل صور وفيديوهات من منشورات إنستغرام
malvin({
  pattern: "igimagedl",
  alias: ["instagramimages", "igimages", "igimage"],
  react: '📥',
  desc: "تحميل منشورات إنستغرام (صور أو فيديوهات)",
  category: "التحميل",
  use: ".igdl <رابط منشور إنستغرام>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const igUrl = args[0];
    if (!igUrl || !igUrl.includes("instagram.com")) {
      return reply('❗ يرجى إدخال رابط صحيح لمنشور على إنستغرام. مثال: `.igdl https://instagram.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.fgmods.xyz/api/downloader/igdl?url=${encodeURIComponent(igUrl)}&apikey=E8sfLg9l`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status || !response.data.result) {
      return reply('❌ لم يتمكن البوت من جلب المنشور. تأكد من الرابط.');
    }

    const { url, caption, username, like, comment, isVideo } = response.data.result;

    await reply(`📥 *جاري تحميل منشور إنستغرام من @${username}...*`);

    for (const mediaUrl of url) {
      const mediaResponse = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
      if (!mediaResponse.data) {
        return reply('⚠️ حدث خطأ أثناء تحميل الوسائط. حاول مرة أخرى.');
      }

      const mediaBuffer = Buffer.from(mediaResponse.data, 'binary');

      const captionText = `📥 *منشور إنستغرام*\n\n` +
        `👤 *المستخدم:* @${username}\n` +
        `❤️ *الإعجابات:* ${like}\n` +
        `💬 *التعليقات:* ${comment}\n` +
        `📝 *الوصف:* ${caption || "بدون وصف"}\n\n` +
        `> 📌 تم بواسطة *طرزان الواقدي*`;

      if (isVideo) {
        await conn.sendMessage(from, { video: mediaBuffer, caption: captionText }, { quoted: mek });
      } else {
        await conn.sendMessage(from, { image: mediaBuffer, caption: captionText }, { quoted: mek });
      }
    }

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error('خطأ أثناء تحميل منشور إنستغرام:', error);
    reply('❌ فشل في تحميل المنشور. حاول لاحقًا.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

// تحميل فيديوهات من إنستغرام فقط
malvin({
  pattern: "igvid",
  alias: ["igvideo", "ig", "instagram", "igdl"],
  react: '📥',
  desc: "تحميل فيديوهات من إنستغرام",
  category: "التحميل",
  use: ".igvid <رابط فيديو من إنستغرام>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const igUrl = args[0];
    if (!igUrl || !igUrl.includes("instagram.com")) {
      return reply('❗ يرجى إدخال رابط صحيح لفيديو على إنستغرام. مثال: `.igvid https://instagram.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.nexoracle.com/downloader/aio2?apikey=free_key@maher_apis&url=${encodeURIComponent(igUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return reply('❌ لم يتمكن البوت من جلب الفيديو. تحقق من الرابط.');
    }

    const { title, low, high } = response.data.result;
    const videoUrl = high || low;

    await reply(`📥 *جاري تحميل فيديو إنستغرام: ${title || "بدون عنوان"}...*`);

    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      return reply('⚠️ حدث خطأ أثناء تحميل الفيديو. حاول مرة أخرى.');
    }

    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    await conn.sendMessage(from, {
      video: videoBuffer,
      caption: `📥 *فيديو إنستغرام*\n\n` +
        `🎞️ *العنوان:* ${title || "بدون عنوان"}\n\n` +
        `> 📌 تم بواسطة *طرزان الواقدي*`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error('خطأ أثناء تحميل فيديو إنستغرام:', error);
    reply('❌ فشل في تحميل الفيديو. حاول لاحقًا.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
