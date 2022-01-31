export const getUsersQueries = {
  manager: `
    SELECT
      user_id, fullname, email, role
    FROM
      users
    WHERE
      role = 'user'
  `,
  admin: `
  SELECT
    user_id, fullname, email, role
  FROM
    users
  `
};

export const getOneUserQuery = `
  SELECT
    user_id, fullname, email, role
  FROM
    users
  WHERE
    user_id = $1;
`;

export const postUserQuery = `
  INSERT INTO
    users (fullname, email, password, role)
    VALUES ($1, $2, $3, $4);
`;