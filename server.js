const mongoose = require("mongoose");
const app = require("./app");

const { PORT, DB_URL } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
