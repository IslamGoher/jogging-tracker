import { pool } from "../pool";

// create tables
export async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        fullname VARCHAR ( 200 ) NOT NULL,
        email VARCHAR ( 200 ) UNIQUE NOT NULL,
        password VARCHAR ( 200 ) NOT NULL,
        role VARCHAR ( 20 ) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS jogging (
        jogging_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        date TIMESTAMP NOT NULL,
        distance INT NOT NULL,
        time TIME NOT NULL,
        speed DECIMAL NOT NULL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE
      );
    `);
  
    // eslint-disable-next-line no-console
    console.log("database tables created");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}