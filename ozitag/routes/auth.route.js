const { Router } = require("express");
const bcrypt = require("bcrypt");
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
router.post("/login", async (req, res) => {});

module.exports = router;
