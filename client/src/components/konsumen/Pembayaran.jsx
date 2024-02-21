import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Pembayaran() {
  const navigate = useNavigate();
  const [pembayaran, setPembayaran] = useState([]);
  const [pembayaranBelum, setPembayaranBelum] = useState([]);

  useEffect(() => {
    const fetchPembayaranBelum = async () => {
      const response = await axios("http://localhost:5000/pembayaran/belum");
      setPembayaranBelum(response.data);
    };
    fetchPembayaranBelum();
  }, []);
  useEffect(() => {
    const fetchPembayaran = async () => {
      const response = await axios("http://localhost:5000/pembayaran/sudah");
      setPembayaran(response.data);
    };
    fetchPembayaran();
  }, []);
  return (
    <div>
      {pembayaranBelum.length !== 0 && (
        <div className="flex ml-20">
          <span className="material-symbols-outlined text-lime-500">
            shopping_cart_checkout
          </span>
          <h1 className="mb-8 ml-5">Konfirmasi pembayaran</h1>
          <div className="mt-10">
            {pembayaranBelum.map((row, index) => (
              <div key={index}>
                <button
                  className="bg-lime-400 p-2 rounded"
                  onClick={() => navigate(`/pembayaran/${row.uuid}`)}
                >
                  Konfirmasi pembayaran
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {pembayaran.length !== 0 && (
        <div className="flex ml-20 mt-10">
          <span className="material-symbols-outlined text-lime-500">
            receipt_long
          </span>
          <h1 className="mb-8 ml-5">Konfirmasi Penerimaan</h1>
          <div className="mt-10">
            {pembayaran.map((row, index) => (
              <div key={index}>
                {row.nama}
                <img src={row.bukti_pembayaran} alt="" />
                <button
                  className="bg-lime-400 p-2 rounded"
                  onClick={() => navigate(`/pembayaran/${row.uuid}`)}
                >
                  Selsaikan Pembayaran
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {pembayaran.length !== 0 && (
        <div className="flex ml-20 mt-10">
          <span className="material-symbols-outlined text-lime-500">
            description
          </span>
          <h1 className="mb-8 ml-5">Konfirmasi Penerimaan</h1>
          <div className="mt-10">
            {pembayaran.map((row, index) => (
              <div key={index}>
                {row.nama}
                <img src={row.bukti_pembayaran} alt="" />
                <button
                  className="bg-lime-400 p-2 rounded"
                  onClick={() => navigate(`/pembayaran/${row.uuid}`)}
                >
                  Selsaikan Pembayaran
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pembayaran;
