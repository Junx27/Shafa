import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Produks from "./ProdukModel.js";
import Keranjangs from "./KeranjangModel.js";

const { DataTypes } = Sequelize;

const Pembelians = db.define(
  "pembelians",
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
    total_pembelian: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status_pembelian: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status_pembayaran: {
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
    keranjang_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

Users.hasMany(Pembelians, { onDelete: "CASCADE" });
Pembelians.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE" });
Produks.hasMany(Pembelians, { onDelete: "CASCADE" });
Pembelians.belongsTo(Produks, { foreignKey: "produk_id", onDelete: "CASCADE" });
Keranjangs.hasOne(Pembelians, { onDelete: "CASCADE" });
Pembelians.belongsTo(Keranjangs, {
  foreignKey: "keranjang_id",
  onDelete: "CASCADE",
});

export default Pembelians;
