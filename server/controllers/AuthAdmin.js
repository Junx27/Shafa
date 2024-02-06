import Admin from "../models/AdminModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!admin)
    return res
      .status(404)
      .json({ msg: "Admin tidak ditemukan, mohon ulangi kembali!" });
  const match = await argon2.verify(admin.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password salah" });
  req.session.adminId = admin.uuid;
  const uuid = admin.uuid;
  const nama = admin.nama;
  const email = admin.email;
  const image = admin.image;
  res.status(200).json({ uuid, nama, email, image });
};
export const Me = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const admin = await Admin.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
  res.status(200).json(admin);
};
export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
