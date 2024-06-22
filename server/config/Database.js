import { Sequelize } from "sequelize";

const db = new Sequelize("db_shafa", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
// import { Sequelize } from "sequelize";

// const db = new Sequelize("junxwebd_shafa", "junxwebd_shafa", "YJwOlXmJX&X1", {
//   host: "vela.jagoanhosting.com",
//   dialect: "mysql",
//   port: 3306, // Jika port MySQL berbeda, sesuaikan di sini
// });

// export default db;
