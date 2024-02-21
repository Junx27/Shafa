import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Pembayaran from "./PembayaranModel.js";
const { DataTypes } = Sequelize;

const Pembelian = db.define(
  "pembelian",
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
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    jumlah_produk: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    total_pembelian: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    pembayaran_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Pembelian, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Pembelian.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Pembayaran.hasMany(Pembelian, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Pembelian.belongsTo(Pembayaran, {
  foreignKey: "pembayaran_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
export default Pembelian;
