const bcrypt = require('bcryptjs');
exports.hashPassword = async (candidatePassword) =>
  await bcrypt.hash(candidatePassword, 12);

exports.comparePassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);
