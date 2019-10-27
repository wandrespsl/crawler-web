const db = require("mongoose");

db.Promise = global.Promise;

// "mongodb+srv://user:user1234@cluster0-mte8f.mongodb.net/test?retryWrites=true&w=majority"

async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("[db] conectada con éxito");
}

module.exports = connect;
