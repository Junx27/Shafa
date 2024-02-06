import Users from "../models/UserModel.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getUsersById = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createUser = async (req, res) => {
  const {
    nama,
    email,
    password,
    alamat,
    no_tlp,
    gambar_profil,
    status_konsumen,
  } = req.body;
  const hashPassword = await argon2.hash(password);
  const status = "belum";
  const gambar_sementara = "belum";
  if (req.files === null) {
    try {
      await Users.create({
        nama: nama,
        email: email,
        password: hashPassword,
        alamat: alamat,
        no_tlp: no_tlp,
        gambar_profil: gambar_sementara,
        status_konsumen: status,
      });
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: "Register Gagal" });
    }
  } else {
    const file = req.files.gambar_profil;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await Users.create({
          nama: nama,
          email: email,
          password: hashPassword,
          alamat: alamat,
          no_tlp: no_tlp,
          gambar_profil: url,
          status_konsumen: status,
        });
        res.status(201).json({ msg: "Register Berhasil" });
      } catch (error) {
        res.status(400).json({ msg: "Register Gagal" });
      }
    });
  }
};
export const updateUser = async (req, res) => {
  const users = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  const {
    nama,
    email,
    password,
    alamat,
    no_tlp,
    gambar_profil,
    status_konsumen,
  } = req.body;
  const oldImagePath = users.gambar_profil;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const hashPassword = await argon2.hash(password);
  const gambar_sementara = "belum";
  if (req.files === null) {
    try {
      await Users.update(
        {
          nama: nama,
          email: email,
          password: hashPassword,
          alamat: alamat,
          no_tlp: no_tlp,
          gambar_profil: gambar_sementara,
          status_konsumen: status_konsumen,
        },
        {
          where: {
            id: users.id,
          },
        }
      );
      res.status(201).json({ msg: "Update Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: "Upadate Gagal" });
    }
  } else {
    const file = req.files.gambar_profil;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await Users.update(
          {
            nama: nama,
            email: email,
            password: hashPassword,
            alamat: alamat,
            no_tlp: no_tlp,
            gambar_profil: url,
            status_konsumen: status_konsumen,
          },
          {
            where: {
              id: users.id,
            },
          }
        );
        if (oldImagePath) {
          const fileName = oldImagePath.split("/").pop();
          const filePath = path.join(__dirname, "../public/images/", fileName);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Gagal menghapus gambar:", err);
            } else {
              console.log("Gambar lama berhasil dihapus");
            }
          });
        }
        res.status(201).json({ msg: "Update Berhasil" });
      } catch (error) {
        res.status(400).json({ msg: "Update Gagal" });
      }
    });
  }
};
export const deleteUser = async (req, res) => {
  const users = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!users) return res.status(404).json({ msg: "User tidak ditemukan" });
  const imagePath = users.gambar_profil;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  try {
    await Users.destroy({
      where: {
        id: users.id,
      },
    });
    if (imagePath !== "belum") {
      const fileName = imagePath.split("/").pop();
      const filePath = path.join(__dirname, "../public/images/", fileName);
      console.log(filePath);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Gagal menghapus gambar:", err);
          return res.status(500).json({ msg: "Gagal menghapus gambar" });
        }
        console.log("Gambar berhasil dihapus");
      });
    }
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
