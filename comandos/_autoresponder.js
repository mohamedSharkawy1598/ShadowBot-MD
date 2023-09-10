import { sticker } from "../lib/sticker.js";

var handler = (m) => m;

handler.all = async function (m, {}) {
  const chat = global.db.data.chats[m.chat];

  if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {
    const sticker = await sticker(imagen4, false, global.packname, global.author);
    this.sendFile(
      m.chat,
      stiker,
      "sticker.webp",
      null,
      m,
      false,
      {
        contextInfo: {
          externalAdReply: {
            title: "𝐀𝐋-𝐒𝐇𝐀𝐑𝐐𝐀𝐖𝐈-𝐁𝐎𝐓",
            body: "𝐀𝐋-𝐒𝐇𝐀𝐑𝐐𝐀𝐖𝐈-𝑶𝑭𝑪",
            sourceUrl: ``,
            thumbnail: imagen1,
          },
        },
      }
    );
  }

  return !0;
};

export default handler;

