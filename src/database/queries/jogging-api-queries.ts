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

export const findJoggingQuery = `
  SELECT
    user_id
  FROM
    jogging
  WHERE
    jogging_id = $1;
`;

export const updateJoggingQuery = `
  UPDATE
    jogging
  SET
    date = $1,
    distance = $2,
    time = $3,
    speed = $4
  WHERE
    jogging_id = $5;
`;

export const deleteJoggingQuery = `
  DELETE FROM
    jogging
  WHERE
   jogging_id = $1;
`;