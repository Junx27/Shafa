import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
const { DataTypes } = Sequelize;

const Kritik = db.define(
  "kritik",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kritik: {
      type: DataTypes.STRING,
      unique: true,
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
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Kritik, { onDelete: "CASCADE" });
Kritik.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
export default Kritik;
