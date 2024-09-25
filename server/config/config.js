module.exports = {
  HOST: "localhost",
  USER: "towl",
  PASSWORD: "proteinhewanikayaserat",
  DB: "towldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log
};