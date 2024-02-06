import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import fileUpload from "express-fileupload";
import UserRoute from "./routes/UserRoute.js";
import ProdukRoute from "./routes/ProdukRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import EventRoute from "./routes/EventRoute.js";
import TestimoniRouter from "./routes/TestimoniRoute.js";
import InformasiRoute from "./routes/InformasiRoute.js";
import SaranRoute from "./routes/SaranRoute.js";
import KeranjangRoute from "./routes/KeranjangRoute.js";
import PembelianRoute from "./routes/PembelianRoute.js";
import PenjualanRoute from "./routes/PenjualanRoute.js";
import AuthAdminRoute from "./routes/AuthAdminRoute.js";
import AuthRoute from "./routes/Auth.js";
dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});
// (async () => {
//   await db.sync();
// })();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProdukRoute);
app.use(AdminRoute);
app.use(EventRoute);
app.use(TestimoniRouter);
app.use(InformasiRoute);
app.use(SaranRoute);
app.use(KeranjangRoute);
app.use(PembelianRoute);
app.use(PenjualanRoute);
app.use(AuthAdminRoute);
app.use(AuthRoute);

// store.sync();
app.listen(process.env.APP_PORT, () => {
  console.log("Server berjalan");
});
