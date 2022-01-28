export const signupQueries = {
  findUserWithEmail: "SELECT * FROM users WHERE email = $1;",
  addNewUser: `
  INSERT INTO
    users(fullname, email, password, role)
    VALUES($1, $2, $3, 'user')
  RETURNING user_id, role;
  `
};