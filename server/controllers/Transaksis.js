import Transaksi from "../models/TsansaksiModel.js";
import Admin from "../models/AdminModel.js";
import Produks from "../models/ProdukModel.js";
import Users from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

const { ForeignKeyConstraintError } = Sequelize;

export const getTransaksis = async (req, res) => {
  try {
    let response;
    response = await Transaksi.findAll({
      attributes: [
        "nama_produk",
        "harga_produk",
        "jumlah_produk",
        "total_transaksi",
        "status_pengiriman",
        "status_penerimaan",
      ],
      include: [
        {
          model: Admin,
          attributes: ["nama"],
        },
        {
          model: Users,
          attributes: ["nama"],
        },
        {
          model: Produks,
          attributes: ["nama_produk"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getTransaksisById = async (req, res) => {
  try {
    const transaksi = await Transaksi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!transaksi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Transaksi.findOne({
      where: {
        id: transaksi.id,
      },
      include: [
        {
          model: Admin,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createTransaksis = async (req, res) => {
  const {
    nama_produk,
    harga_produk,
    jumlah_produk,
    total_transaksi,
    status_pengiriman,
    status_penerimaan,
    admin_id,
    user_id,
    produk_id,
  } = req.body;

  let bukti_transfer = "belum";

  if (req.files && req.files.bukti_transfer) {
    const file = req.files.bukti_transfer;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Gambar salah" });
    }
    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Gambar dibawah 5 Mb" });
    }

    try {
      await file.mv(`./public/images/${fileName}`);
      bukti_transfer = url;
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  try {
    await Transaksi.create({
      nama_produk: nama_produk,
      harga_produk: harga_produk,
      jumlah_produk: jumlah_produk,
      total_transaksi: total_transaksi,
      bukti_transfer: bukti_transfer,
      status_pengiriman: status_pengiriman,
      status_penerimaan: status_penerimaan,
      admin_id: req.adminId,
      user_id: req.userId,
      produk_id: req.produkId,
    });

    return res.status(201).json({ msg: "Transaksi berhasil ditambahkan" });
  } catch (error) {
    return res.status(400).json({ msg: "Transaksi gagal dibuat" });
  }
};

export const updateTransaksis = async (req, res) => {
  try {
    const transaksi = await Transaksi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!transaksi) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const {
      nama_produk,
      harga_produk,
      jumlah_produk,
      total_transaksi,
      status_pengiriman,
      status_penerimaan,
      admin_id,
      user_id,
      produk_id,
    } = req.body;

    let bukti_transfer = transaksi.bukti_transfer;
    if (req.files && req.files.bukti_transfer) {
      const file = req.files.bukti_transfer;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Gambar salah" });
      }
      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Gambar kurang dari 5 Mb" });
      }

      try {
        await file.mv(`./public/images/${fileName}`);
        bukti_transfer = url;
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    }

    await transaksi.update({
      nama_produk,
      harga_produk,
      jumlah_produk,
      total_transaksi,
      bukti_transfer,
      status_pengiriman,
      status_penerimaan,
      admin_id,
      user_id,
      produk_id,
    });

    return res.status(200).json({ msg: "Transaksi berhasil diupdate" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteTransaksis = async (req, res) => {
  try {
    const transaksi = await Transaksi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!transaksi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const imagePath = transaksi.bukti_transfer;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    await Transaksi.destroy({
      where: {
        id: transaksi.id,
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
