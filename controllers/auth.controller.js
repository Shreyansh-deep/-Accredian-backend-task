const { query } = require('../services/db');
const { comparePassword } = require('../utils/auth.utils');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // find user with username
  const sql = `SELECT * FROM user WHERE email =? OR name =?`;
  const params = [username, username];
  const results = await query(sql, params);

  if (results.length <= 0)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Wrong username or password' });

  const user = results[0];

  //check for password
  if (!comparePassword(password, user.password))
    return res
      .status(400)
      .json({ status: 'fail', message: 'Wrong username or password' });

  res.status(200).json({ status: 'sucess', user });
};
