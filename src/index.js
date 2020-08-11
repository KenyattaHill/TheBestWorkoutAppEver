const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet')
const path = require('path')
const routes = require("./routes");
const Seed = require("./models/seed");
const PORT = process.env.PORT || 3002
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(express.static("frontend/build"));
}

app.use(routes)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exerciseApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, async error => {
  if (error) {
    console.log('Issue connecting to DB', error);
    return;
  }
  if (process.env.SEED === 'store') {
    await Seed.store();
  }
  if (process.env.SEED === 'remove') {
    await Seed.remove();
  }

});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', "frontend", "build", "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`API server now listening on port ${PORT}`)
});

module.exports = server
