const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "malvin~Z7NDBbJR#rk2-1yLHjgjy-gGVdrgaPBKBSmCjYaQdcVEtzGhyvFU",
    // معرف الجلسة - تأكد أن يبدأ بـ malvin~

    PREFIX: process.env.PREFIX || ".",
    // بادئة الأوامر للبوت

    BOT_NAME: process.env.BOT_NAME || "طرزان الواقدي",
    // اسم البوت في القوائم

    MODE: process.env.MODE || "public",
    // وضع البوت: عام public أو خاص private أو دردشة خاصة inbox أو مجموعات فقط group

    LINK_WHITELIST: "youtube.com,github.com",
    // روابط مسموح بها عند تفعيل مانع الروابط

    LINK_WARN_LIMIT: 3,
    // عدد التحذيرات قبل تنفيذ الإجراء

    LINK_ACTION: "kick",
    // الإجراء عند تكرار الروابط: "kick" للطرد، "mute" للكتم، "none" بدون إجراء

    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    // تفعيل مشاهدة الحالات تلقائيًا

    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    // تفعيل الرد التلقائي على الحالات

    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    // تفعيل التفاعل التلقائي مع الحالات

    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*تمت مشاهدة حالتك 👀*",
    // نص الرد التلقائي عند مشاهدة الحالة

    WELCOME: process.env.WELCOME || "true",
    // تفعيل رسائل الترحيب والمغادرة في المجموعات

    ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
    // إشعار بترقية أو إزالة المشرفين في المجموعات

    ANTI_LINK: process.env.ANTI_LINK || "true",
    // تفعيل مانع الروابط في المجموعات

    MENTION_REPLY: process.env.MENTION_REPLY || "false",
    // تفعيل الرد الصوتي عند منشن اسمك

    MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://files.catbox.moe/qumhu4.jpg",
    // رابط صورة القائمة

    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/xshsmk",
    // رابط صورة alive

    LIVE_MSG: process.env.LIVE_MSG || "> البوت يعمل الآن بكفاءة ⚡\n\nاستمر في استخدام ✦طرزان الواقدي✦ بوت واتساب المطور\n\n*© بواسطة طرزان\n> GitHub:* github.com/tarzanalwaqdiy1",
    // نص رسالة alive

    STICKER_NAME: process.env.STICKER_NAME || "طرزان ستيكر",
    // اسم حزمة الملصقات

    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
    // تفعيل التفاعل المخصص

    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "🔥,💖,👑,💔,🌹,😈",
    // الرموز التعبيرية للتفاعل المخصص

    DELETE_LINKS: process.env.DELETE_LINKS || "false",
    // حذف الروابط تلقائيًا بدون طرد

    OWNER_NUMBER: process.env.OWNER_NUMBER || "966590117904",
    // رقم صاحب البوت

    OWNER_NAME: process.env.OWNER_NAME || "طرزان الواقدي",
    // اسم صاحب البوت

    DESCRIPTION: process.env.DESCRIPTION || "*© مطور بواسطة طرزان الواقدي*",
    // وصف البوت

    READ_MESSAGE: process.env.READ_MESSAGE || "false",
    // تفعيل قراءة الرسائل تلقائيًا

    AUTO_REACT: process.env.AUTO_REACT || "false",
    // تفعيل التفاعل التلقائي مع جميع الرسائل

    ANTI_BAD: process.env.ANTI_BAD || "false",
    // تفعيل منع الكلمات السيئة

    ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
    // طرد من يرسل روابط في الجروب

    AUTO_STICKER: process.env.AUTO_STICKER || "false",
    // إرسال ملصقات تلقائيًا

    AUTO_REPLY: process.env.AUTO_REPLY || "false",
    // الرد التلقائي بالنصوص

    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    // إبقاء البوت دائمًا متصل

    PUBLIC_MODE: process.env.PUBLIC_MODE || "false",
    // وضع البوت: عام (true) أو خاص (false)

    AUTO_TYPING: process.env.AUTO_TYPING || "false",
    // تفعيل عرض "يكتب الآن..." تلقائيًا

    READ_CMD: process.env.READ_CMD || "false",
    // تعليم الرسائل المرسلة بالأوامر كمقروءة

    DEV: process.env.DEV || "966590117904",
    // رقم مطور البوت

    ANTI_VV: process.env.ANTI_VV || "true",
    // منع الرسائل أو الصور العرض لمرة واحدة

    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
    // مكان إعادة إرسال الرسائل المحذوفة: "inbox" أو "same"

    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
    // تفعيل عرض "يسجل الآن..." تلقائيًا

    version: process.env.version || "0.0.6",
    // إصدار البوت
};
