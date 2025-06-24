const axios = require('axios');
const config = require('../settings');
const { malvin, commands } = require('../malvin');
const util = require("util");

malvin({
    pattern: "vv3",
    alias: ['retrive', '🔥'],
    desc: "استرجاع رسالة مشاهدة لمرة واحدة (صورة / فيديو / صوت).",
    category: "متنوعة",
    use: '<الرد على الرسالة>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // الرسالة المقتبسة

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;

            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption || '';
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, {
                    image: { url: anu },
                    caption: cap + "\n\n🔓 *تم الاسترجاع بواسطة طرزان الواقدي*"
                }, { quoted: mek });
            }

            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption || '';
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, {
                    video: { url: anu },
                    caption: cap + "\n\n🔓 *تم الاسترجاع بواسطة طرزان الواقدي*"
                }, { quoted: mek });
            }

            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, {
                    audio: { url: anu }
                }, { quoted: mek });
            }
        }

        // إذا لم تكن الرسالة من نوع ViewOnce
        if (!m.quoted) return reply("❗ *يرجى الرد على رسالة مشاهدة لمرة واحدة.*");

        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption || '';
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, {
                    image: { url: anu },
                    caption: cap + "\n\n🔓 *تم الاسترجاع بواسطة طرزان الواقدي*"
                }, { quoted: mek });
            } else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption || '';
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, {
                    video: { url: anu },
                    caption: cap + "\n\n🔓 *تم الاسترجاع بواسطة طرزان الواقدي*"
                }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, {
                audio: { url: anu }
            }, { quoted: mek });
        } else {
            return reply("❌ *الرسالة التي تم الرد عليها ليست من نوع مشاهدة لمرة واحدة.*");
        }
    } catch (e) {
        console.log("خطأ:", e);
        reply("⚠️ *حدث خطأ أثناء استرجاع الرسالة.*");
    }
});
