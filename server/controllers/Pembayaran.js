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
      attributes: [
        "id",
        "uuid",
        "nama",
        "total",
        "bukti_pembayaran",
        "alamat",
        "status_pengiriman",
        "status_penerimaan",
        "user_id",
      ],
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
  const { nama, total, alamat, status_pengiriman, status_penerimaan, user_id } =
    req.body;

  let bukti_pembayaran = "belum";

  if (req.files && req.files.bukti_pembayaran) {
    const file = req.files.bukti_pembayaran;
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
      bukti_pembayaran = url;
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  try {
    await Pembayaran.create({
      nama: nama,
      total: total,
      bukti_pembayaran: bukti_pembayaran,
      alamat: alamat,
      status_pengiriman: status_pengiriman,
      status_penerimaan: status_penerimaan,
      user_id: req.userId,
    });

    return res.status(201).json({ msg: "Pembelian berhasil ditambahkan" });
  } catch (error) {
    return res.status(400).json({ msg: "Pembelian gagal dibuat" });
  }
};
// export const createTransaksiArray = async (req, res) => {
//   const transaksiData = req.body;

//   // Buat array untuk menampung hasil pesan untuk setiap transaksi
//   const results = [];

//   // Loop melalui setiap objek transaksi dalam data array
//   for (let i = 0; i < transaksiData.length; i++) {
//     const {
//       nama_produk,
//       harga_produk,
//       jumlah_produk,
//       total_transaksi,
//       status_pengiriman,
//       status_penerimaan,
//       admin_id,
//       user_id,
//       produk_id,
//     } = transaksiData[i];

//     let bukti_transfer = "belum";

//     if (req.files && req.files[i] && req.files[i].bukti_transfer) {
//       const file = req.files[i].bukti_transfer;
//       const fileSize = file.data.length;
//       const ext = path.extname(file.name);
//       const fileName = file.md5 + ext;
//       const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
//       const allowedType = [".png", ".jpg", ".jpeg"];

//       if (!allowedType.includes(ext.toLowerCase())) {
//         results.push({ msg: `Gambar salah untuk transaksi ${i + 1}` });
//         continue; // Lanjutkan ke transaksi berikutnya
//       }
//       if (fileSize > 5000000) {
//         results.push({ msg: `Gambar dibawah 5 Mb untuk transaksi ${i + 1}` });
//         continue; // Lanjutkan ke transaksi berikutnya
//       }

//       try {
//         await file.mv(`./public/images/${fileName}`);
//         bukti_transfer = url;
//       } catch (error) {
//         results.push({
//           msg: `Gagal menyimpan gambar untuk transaksi ${i + 1}`,
//         });
//         continue; // Lanjutkan ke transaksi berikutnya
//       }
//     }

//     try {
//       await Transaksi.create({
//         nama_produk: nama_produk,
//         harga_produk: harga_produk,
//         jumlah_produk: jumlah_produk,
//         total_transaksi: total_transaksi,
//         bukti_transfer: bukti_transfer,
//         status_pengiriman: status_pengiriman,
//         status_penerimaan: status_penerimaan,
//         admin_id: req.adminId,
//         user_id: req.userId,
//         produk_id: produk_id,
//       });

//       results.push({ msg: `Transaksi ${i + 1} berhasil ditambahkan` });
//     } catch (error) {
//       results.push({ msg: `Transaksi ${i + 1} gagal dibuat` });
//     }
//   }

//   return res.status(201).json(results);
// };

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
      nama,
      total,
      bukti_pembayaran,
      alamat,
      status_pengiriman,
      status_penerimaan,
      user_id,
    } = req.body;

    let bukti_transfer = pembelian.bukti_pembayaran;
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

    await Pembayaran.update({
      nama,
      total,
      bukti_pembayaran,
      alamat,
      status_pengiriman,
      status_penerimaan,
      admin_id,
      user_id,
      produk_id,
    });

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
    const imagePath = transaksi.bukti_pembayaran;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    await Pembayaran.destroy({
      where: {
        id: pembayaran.id,
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
    res.status(200).json({ msg: "Pembelian berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const deleteTransaksiByProductName = async (req, res) => {
//   const productName = req.params.nama_produk;

//   try {
//     // Hapus transaksi berdasarkan nama_produk
//     const deletedTransaksiCount = await Transaksi.destroy({
//       where: {
//         nama_produk: productName,
//       },
//     });

//     if (deletedTransaksiCount > 0) {
//       return res.status(200).json({
//         msg: `Transaksi dengan nama produk ${productName} berhasil dihapus`,
//       });
//     } else {
//       return res.status(404).json({
//         msg: `Transaksi dengan nama produk ${productName} tidak ditemukan`,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };
// export const deleteTransaksiByUserId = async (req, res) => {
//   const userId = req.params.user_id;

//   try {
//     const deletedTransaksiCount = await Transaksi.destroy({
//       where: {
//         user_id: userId,
//       },
//     });

//     if (deletedTransaksiCount > 0) {
//       return res.status(200).json({
//         msg: `Transaksi dengan user_id ${userId} berhasil dihapus`,
//       });
//     } else {
//       return res.status(404).json({
//         msg: `Transaksi dengan user_id ${userId} tidak ditemukan`,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };
