function Bantuan() {
  return (
    <div className="mx-5 md:mx-32 mb-20">
      <div className="text-[10px] md:text-xs flex mb-5 bg-green-400 p-2 rounded w-[150px] md:w-64 shadow items-center">
        <span className="text-[10px] md:text-xs material-symbols-outlined">
          info
        </span>
        <h1 className=" ml-1 md:ml-3">Informasi bantuan</h1>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="transition-all duration-1000 hover:shadow-lg border p-10 rounded-lg shadow h-56">
            <h1 className="font-bold underline">Lupa kata sandi?</h1>
            <p className="mt-5 text-xs indent-8 text-justify">
              Jika lupa kata sandi, pengguna diharapkan dapat menghubungi admin
              terkait kendala lupa kata sandi dan pengguna menunggu 1 x 24 jam.
              Dapat dihubungi pada nomer berikut
              <span className="text-green-500 font-bold ms-2 underline">
                +6281226319124
              </span>
            </p>
          </div>
          <div className="transition-all duration-1000 hover:shadow-lg border p-10 rounded-lg shadow h-56">
            <h1 className="font-bold underline">Apa itu keranjang?</h1>
            <p className="mt-5 text-xs indent-8 text-justify">
              Menu keranjang adalah menu untuk konsumen memilih barang terlebih
              dahulu sebelum melakukan pembayaran, jika konsumen telah yakin
              akan barang yang dibeli selanjutnya konsumen menyelsaikan dengan
              pembayaran.
            </p>
          </div>
          <div className="transition-all duration-1000 hover:shadow-lg border p-10 rounded-lg shadow h-56">
            <h1 className="font-bold underline">Bagaimana membayar?</h1>
            <p className="mt-5 text-xs indent-8 text-justify">
              Pembayaran dilakukan konsumen dengan melakukan transfer dan bukti
              transfer disertakan sebagai bukti pembayaran selanjutnya admin
              akan melakukan verifikasi terkait pembayaran.
            </p>
          </div>
          <div className="transition-all duration-1000 hover:shadow-lg border p-10 rounded-lg shadow h-56">
            <h1 className="font-bold underline">Pesanan dikemas?</h1>
            <p className="mt-5 text-xs indent-8 text-justify">
              Pesanan dikemas adalah pesanan sedang menunggu konfirmasi admin
              untuk pengiriman, mohon bersabar untuk admin selesai memverifikasi
              data pembelian anda.
            </p>
          </div>
          <div className="transition-all duration-1000 hover:shadow-lg border p-10 rounded-lg shadow h-56">
            <h1 className="font-bold underline">Konfirmasi pembelian?</h1>
            <p className="mt-5 text-xs indent-8 text-justify">
              Konfirmasi pembelian adalah persetujuan dari konsumen jika barang
              yang telah dipesan dan dikirimkan oleh admin telah selesai
              diterima.
            </p>
          </div>
          <div className="transition-all duration-1000 hover:shadow-lg border p-10 rounded-lg shadow h-56">
            <h1 className="font-bold underline">Pembelian selesai?</h1>
            <p className="mt-5 text-xs indent-8 text-justify">
              Pembelian selesai adalah data transaksi pembelian yang telah
              selesai dikirimkan oleh admin serta barang yang telah dibeli telah
              diterima oleh konsumen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bantuan;
