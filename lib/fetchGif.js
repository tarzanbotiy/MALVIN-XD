const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { tmpdir } = require('os');
const Crypto = require('crypto');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * جلب صورة GIF من رابط API المحدد.
 * @param {string} url - رابط واجهة API التي تحتوي على GIF.
 * @returns {Promise<Buffer>} - بافر الصورة GIF.
 */
async function جلبGif(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error("❌ خطأ أثناء جلب GIF:", error);
        throw new Error("تعذر الحصول على صورة GIF.");
    }
}

/**
 * تحويل بافر GIF إلى فيديو MP4.
 * @param {Buffer} gifBuffer - بافر صورة GIF.
 * @returns {Promise<Buffer>} - بافر الفيديو MP4 الناتج.
 */
async function تحويلGifإلىفيديو(gifBuffer) {
    const filename = Crypto.randomBytes(6).toString('hex');
    const gifPath = path.join(tmpdir(), `${filename}.gif`);
    const mp4Path = path.join(tmpdir(), `${filename}.mp4`);

    fs.writeFileSync(gifPath, gifBuffer);

    await new Promise((resolve, reject) => {
        ffmpeg(gifPath)
            .outputOptions([
                "-movflags faststart",
                "-pix_fmt yuv420p",
                "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2"
            ])
            .on("error", (err) => {
                console.error("❌ خطأ في تحويل ffmpeg:", err);
                reject(new Error("تعذر معالجة GIF وتحويله إلى فيديو."));
            })
            .on("end", resolve)
            .save(mp4Path);
    });

    const videoBuffer = fs.readFileSync(mp4Path);
    fs.unlinkSync(gifPath);
    fs.unlinkSync(mp4Path);

    return videoBuffer;
}

module.exports = { جلبGif, تحويلGifإلىفيديو };
