const pool = require('../db');

const StudentModel = {
  createStudent: async (userID, departament, yearStudy, dateOfGraduation) => {
    const result = await pool.query(
      'insert into students (UserID, Departament, YearStudy, DateOfGraduation) VALUES ($1, $2, $3, $4)',
      [userID, departament, yearStudy, dateOfGraduation]
    );
    return result.rows[0];
  },
};

module.exports = StudentModel;
