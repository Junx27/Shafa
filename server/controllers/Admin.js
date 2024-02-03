import Admin from "../models/AdminModel.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createAdmin = async (req, res) => {
  const { nama, email, password, confPassword, no_tlp, no_rek, image } =
    req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "password dan confirm password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  const gambar_sementara = "belum";
  if (req.files === null) {
    try {
      await Admin.create({
        nama: nama,
        email: email,
        password: hashPassword,
        no_tlp: no_tlp,
        no_rek: no_rek,
        image: gambar_sementara,
      });
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: "Register Gagal" });
    }
  } else {
    const file = req.files.image;
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
        await Admin.create({
          nama: nama,
          email: email,
          password: hashPassword,
          no_tlp: no_tlp,
          no_rek: no_rek,
          image: url,
        });
        res.status(201).json({ msg: "Register Berhasil" });
      } catch (error) {
        res.status(400).json({ msg: "Register Gagal" });
      }
    });
  }
};
export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!admin) return req.status(404).json({ msg: "Admin tidak ditemukan" });
  const { nama, email, password, confPassword, no_tlp, no_rek, image } =
    req.body;
  let namaUpdate;
  let emailUpdate;
  let hashPassword;
  let no_tlpUpdate;
  let no_rekUpdate;
  if (nama === "" || nama === null) {
    namaUpdate = admin.nama;
  } else {
    namaUpdate = await nama;
  }
  if (email === "" || email === null) {
    emailUpdate = admin.email;
  } else {
    emailUpdate = await email;
  }
  if (no_tlp === "" || no_tlp === null) {
    no_tlpUpdate = admin.no_tlp;
  } else {
    no_tlpUpdate = await no_tlp;
  }
  if (no_rek === "" || no_rek === null) {
    no_rekUpdate = admin.no_rek;
  } else {
    no_rekUpdate = await no_rek;
  }

  if (password === "" || password === null) {
    hashPassword = admin.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  const gambar_sementara = "belum";
  if (req.files === null) {
    try {
      await Admin.update(
        {
          nama: namaUpdate,
          email: emailUpdate,
          password: hashPassword,
          no_tlp: no_tlpUpdate,
          no_rek: no_rekUpdate,
          image: gambar_sementara,
        },
        {
          where: {
            id: admin.id,
          },
        }
      );
      res.status(201).json({ msg: "Update Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: "Update Gagal" });
    }
  } else {
    const file = req.files.image;
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
        await Admin.update(
          {
            nama: namaUpdate,
            email: emailUpdate,
            password: hashPassword,
            no_tlp: no_tlpUpdate,
            no_rek: no_rekUpdate,
            image: url,
          },
          {
            where: {
              id: admin.id,
            },
          }
        );
        res.status(201).json({ msg: "Update Berhasil" });
      } catch (error) {
        res.status(400).json({ msg: "Update Gagal" });
      }
    });
  }
};
export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  const imagePath = admin.image;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  try {
    await Admin.destroy({
      where: {
        id: admin.id,
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
