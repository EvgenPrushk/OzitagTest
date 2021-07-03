const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Not correct e-mail").isEmail(),
    check("password", "Min password 6 simbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data ",
        });
      }
      //add field
      const { email, password } = req.body;
      const candidate = await User.find({ email });

      if (candidate) {
        return res.status(400).json({ message: "This user  already exists" });
      }

      // bcrypt password
      const hashedPassword = await bcrypt.hash(password, 12);
      // register user
      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();
      res.status(201).json({ message: "Create new user" });
    } catch (e) {
      res.status(500).json({ message: "Reped please" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "enter correct email").normalizeEmail().isEmail(),
    check("password", "enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data ",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      // create token
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: "Reped please" });
    }
  }
);

module.exports = router;
