export const getAllJoggingQuery = {
  userQuery: `
    SELECT 
      jogging_id, date, distance, time
    from
      users as u
    LEFT JOIN
      jogging as j
    on
      u.user_id = j.user_id
    WHERE
      j.user_id = $1
  `,
  adminQuery: `
  SELECT 
    jogging_id, date, distance, time, user_id
  from
    jogging
  `
};
;