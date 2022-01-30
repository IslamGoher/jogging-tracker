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

export const getOneJoggingQuery = `
  SELECT
    jogging_id, date, distance, time, user_id
  FROM
    jogging
  WHERE
    jogging_id = $1;
`;

export const addJoggingQuery = `
  INSERT INTO
    jogging(date, distance, time, speed, user_id)
    VALUES($1, $2, $3, $4, $5);
`;
