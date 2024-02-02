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
      ],
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
  const { nama_produk, harga_produk, deskripsi_produk, gambar_produk } =
    req.body;
  if (req.files === null)
    return res.status(404).json({ msg: "Silahkan masukan gambar" });
  const file = req.files.gambar_produk;
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
      await Produks.create({
        nama_produk: nama_produk,
        harga_produk: harga_produk,
        deskripsi_produk: deskripsi_produk,
        gambar_produk: url,
        admin_id: req.adminId,
        adminId: req.adminId,
      });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      res.status(400).json({ msg: "Product Created Gagal" });
    }
  });
};
export const updateProduks = async (req, res) => {
  try {
    const produk = await Produks.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!produk) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama_produk, harga_produk, deskripsi_produk, gambar_produk } =
      req.body;
    const oldImagePath = produk.gambar_produk;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    if (req.files === null) {
      try {
        await Produks.update(
          {
            nama_produk: produk.nama_produk,
            harga_produk: produk.harga_produk,
            deskripsi_produk: produk.deskripsi_produk,
            gambar_produk: produk.gambar_produk,
            admin_id: req.adminId,
          },
          {
            where: {
              id: produk.id,
            },
          }
        );
        res.status(200).json({ msg: "Product updated successfuly" });
      } catch (error) {
        res.status(400).json({ msg: "Product update Gagal" });
      }
    } else {
      const file = req.files.gambar_produk;
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
          await Produks.update(
            {
              nama_produk: nama_produk,
              harga_produk: harga_produk,
              deskripsi_produk: deskripsi_produk,
              gambar_produk: url,
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
          res.status(200).json({ msg: "Product updated successfuly" });
        } catch (error) {
          res.status(400).json({ msg: "Product update Gagal" });
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
    if (imagePath) {
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

export const deleteAllProduks = async (req, res) => {
  try {
    await Produks.destroy({
      where: {},
      truncate: {
        cascade: true,
      },
    });
    res.status(200).json({ msg: "Semua produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
