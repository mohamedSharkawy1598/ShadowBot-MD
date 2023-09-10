import { xpRange } from "../lib/levelling.js";
import { createHash } from "crypto";
import PhoneNumber from "awesome-phonenumber";
let handler = async (m, { conn, command }) => {
  let { dolares } = global.db.data.users[m.sender];
  let { level, role } = global.db.data.users[m.sender];
  let { xp } = xpRange(level, global.multiplier);
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let pp = await conn
    .profilePictureUrl(who, "image")
    .catch((_) => "https://telegra.ph/file/9b1353deceded7f387713.jpg");
  if (!(who in global.db.data.users))
    throw `El usuario que está mencionando no está registrado en mi base de datos`;
  try {
  } catch (e) {
  } finally {
    let { name, limit, registered, age } = global.db.data.users[who];
    let username = conn.getName(who);
    let prem = global.prems.includes(who.split`@`[0]);
    let sn = createHash("md5").update(who).digest("hex");
    let info = `*tus datos están guardados en nuestra base de datos.*\n\n${wm3}`;
    let str = `╔═════「 *${command}* 」═════╗
║ *🔥 الاسم:* ${username} ${registered ? "(" + name + ") " : ""}
║ *#️⃣ الرقم:* ${PhoneNumber(
      "+" + who.replace("@s.whatsapp.net", ""),
    ).getNumber("international")}
║ *🔗 رابط الرقم:* wa.me/${who.split`@`[0]}${
      registered ? "\n*𝙴𝙳𝙰𝙳:* " + age + " años" : ""
    }
║ *💌 الفل:* ${level}
║ *⚡ الرانك:* ${role}
║ *💸 المال*: ${`${dolares.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
║ *🎉 نقاط الخبره:* ${`${xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
║ *💎 الاماس:* ${`${limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
║ *📦 مسجل:* ${registered ? "نعم" : "لا"}
║ *💳 العضوية ااذهبيه:* ${prem ? "نعم" : "لا"}
╚════ ≪ •❈• ≫ ════╝`;
    conn.sendMessage(
      who,
      { text: `*❕ رقم سري: ${sn}*` },
      { quoted: m },
    );

    await conn.sendMessage(
      m.chat,
      {
        image: {
          url: pp,
        },
        caption: str,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: `RPG - PERFIL`,
            sourceUrl: "http://paypal.me/DorratBotOficial",
            mediaType: 1,
            showAdAttribution: true,
            //thumbnailUrl: "https://telegra.ph/file/7ec5032386dfe878f99ab.jpg",
            thumbnailUrl: pp,
          },
        },
      },
      {
        quoted: m,
      },
    );
  }
};
handler.help = ["profile [@user]"];
handler.tags = ["xp"];
handler.command = /^بروفايلي|بروفايل?$/i;
export default handler;
