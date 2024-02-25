import Pembayaran from "../models/PembayaranModel.js";
import Pembelian from "../models/PembelianModel.js";
import Produks from "../models/ProdukModel.js";
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
        {
          model: Produks,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPembelianByStatus = async (req, res) => {
  try {
    let response;
    response = await Pembelian.findAll({
      where: {
        status: "belum",
      },
      include: [
        {
          model: User,
        },
        {
          model: Pembayaran,
        },
        {
          model: Produks,
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
        {
          model: Pembayaran,
        },
        {
          model: Produks,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getPembelianByPembayaranId = async (req, res) => {
  const pembayaranId = req.params.pembayaran_id;

  try {
    const pembelian = await Pembelian.findAll({
      where: {
        pembayaran_id: pembayaranId,
      },
      include: [
        {
          model: User,
        },
        {
          model: Pembayaran,
        },
        {
          model: Produks,
        },
      ],
    });

    if (!pembelian || pembelian.length === 0) {
      return res
        .status(404)
        .json({ msg: "Tidak ada data pembelian untuk pembayaran_id ini" });
    }

    res.status(200).json(pembelian);
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
        produk_id,
      } = pembelianArray[i];
      const status = "belum";
      await Pembelian.create({
        nama_produk: nama_produk,
        harga_produk: harga_produk,
        jumlah_produk: jumlah_produk,
        total_pembelian: total_pembelian,
        status: status,
        pembayaran_id: pembayaran_id,
        produk_id: produk_id,
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
    // Ambil semua data pembelian dengan status 'belum'
    const pembelianBelum = await Pembelian.findAll({
      where: {
        status: "belum",
      },
    });

    if (!pembelianBelum || pembelianBelum.length === 0) {
      return res
        .status(404)
        .json({ msg: "Tidak ada data pembelian dengan status 'belum'" });
    }

    const { pembayaran_id } = req.body;

    try {
      // Update semua data pembelian yang memiliki status 'belum' menjadi 'sudah'
      await Pembelian.update(
        {
          pembayaran_id: pembayaran_id, // Update pembayaran_id dengan nilai yang diberikan
          status: "sudah", // Ubah status menjadi 'sudah'
        },
        {
          where: {
            status: "belum", // Filter data dengan status 'belum'
          },
        }
      );

      res.status(200).json({ msg: "Status pembelian berhasil diupdate" });
    } catch (error) {
      res.status(400).json({
        msg: "Gagal mengupdate status pembelian",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deletePembelian = async (req, res) => {
  const userId = req.params.user_id;

  try {
    // Hapus transaksi berdasarkan nama_produk
    const deletedTransaksiCount = await Pembelian.destroy({
      where: {
        user_id: userId,
      },
    });

    if (deletedTransaksiCount > 0) {
      return res.status(200).json({
        msg: `Transaksi dengan nama produk ${productName} berhasil dihapus`,
      });
    } else {
      return res.status(404).json({
        msg: `Transaksi dengan nama produk ${productName} tidak ditemukan`,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
