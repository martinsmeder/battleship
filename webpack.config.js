const path = require("path");

module.exports = {
  entry: {
    main: ["./src/app.js", "./src/factories.js"],
  },
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
