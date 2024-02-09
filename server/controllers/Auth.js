import argon2 from "argon2";
import User from "../models/UserModel.js";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user)
    return res
      .status(404)
      .json({ msg: "User tidak ditemukan, mohon ulangi kembali!" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password salah" });
  if (user.status_konsumen === "terdaftar") {
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const nama = user.nama;
    const email = user.email;
    const gambar_profil = user.gambar_profil;
    res.status(200).json({ uuid, nama, email, gambar_profil });
  } else {
    return res
      .status(401)
      .json({ msg: "User belum terdaftar, Data sedang dalam proses" });
  }
};
export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};
export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
