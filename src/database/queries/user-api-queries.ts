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

export const findUser = `
  SELECT
    role
  FROM
    users
  WHERE
    user_id = $1;
`;

export const updateUserQuery = `
  UPDATE
    users
  SET
    fullname = $1,
    email = $2,
    password = $3,
    role = $4
  WHERE
    user_id = $5;
`;

export const deleteUserQuery = `
  DELETE FROM
    users
  WHERE
    user_id = $1;
`;
