import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admin from "./AdminModel.js";

const { DataTypes } = Sequelize;

const Produks = db.define(
  "produks",
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
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    harga_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deskripsi_produk: {
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
    status_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    admin_id: {
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
Admin.hasMany(Produks, { onDelete: "CASCADE" });
Produks.belongsTo(Admin, { foreignKey: "admin_id", onDelete: "CASCADE" });
export default Produks;
