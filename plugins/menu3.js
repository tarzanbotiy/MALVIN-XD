const { malvin } = require("../malvin"); const moment = require("moment-timezone");

malvin( { pattern: "menu3", desc: "عرض قائمة الأوامر", category: "الواجهة", filename: __filename, }, async (conn, mek, m, { from, pushName, prefix, reply }) => { try { const now = moment().tz("Asia/Riyadh"); const time = now.format("HH:mm:ss"); const date = now.format("dddd, MMMM Do YYYY"); const uptime = process.uptime(); const hours = Math.floor(uptime / 3600); const minutes = Math.floor((uptime % 3600) / 60); const seconds = Math.floor(uptime % 60); const uptimeFormatted = ${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية;

const menuText = `

╭─❍ 🤖 ᴍᴀʟᴠɪɴ-xᴅ ❍ ┆ 👤 ᴜsᴇʀ: ${pushName || "مستخدم"} ┆ 🌐 ᴍᴏᴅᴇ: [public] ┆ 🕒 ᴛɪᴍᴇ: ${time} ┆ 📆 ᴅᴀᴛᴇ: ${date} ┆ 🔁 ᴜᴘᴛɪᴍᴇ: ${uptimeFormatted} ┆ ✨ ᴘʀᴇғɪx: [${prefix}] ┆ 📋 ᴛᴏᴛᴀʟ ᴄᴍᴅs: 348 ┆ 👑 ᴅᴇᴠ: طرزان الواقدي ┆ 📌 ᴠᴇʀsɪᴏɴ: 0.0.6-ᴀʟᴘʜᴀ ╰─────────────✦

┌──『 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴍᴅs 📥 』 │ ⬡ xvideo │ ⬡ bible │ ⬡ biblelist │ ⬡ apk │ ⬡ fb │ ⬡ gdrive │ ⬡ img │ ⬡ mediafire2 │ ⬡ mediafire │ ⬡ ytpost │ ⬡ pindl │ ⬡ gitclone │ ⬡ movie │ ⬡ news │ ⬡ npm │ ⬡ tts │ ⬡ tiktok2 │ ⬡ porn │ ⬡ yts │ ⬡ play │ ⬡ yt2 │ ⬡ song └────────────✦

┌──『 🧑‍💻 ᴏᴡɴᴇʀ ᴄᴍᴅs 🧑‍💻 』 │ ⬡ vv2 │ ⬡ ban │ ⬡ unban │ ⬡ listban │ ⬡ block │ ⬡ unblock │ ⬡ channelreact │ ⬡ version │ ⬡ owner │ ⬡ pp │ ⬡ get │ ⬡ jid │ ⬡ admin │ ⬡ leave │ ⬡ dailyfact │ ⬡ shutdown │ ⬡ broadcast │ ⬡ setpp │ ⬡ clearchats │ ⬡ gjid │ ⬡ privacy │ ⬡ blocklist │ ⬡ getbio │ ⬡ setppall │ ⬡ setonline │ ⬡ setpp │ ⬡ setmyname │ ⬡ updatebio │ ⬡ getprivacy │ ⬡ getpp │ ⬡ restart │ ⬡ take │ ⬡ sticker │ ⬡ setsudo │ ⬡ delsudo │ ⬡ listsudo │ ⬡ forward │ ⬡ person │ ⬡ msg │ ⬡ savecontact │ ⬡ post └────────────✦

┌──『 👥 ɢʀᴏᴜᴘ ᴄᴍᴅs 👥 』 │ ⬡ requestlist │ ⬡ acceptall │ ⬡ rejectall │ ⬡ updategdesc │ ⬡ updategname │ ⬡ taginactive │ ⬡ ginfo │ ⬡ join │ ⬡ invite │ ⬡ lockgc │ ⬡ mute │ ⬡ newgc │ ⬡ poll │ ⬡ revoke │ ⬡ hidetag │ ⬡ tagall │ ⬡ removemembers │ ⬡ removeadmins │ ⬡ removeall2 │ ⬡ unlockgc │ ⬡ unmute │ ⬡ antilink │ ⬡ antilinkkick │ ⬡ deletelink │ ⬡ antibot │ ⬡ delete │ ⬡ groupsprivacy │ ⬡ tagadmins │ ⬡ broadcast │ ⬡ notify │ ⬡ ghostping └────────────✦

┌──『 🔄 ᴄᴏɴᴠᴇʀᴛ ᴄᴍᴅs 🔄 』 │ ⬡ convert │ ⬡ tomp3 │ ⬡ toptt │ ⬡ topdf │ ⬡ vsticker │ ⬡ attp │ ⬡ aivoice │ ⬡ readmore │ ⬡ rmbg │ ⬡ tinyurl │ ⬡ ad │ ⬡ blur │ ⬡ grey │ ⬡ invert │ ⬡ jail │ ⬡ imgjoke │ ⬡ nokia │ ⬡ wanted │ ⬡ tts2 │ ⬡ tts3 └────────────✦

┌──『 🎉 ғᴜɴ ᴄᴍs 🎉 』 │ ⬡ couplepp │ ⬡ ringtone │ ⬡ emix │ ⬡ happy │ ⬡ heart │ ⬡ angry │ ⬡ sad │ ⬡ shy │ ⬡ moon │ ⬡ confused │ ⬡ hot │ ⬡ nikal │ ⬡ compatibility │ ⬡ aura │ ⬡ 8ball │ ⬡ compliment │ ⬡ lovetest │ ⬡ emoji │ ⬡ fancy │ ⬡ didyouknow │ ⬡ marige │ ⬡ quiz │ ⬡ ship │ ⬡ squidgame │ ⬡ konami │ ⬡ hack │ ⬡ quote │ ⬡ rw │ ⬡ rcolor │ ⬡ roll │ ⬡ coinflip │ ⬡ flip │ ⬡ pick │ ⬡ shapar │ ⬡ rate │ ⬡ countx │ ⬡ count │ ⬡ loveyou │ ⬡ remind │ ⬡ spamjoke │ ⬡ pray4me │ ⬡ shout │ ⬡ joke │ ⬡ flirt │ ⬡ truth │ ⬡ dare │ ⬡ fact │ ⬡ pickupline │ ⬡ character │ ⬡ repeat │ ⬡ send └────────────✦

┌──『 🎨 ʟᴏɢᴏ ᴄᴍᴅs 🎨 』 │ ⬡ 3dcomic │ ⬡ dragonball │ ⬡ deadpool │ ⬡ blackpink │ ⬡ neonlight │ ⬡ cat │ ⬡ sadgirl │ ⬡ pornhub │ ⬡ naruto │ ⬡ thor │ ⬡ america │ ⬡ eraser │ ⬡ 3dpaper │ ⬡ futuristic │ ⬡ clouds │ ⬡ sans │ ⬡ galaxy │ ⬡ leaf │ ⬡ sunset │ ⬡ nigeria │ ⬡ devilwings │ ⬡ hacker │ ⬡ boom │ ⬡ luxury │ ⬡ zodiac │ ⬡ angelwings │ ⬡ bulb │ ⬡ tatoo │ ⬡ castle │ ⬡ frozen │ ⬡ paint │ ⬡ birthday │ ⬡ typography │ ⬡ bear │ ⬡ ytlogo └────────────✦

┌──『 🪄 sᴇᴛᴛɪɴɢs ᴄᴍᴅs 🪄 』 │ ⬡ antidelete │ ⬡ admin-events │ ⬡ faketyping │ ⬡ fakerecording │ ⬡ welcome │ ⬡ mode │ ⬡ auto-typing │ ⬡ mention-reply │ ⬡ always-online │ ⬡ auto-recording │ ⬡ auto-seen │ ⬡ status-react │ ⬡ read-message │ ⬡ auto-voice │ ⬡ anti-bad │ ⬡ auto-sticker │ ⬡ auto-reply │ ⬡ auto-react │ ⬡ status-reply │ ⬡ setvar │ ⬡ heartreact │ ⬡ setprefix └────────────✦

┌──『 🕵️‍♂️ ᴏᴛʜᴇʀ ᴄᴍᴅs 🕵️‍♂️ 』 │ ⬡ createapi │ ⬡ weather │ ⬡ define │ ⬡ gpass │ ⬡ imgscan │ ⬡ srepo │ ⬡ npm │ ⬡ ss │ ⬡ countryinfo │ ⬡ binary │ ⬡ dbinary │ ⬡ base64 │ ⬡ unbase64 │ ⬡ urlencode │ ⬡ urldecode │ ⬡ calculate │ ⬡ tempnum │ ⬡ otpbox │ ⬡ tempmail │ ⬡ checkmail │ ⬡ wikipedia │ ⬡ wastalk │ ⬡ caption │ ⬡ trt │ ⬡ tiktokstalk │ ⬡ xstalk │ ⬡ vcc │ ⬡ weather │ ⬡ ytstalk └────────────✦

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ طرزان الواقدي `;



await conn.sendMessage(from, {
    text: menuText,
    contextInfo: {
      externalAdReply: {
        title: "اضغط للانضمام إلى القناة",
        body: "قناة طرزان الواقدي",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: `https://whatsapp.com/channel/120363418716672821`,
        thumbnailUrl: "https://i.imgur.com/FnpJtov.jpg",
      },
    },
  });
} catch (e) {
  console.error(e);
  reply("❌ حدث خطأ أثناء عرض القائمة.");
}

} );

