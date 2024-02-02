import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Produks from "./ProdukModel.js";

const { DataTypes } = Sequelize;

const Keranjangs = db.define(
  "keranjangs",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    harga_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jumlah_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total_keranjang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status_keranjang: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

Users.hasMany(Keranjangs, { onDelete: "CASCADE" });
Keranjangs.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE" });
Produks.hasMany(Keranjangs, { onDelete: "CASCADE" });
Keranjangs.belongsTo(Produks, { foreignKey: "produk_id", onDelete: "CASCADE" });

export default Keranjangs;
