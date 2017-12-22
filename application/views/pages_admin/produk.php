<div class="container-fluid">
  <div class="row">
      <div class="col-md-12 col-lg-12 col-sm-12">
        <div class="white-box">
            <h2>Manajer Produk</h2>
            <a href="<?= base_url("administrator/produk/tambah") ?>" class="btn btn-success">Tambah Produk</a>
            <hr>
            <div class="row row-in">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <table class="table">
                  <thead>
                    <th>#</th>
                    <th>Jenis Sirap</th>
                    <th>Bahan</th>
                    <th>Satuan</th>
                    <th>Aksi</th>
                  </thead>
                  <tbody>
                    <?php foreach ($produk->result() as $key => $value): ?>
                      <tr>
                        <td><?= $value->id_produk ?></td>
                        <td><?= $value->jenis_sirap ?></td>
                        <td><?= $value->bahan ?></td>
                        <td><?= $value->satuan ?></td>
                        <td><a href="<?= base_url("administrator/produk/view".$value->id_produk) ?>" class="btn btn-success">Lihat</a> <a href="<?= base_url("administrator/produk/edit".$value->id_produk) ?>" class="btn btn-warning">Ubah</a> <a href="<?= base_url("administrator/produk/hapus".$value->id_produk) ?>" class="btn btn-danger">Hapus</a></td>
                      </tr>
                    <?php endforeach; ?>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
        </div>
      </div>
  </div>
</div>
