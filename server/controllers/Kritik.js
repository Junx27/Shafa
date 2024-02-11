import Kritik from "../models/KritikModel.js";
import User from "../models/UserModel.js";

export const getKritik = async (req, res) => {
  try {
    let response;
    response = await Kritik.findAll({
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
export const getKritikById = async (req, res) => {
  try {
    const kritik = await Kritik.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kritik) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Kritik.findOne({
      where: {
        id: kritik.id,
      },
      include: [
        {
          model: User,
          attributes: ["nama", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createKritik = async (req, res) => {
  const { kritik } = req.body;
  try {
    await Kritik.create({
      kritik: kritik,
      user_id: req.userId,
    });
    res.status(201).json({ msg: "kritik berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateKritik = async (req, res) => {
  try {
    const data = await Kritik.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!data) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { kritik } = req.body;
    try {
      await Kritik.update(
        {
          kritik: kritik,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      res.status(200).json({ msg: "Kritik berhasil diupdate" });
    } catch (error) {
      res.status(400).json({ msg: "Kritik gagal diupdate" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteKritik = async (req, res) => {
  try {
    const kritik = await Kritik.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kritik) return res.status(404).json({ msg: "Data tidak ditemukan" });
    await Kritik.destroy({
      where: {
        id: kritik.id,
      },
    });
    res.status(200).json({ msg: "kritik telah dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "tidak dapat menghapus" });
  }
};
