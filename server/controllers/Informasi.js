import Admin from "../models/AdminModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Informasi from "../models/InformasiModel.js";
export const getInformasi = async (req, res) => {
  try {
    let response;
    response = await Informasi.findAll({
      attributes: [
        "id",
        "uuid",
        "nama_informasi",
        "deskripsi_informasi",
        "gambar_informasi",
        "admin_id",
      ],
      include: [
        {
          model: Admin,
          attributes: ["nama", "email", "uuid"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getInformasiById = async (req, res) => {
  try {
    const informasi = await Informasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!informasi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Informasi.findOne({
      attributes: [
        "id",
        "uuid",
        "nama_informasi",
        "deskripsi_informasi",
        "gambar_informasi",
        "admin_id",
      ],
      where: {
        id: informasi.id,
      },
      include: [
        {
          model: Admin,
          attributes: ["nama", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createInformasi = async (req, res) => {
  const { nama_informasi, deskripsi_informasi, gambar_informasi } = req.body;
  const gambar_sementara = "belum";
  if (req.files === null) {
    try {
      await Informasi.create({
        nama_informasi: nama_informasi,
        deskripsi_informasi: deskripsi_informasi,
        gambar_informasi: gambar_sementara,
        admin_id: req.adminId,
      });
      res.status(201).json({ msg: "informasi berhasil ditambahkan" });
    } catch (error) {
      res.status(400).json({ msg: "informasi gagal dibuat" });
    }
  } else {
    const file = req.files.gambar_informasi;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar salah" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Gambar dibawah 5 Mb" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await Informasi.create({
          nama_informasi: nama_informasi,
          deskripsi_informasi: deskripsi_informasi,
          gambar_informasi: url,
          admin_id: req.adminId,
        });
        res
          .status(201)
          .json({ msg: "informasi ada gambar berhasil ditambahkan" });
      } catch (error) {
        res.status(400).json({ msg: "informasi ada gambar gagal dibuat" });
      }
    });
  }
};
export const updateInformasi = async (req, res) => {
  try {
    const informasi = await Informasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!informasi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama_informasi, deskripsi_informasi, gambar_informasi } = req.body;
    const oldImagePath = informasi.gambar_informasi;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    if (req.files === null) {
      try {
        await Informasi.update(
          {
            nama_informasi: nama_informasi,
            deskripsi_informasi: deskripsi_informasi,
            gambar_informasi: gambar_sementara,
            admin_id: req.adminId,
            adminId: req.adminId,
          },
          {
            where: {
              id: informasi.id,
            },
          }
        );
        res.status(200).json({ msg: "informasi berhasil diupdate" });
      } catch (error) {
        res.status(400).json({ msg: "informasi gagal diupdate" });
      }
    } else {
      const file = req.files.gambar_informasi;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Gambar salah" });
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Gambar kurang dari 5 Mb" });

      file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
          await Informasi.update(
            {
              nama_informasi: nama_informasi,
              deskripsi_informasi: deskripsi_informasi,
              gambar_informasi: url,
              admin_id: req.adminId,
              adminId: req.adminId,
            },
            {
              where: {
                id: informasi.id,
              },
            }
          );
          if (oldImagePath) {
            const fileName = oldImagePath.split("/").pop();
            const filePath = path.join(
              __dirname,
              "../public/images/",
              fileName
            );
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Gagal menghapus gambar:", err);
              } else {
                console.log("Gambar lama berhasil dihapus");
              }
            });
          }
          res.status(200).json({ msg: "informasi berhasil diupdate" });
        } catch (error) {
          res.status(400).json({ msg: "informasi gagal diupdate" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteInformasi = async (req, res) => {
  try {
    const informasi = await Informasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!informasi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const imagePath = informasi.gambar_informasi;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    await Informasi.destroy({
      where: {
        id: informasi.id,
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
    res.status(200).json({ msg: "informasi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
