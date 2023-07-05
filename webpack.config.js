const path = require("path");

module.exports = {
  entry: {
    main: ["./src/app.js", "./src/app-logic.js"],
  },
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
