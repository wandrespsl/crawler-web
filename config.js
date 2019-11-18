const config = {
  dbUrl:
    process.env.DB_URL ||
    "mongodb+srv://db_user_catalogos:AMoYUtP5yYpbT5Oo@cluster0-1ft2u.mongodb.net/test?retryWrites=true&w=majority",
  port: process.env.PORT || 3000,
  host: process.env.HOST || "http://localhost",
  publicRoute: process.env.PUBLIC_ROUTE || "/app",
  filesRoute: process.env.FILES_ROUTE || "/files"
};

module.exports = config;
