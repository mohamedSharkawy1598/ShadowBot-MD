let handler = async (m, {conn, groupMetadata, usedPrefix, command}) => {
  let id = m.chat;
  conn.vote = conn.vote ? conn.vote : {};
  if (!(id in conn.vote))
    await conn.sendButton(
      m.chat,
      `⚠️ *_لا تصويت في هذه المجموعة !_*`,
      wm,
      null,
      [
        ["تصويت📦", `${usedPrefix}votar`],
        ["الاوامر🛡️", `${usedPrefix}menu`],
      ],
      m
    );
  let isVote = conn.vote[id][1].concat(conn.vote[id][2]);
  const wasVote = isVote.includes(m.sender);
  if (wasVote) {
    await conn.sendMessage(m.chat, {react: {text: "❌", key: m.key}});
    conn.reply(m.chat, `🚫 *لقد صوت بالفعل !*`, m);
    throw false;
  }
  if (/up/i.test(command)) {
    conn.vote[id][1].push(m.sender);
  } else if (/de/i.test(command)) {
    conn.vote[id][2].push(m.sender);
  }
  try {
    let [reason, upvote, devote] = conn.vote[id];

    let caption = `
\t\t\t\t*✲◜🗳️ لقد صوت بالفعل 🗳️◞✲*

「 📣 」𝐑𝐚𝐳𝐨́𝐧:* ${reason}

\t\t\t*「 ✅ 」من فضلك أصوات「 ✅ 」*
*Total: ${upvote.length}*
${upvote.map((v, i) => `• ${i + 1}.  @${v.split`@`[0]}`).join("\n")}

\t\t*「 ❌ 」أصوات في ضد「 ❌ 」*
*Total:* ${devote.length}
${devote.map((v, i) => `• ${i + 1}.  @${v.split`@`[0]}`).join("\n")}
`;
    conn.sendButton(
      m.chat,
      caption,
      wm,
      false,
      [
        ["𝙵𝙰𝚅𝙾𝚁✅", `/${command}`],
        ["𝙲𝙾𝙽𝚃𝚁𝙰❌", `/${command}`],
      ],
      m,
      {mentions: conn.parseMention(caption)}
    );
  } catch {
    m.reply("⚠️ *_لا توجد أصوات نشطة في هذا ._*");
  }
};
handler.help = ["upvote", "devote"];
handler.tags = ["vote"];
handler.command = /^(up|de)vote$/i;

export default handler;
