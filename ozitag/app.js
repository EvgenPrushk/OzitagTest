const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

// auth
app.use('/api/auth/', require('./routes/auth.route'))

const PORT = config.get("port") || 3000;

async function start() {
  try {
      // connect base
      await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();

