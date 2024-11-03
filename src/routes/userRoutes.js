const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of all users
 *     description: Retrieves a list of all users from the database
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Returns a list of users
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the database
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the newly created user
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await UserService.createUser(name, email);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user from the database
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User successfully deleted
 *       500:
 *         description: Internal server error
 */

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await UserService.deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /{userId}/preferences:
 *   get:
 *     summary: Get user preferences by ID
 *     description: Retrieves a user's preferences from the database
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the user's preferences
 *       500:
 *         description: Internal server error
 */

router.get('/:userId/preferences', async (req, res) => {
  const { userId } = req.params;
  try {
    const preferences = await UserService.getUserPreferences(userId);
    res.json(preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /{userId}/preferences:
 *   post:
 *     summary: Add a new preference for the user
 *     description: Creates a new preference for the user in the database
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               languageCode:
 *                 type: string
 *               preferredCommunication:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the user's new preference
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /{userId}/student:
 *   post:
 *     summary: Add educational information for the user
 *     description: Creates educational information for the user in the database
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               department:
 *                 type: string
 *               yearStudy:
 *                 type: integer
 *               dateOfGraduation:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Returns the user's educational information
 *       500:
 *         description: Internal server error
 */

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
