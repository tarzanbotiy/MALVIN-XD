const axios = require("axios");
const { malvin } = require("../malvin");

malvin({
  pattern: "tiktok",
  alias: ["ttdl", "tiktokdl", "tt"],
  react: '📥',
  desc: "تحميل فيديوهات تيك توك بدون علامة مائية",
  category: "التحميل",
  use: ".tiktok <رابط فيديو TikTok>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const tiktokUrl = args[0];
    if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
      return reply('❗ يرجى إدخال رابط صحيح لفيديو على TikTok. مثال: `.tiktok https://tiktok.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return reply('❌ لم يتمكن البوت من جلب الفيديو. تحقق من الرابط.');
    }

    const { title, thumbnail, author, metrics, url } = response.data.result;

    await reply(`📥 *جاري تحميل فيديو TikTok من المستخدم @${author.username}...*`);

    const videoResponse = await axios.get(url, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      return reply('⚠️ حدث خطأ أثناء تحميل الفيديو. حاول لاحقًا.');
    }

    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    await conn.sendMessage(from, {
      video: videoBuffer,
      caption:
        `🎬 *فيديو TikTok*\n\n` +
        `📌 *العنوان:* ${title || "بدون عنوان"}\n` +
        `👤 *الناشر:* @${author.username} (${author.nickname})\n` +
        `❤️ *الإعجابات:* ${metrics.digg_count}\n` +
        `💬 *التعليقات:* ${metrics.comment_count}\n` +
        `🔁 *المشاركات:* ${metrics.share_count}\n` +
        `📥 *التحميلات:* ${metrics.download_count}\n\n` +
        `> 🔥 تم بواسطة *طرزان الواقدي*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '0029VbAoLCmEFeXrNmu9yh0o@newsletter',
          newsletterName: '『 طرزان الواقدي 』',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error('خطأ أثناء تحميل فيديو TikTok:', error);
    reply('❌ تعذر تحميل الفيديو. حاول مرة أخرى لاحقًا.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});
