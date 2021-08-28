const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ alter: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log(
      `listening in port ${process.env.PORT ? process.env.PORT : 3001}`
    ); // eslint-disable-line no-console
  });
});
