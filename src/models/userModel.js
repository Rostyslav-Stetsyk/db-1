const pool = require('../db');
const redis = require('../redisClient');

const UserModel = {
  getAllUsers: async () => {
    const redisKay = 'users';
    const cachedUsers = await redis.get(redisKay);

    if (cachedUsers) {
      return await JSON.parse(cachedUsers);
    }

    const result = await pool.query('SELECT * FROM Users');

    redis.set(redisKay, JSON.stringify(result.rows), { EX: 3600 });
    return result.rows;
  },
  createUser: async (name, email) => {
    const result = await pool.query(
      'INSERT INTO users (Name, Email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    redis.del('users');

    return result.rows[0];
  },
  deleteUser: async (id) => {
    await pool.query('DELETE FROM Users WHERE id = $1', [id]);

    redis.del('users');

    return;
  },
};

module.exports = UserModel;
