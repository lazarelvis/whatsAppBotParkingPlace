const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});
// const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  client.getChats().then((chats) => {
    const myGroup = chats.find(
      //group name that is mande on sincronization
      (chat) => chat.name == "Test whatsapp automatio"
    );

    client.sendMessage(
      myGroup.id._serialized,
      "Hello this is an automated message"
    );
  });
});

client.on("message", (message) => {
  console.log(message.body);
  if (message.body == "/help") {
    client.sendMessage(
      message.from,
      "comenzi disponibile:\n /spatii disponibile \n /ocupa spatiul: e.g.a1 \n /ocupa spatiul: e.g.a1"
    );
  }
  if (message.body == "/spatii disponibile") {
    client.sendMessage(message.from, "Sunt 15 spatii disponibile");
  }
  if (message.body == "/ocupa spatiul a1") {
    client.sendMessage(message.from, "Ai ocupat spatiul cu succes");
  }
});

client.initialize();
