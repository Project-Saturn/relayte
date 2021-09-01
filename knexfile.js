require("dotenv").config();

module.exports = {
  client: "pg",
  connection: process.env.NO_SSL ? process.env.DATABASE_URL : {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  },
  searchPath: ["knex", "public"],
  seeds: {
    directory: "./seeds"
  }
}