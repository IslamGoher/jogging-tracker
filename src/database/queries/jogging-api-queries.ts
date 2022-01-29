export const getAllJoggingQuery = `
  SELECT 
    jogging_id, date, distance, time
  from
    users as u
  LEFT JOIN
    jogging as j
  on
    u.user_id = j.user_id
  WHERE 
    u.user_id = $1;
`;