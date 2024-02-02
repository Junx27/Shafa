import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Produks from "./ProdukModel.js";
import Admin from "./AdminModel.js";
import Pembelians from "./PembelianModel.js";

const { DataTypes } = Sequelize;

const Penjualans = db.define(
  "penjualans",
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
    total_penjualan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status_penjualan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status_pengiriman: {
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
    produk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pembelian_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

Admin.hasMany(Penjualans, { onDelete: "CASCADE" });
Penjualans.belongsTo(Admin, { foreignKey: "user_id", onDelete: "CASCADE" });
Produks.hasMany(Penjualans, { onDelete: "CASCADE" });
Penjualans.belongsTo(Produks, { foreignKey: "produk_id", onDelete: "CASCADE" });
Penjualans.hasMany(Pembelians, { onDelete: "CASCADE" });
Pembelians.belongsTo(Penjualans, {
  foreignKey: "pembelian_id",
  onDelete: "CASCADE",
});

export default Penjualans;
