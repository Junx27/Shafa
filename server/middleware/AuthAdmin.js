import Admin from "../models/AdminModel.js";

export const verifyAdmin = async (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const admin = await Admin.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
  req.adminId = admin.id;
  next();
};
