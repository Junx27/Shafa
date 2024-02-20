import Pembayaran from "../models/PembayaranModel.js";
import Pembelian from "../models/PembelianModel.js";
import User from "../models/UserModel.js";

export const getPembelian = async (req, res) => {
  try {
    let response;
    response = await Pembelian.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Pembayaran,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPembelianById = async (req, res) => {
  try {
    const pembelian = await Pembelian.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pembelian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Pembelian.findOne({
      where: {
        id: pembelian.id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createPembelaian = async (req, res) => {
  const pembelianArray = req.body;

  try {
    for (let i = 0; i < pembelianArray.length; i++) {
      const {
        nama_produk,
        harga_produk,
        jumlah_produk,
        total_pembelian,
        pembayaran_id,
      } = pembelianArray[i];
      const status = "belum";
      await Pembelian.create({
        nama_produk: nama_produk,
        harga_produk: harga_produk,
        jumlah_produk: jumlah_produk,
        total_pembelian: total_pembelian,
        status: status,
        pembayaran_id: pembayaran_id,
        user_id: req.userId,
      });
    }

    res.status(201).json({ msg: "Pembelian berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePembelian = async (req, res) => {
  try {
    const pembelian = await Pembelian.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pembelian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama_produk } = req.body;
    try {
      await Pembelian.update(
        {
          nama_produk: nama_produk,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      res.status(200).json({ msg: "Pembelian berhasil diupdate" });
    } catch (error) {
      res.status(400).json({ msg: "Pembelian gagal diupdate" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deletePembelian = async (req, res) => {
  try {
    const pembelian = await Pembelian.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!pembelian)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    await Pembelian.destroy({
      where: {
        id: pembelian.id,
      },
    });
    res.status(200).json({ msg: "pembelian telah dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "tidak dapat menghapus" });
  }
};
