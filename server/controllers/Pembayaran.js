import Admin from "../models/AdminModel.js";
import Produks from "../models/ProdukModel.js";
import Users from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import Pembayaran from "../models/PembayaranModel.js";

const { ForeignKeyConstraintError } = Sequelize;

export const getPembayaran = async (req, res) => {
  try {
    let response;
    response = await Pembayaran.findAll({
      include: [
        {
          model: Users,
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPembayaranBelumBayar = async (req, res) => {
  try {
    let response;
    response = await Pembayaran.findAll({
      where: {
        status_pembayaran: "belum",
      },
      include: [
        {
          model: Users,
          attributes: ["nama"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPembayaranTerbayar = async (req, res) => {
  try {
    let response;
    response = await Pembayaran.findAll({
      where: {
        status_pembayaran: "sudah",
        status_penerimaan: "belum",
      },
      include: [
        {
          model: Users,
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPembayaranSelesai = async (req, res) => {
  try {
    let response;
    response = await Pembayaran.findAll({
      where: {
        status_pembayaran: "sudah",
        status_pengiriman: "sudah",
        status_penerimaan: "sudah",
      },
      include: [
        {
          model: Users,
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPembayaranById = async (req, res) => {
  try {
    const transaksi = await Pembayaran.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!transaksi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Pembayaran.findOne({
      where: {
        id: transaksi.id,
      },
      include: [
        {
          model: Users,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createPembayaran = async (req, res) => {
  const {
    nama,
    total,
    alamat,
    status_pembayaran,
    status_pengiriman,
    bukti_pengiriman,
    status_penerimaan,
    bukti_pembayaran,
    user_id,
  } = req.body;

  let bukti_pembayaran_sementara = "belum";

  if (req.files === null) {
    try {
      await Pembayaran.create({
        nama: nama,
        total: total,
        bukti_pembayaran: bukti_pembayaran_sementara,
        alamat: alamat,
        status_pembayaran: status_pembayaran,
        status_pengiriman: status_pengiriman,
        bukti_pengiriman: bukti_pengiriman,
        status_penerimaan: status_penerimaan,
        user_id: req.userId,
      });

      return res.status(201).json({ msg: "Pembelian berhasil ditambahkan" });
    } catch (error) {
      return res.status(400).json({ msg: "Pembelian gagal dibuat" });
    }
  } else {
    const file = req.files.bukti_pembayaran;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/images/transfer/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar salah" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Gambar dibawah 5 Mb" });

    file.mv(`./public/images/transfer/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await Pembayaran.create({
          nama: nama,
          total: total,
          bukti_pembayaran: url,
          alamat: alamat,
          status_pembayaran: status_pembayaran,
          status_pengiriman: status_pengiriman,
          bukti_pengiriman: bukti_pengiriman,
          status_penerimaan: status_penerimaan,
          user_id: req.userId,
        });
        return res.status(201).json({ msg: "Pembelian berhasil ditambahkan" });
      } catch (error) {
        return res.status(400).json({ msg: "Pembelian gagal dibuat" });
      }
    });
  }
};
export const updatePembayaran = async (req, res) => {
  try {
    const pembayaran = await Pembayaran.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pembayaran) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
    const {
      status_pembayaran,
      status_pengiriman,
      status_penerimaan,
      bukti_pengiriman,
    } = req.body;
    await Pembayaran.update(
      {
        status_pembayaran,
        status_pengiriman,
        status_penerimaan,
        bukti_pengiriman,
      },
      {
        where: {
          id: pembayaran.id,
        },
      }
    );

    return res.status(200).json({ msg: "Pembayaran berhasil diupdate" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const deletePembayaran = async (req, res) => {
  try {
    const pembayaran = await Pembayaran.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pembayaran)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const imagePath = pembayaran.bukti_pembayaran;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    await Pembayaran.destroy({
      where: {
        id: pembayaran.id,
      },
    });
    if (imagePath !== "belum") {
      const fileName = imagePath.split("/").pop();
      const filePath = path.join(
        __dirname,
        "../public/images/transfer/",
        fileName
      );
      console.log(filePath);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Gagal menghapus gambar:", err);
          return res.status(500).json({ msg: "Gagal menghapus gambar" });
        }
        console.log("Gambar berhasil dihapus");
      });
    }
    res.status(200).json({ msg: "Pembelian berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deletePembayaranById = async (req, res) => {
  try {
    const pembayaran = await Pembayaran.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pembayaran)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    await Pembayaran.destroy({
      where: {
        id: pembayaran.id,
      },
    });
    res.status(200).json({ msg: "pembayaran telah dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "pembayaran dapat menghapus" });
  }
};
