const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (request, response) => {
    request
  response.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(8080, () => {
  console.log(`Express server is listening on 8080`);
});