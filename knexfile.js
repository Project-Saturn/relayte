require("dotenv").config();

module.exports = {
  client: "pg",
  // connection: process.env.DATABASE_URL,
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  },
  searchPath: ["knex", "public"],
  seeds: {
    directory: "./seeds"
  }
}