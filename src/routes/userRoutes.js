const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await UserService.createUser(name, email);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await UserService.deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId/preferences', async (req, res) => {
  const { userId } = req.params;
  try {
    const preferences = await UserService.getUserPreferences(userId);
    res.json(preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:userId/preferences', async (req, res) => {
  const { userId } = req.params;
  const { languageCode, preferredCommunication } = req.body;
  try {
    const newPreference = await UserService.createUserPreference(
      userId,
      languageCode,
      preferredCommunication
    );
    res.json(newPreference);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:userId/student', async (req, res) => {
  const { userId } = req.params;
  const { departament, yearStudy, dateOfGraduation } = req.body;
  try {
    const newStudent = await UserService.createStudent(
      userId,
      departament,
      yearStudy,
      dateOfGraduation
    );
    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
