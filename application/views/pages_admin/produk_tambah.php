<div class="container-fluid">
  <div class="row">
      <div class="col-md-12 col-lg-12 col-sm-12">
        <div class="white-box">
            <h2>Tambah Produk</h2>

            <div class="row row-in">
              <div class="col-md-6 col-md-offset-3">
                <form action="" method="post">
                  <div class="form-group">
                    <label for="jenis_sirap">Jenis Sirap</label>
                    <input class="form-control" id="jenis_sirap" name="jenis_sirap" placeholder="Jenis Sirap">
                  </div>
                  <div class="form-group">
                    <label for="jenis_sirap">Bahan</label>
                    <input class="form-control" id="jenis_sirap" name="jenis_sirap" placeholder="Jenis Sirap">
                  </div>
                  <div class="form-group">
                    <label for="jenis_sirap">Satuan</label>
                    <input class="form-control" id="jenis_sirap" name="jenis_sirap" placeholder="Jenis Sirap">
                  </div>
                  <div class="form-group">
                    <label for="berat">Berat</label>
                    <input class="form-control" id="berat" name="berat" placeholder="Berat">
                  </div>
                  <div class="form-group">
                    <label for="panjang">Panjang</label>
                    <input class="form-control" id="panjang" name="panjang" placeholder="Panjang">
                  </div>
                  <div class="form-group">
                    <label for="lebar">Lebar</label>
                    <input class="form-control" id="lebar" name="lebar" placeholder="Lebar">
                  </div>
                  <div class="form-group">
                    <label for="tebal">Tebal</label>
                    <input class="form-control" id="tebal" name="tebal" placeholder="Tebal">
                  </div>
                  <div class="form-group">
                    <label for="img">Gambar</label>
                    <input class="form-control" type="file" id="jenis_sirap" name="img" placeholder="Gambar">
                  </div>
                  <div class="form-group">
                    <label for="deskripsi">Deskripsi</label>
                    <textarea class="form-control" id="deskripsi" name="deskripsi" placeholder="Deskripsi"></textarea>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-success" type="submit">Simpan</button>
                    <a href="<?= base_url("administrator/produk") ?>" class="btn btn-danger" >Kembali</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
</div>
