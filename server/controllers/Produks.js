import Admin from "../models/AdminModel.js";
import Produks from "../models/ProdukModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const getProduks = async (req, res) => {
  try {
    let response;
    response = await Produks.findAll({
      attributes: [
        "uuid",
        "nama_produk",
        "harga_produk",
        "deskripsi_produk",
        "gambar_produk",
        "status_produk",
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
export const getProduksById = async (req, res) => {
  try {
    const produk = await Produks.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!produk) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Produks.findOne({
      attributes: [
        "uuid",
        "nama_produk",
        "harga_produk",
        "deskripsi_produk",
        "gambar_produk",
        "status_produk",
      ],
      where: {
        id: produk.id,
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
export const createProduks = async (req, res) => {
  const {
    nama_produk,
    harga_produk,
    deskripsi_produk,
    gambar_produk,
    status_produk,
  } = req.body;
  const gambar_sementara = "belum";
  if (req.files === null) {
    try {
      await Produks.create({
        nama_produk: nama_produk,
        harga_produk: harga_produk,
        deskripsi_produk: deskripsi_produk,
        gambar_produk: gambar_sementara,
        status_produk: status_produk,
        admin_id: req.adminId,
        adminId: req.adminId,
      });
      res.status(201).json({ msg: "Produk berhasil ditambahkan" });
    } catch (error) {
      res.status(400).json({ msg: "Product gagal dibuat" });
    }
  } else {
    const file = req.files.gambar_produk;
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
        await Produks.create({
          nama_produk: nama_produk,
          harga_produk: harga_produk,
          deskripsi_produk: deskripsi_produk,
          gambar_produk: url,
          status_produk: status_produk,
          admin_id: req.adminId,
          adminId: req.adminId,
        });
        res.status(201).json({ msg: "Product berhasil ditambahkan" });
      } catch (error) {
        res.status(400).json({ msg: "Product gagal dibuat" });
      }
    });
  }
};
export const updateProduks = async (req, res) => {
  try {
    const produk = await Produks.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!produk) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      nama_produk,
      harga_produk,
      deskripsi_produk,
      gambar_produk,
      status_produk,
    } = req.body;
    const oldImagePath = produk.gambar_produk;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    if (req.files === null) {
      try {
        await Produks.update(
          {
            nama_produk: nama_produk,
            harga_produk: harga_produk,
            deskripsi_produk: deskripsi_produk,
            gambar_produk: produk.gambar_produk,
            status_produk: status_produk,
            admin_id: req.adminId,
          },
          {
            where: {
              id: produk.id,
            },
          }
        );
        res.status(200).json({ msg: "Produk berhasil diupdate" });
      } catch (error) {
        res.status(400).json({ msg: "Produk gagal diupdate" });
      }
    } else {
      const file = req.files.gambar_produk;
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
          await Produks.update(
            {
              nama_produk: nama_produk,
              harga_produk: harga_produk,
              deskripsi_produk: deskripsi_produk,
              gambar_produk: url,
              status_produk: status_produk,
              admin_id: req.adminId,
            },
            {
              where: {
                id: produk.id,
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
          res.status(200).json({ msg: "Produk berhasil diupdate" });
        } catch (error) {
          res.status(400).json({ msg: "Produk gagal diupdate" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteProduks = async (req, res) => {
  try {
    const produk = await Produks.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!produk) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const imagePath = produk.gambar_produk;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    await Produks.destroy({
      where: {
        id: produk.id,
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
    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
