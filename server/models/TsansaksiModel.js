import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Produks from "./ProdukModel.js";
import Admin from "./AdminModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Transaksi = db.define(
  "transaksi",
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jumlah_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total_transaksi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gambar_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Users.hasMany(Transaksi, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Transaksi.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Produks.hasMany(Transaksi, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Transaksi.belongsTo(Produks, {
  foreignKey: "produk_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Transaksi;
