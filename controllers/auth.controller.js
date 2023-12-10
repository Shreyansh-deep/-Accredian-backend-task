const { query } = require('../services/db');
const { comparePassword, hashPassword } = require('../utils/auth.utils');

exports.signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!email)
      return res.status(400).json({ status: 'fail', message: 'email missing' });

    if (!username)
      return res
        .status(400)
        .json({ status: 'fail', message: 'username missing' });

    if (!password)
      return res
        .status(400)
        .json({ status: 'fail', message: 'password missing' });

    // find user with email
    const userWithEmail = await query(`SELECT * FROM user WHERE email =?`, [
      email,
    ]);
    if (userWithEmail?.length > 0)
      return res
        .status(400)
        .json({ status: 'fail', message: 'user with email already exists' });

    // find user with name
    const userWithName = await query(`SELECT * FROM user WHERE name =?`, [
      username,
    ]);
    if (userWithName?.length > 0)
      return res
        .status(400)
        .json({ status: 'fail', message: 'user with usename already exists' });

    const hashedPassword = await hashPassword(password);

    //create user
    const insertResult = await query(
      `INSERT INTO user(name, email, password) VALUES ('${username}','${email}','${hashedPassword}')`
    );

    res.status(201).json({ status: 'success', userid: insertResult.insertId });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username)
      return res
        .status(400)
        .json({ status: 'fail', message: 'email or username missing' });

    if (!password)
      return res
        .status(400)
        .json({ status: 'fail', message: 'password missing' });

    // find user with username
    const sql = `SELECT * FROM user WHERE email =? OR name =?`;
    const params = [username, username];
    const results = await query(sql, params);

    if (results?.length <= 0)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Wrong username or password' });

    const user = results[0];

    //check for password
    if (!await comparePassword(password, user.password))
      return res
        .status(400)
        .json({ status: 'fail', message: 'Wrong username or password' });

    //remove password from user and send user
    delete user.password;
    res.status(200).json({ status: 'sucess', user });
  } catch (error) {
    next(error);
  }
};
