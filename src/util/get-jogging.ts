import { pool } from "../database/pool";
import { getAllJoggingQuery } from "../database/queries/jogging-api-queries";
import { DateFilter } from "../interfaces/jogging-interfaces";
import { User } from "../interfaces/user-interfaces";

// function to decide for which user jogging will listed
// and get jogging data from database
export async function listJogging(user: User, LIMIT: number, dateFilter: DateFilter, offsetNumber: number) {

  if (user.role === "admin") {
    // get all jogging for admin
    return await pool.query(
      getAllJoggingQuery.adminQuery +
      " WHERE date > $1 AND date < $2" +
      " ORDER BY date DESC" +
      ` LIMIT ${LIMIT} OFFSET $3;`,
      [dateFilter.from, dateFilter.to, offsetNumber]
    );
  }

  else {
    // get all jogging with user id
    return await pool.query(
      getAllJoggingQuery.userQuery +
      " AND date > $2 AND date < $3" +
      " ORDER BY j.date DESC" +
      ` LIMIT ${LIMIT} OFFSET $4;`,
      [user.id, dateFilter.from, dateFilter.to, offsetNumber]
    );
  }
}