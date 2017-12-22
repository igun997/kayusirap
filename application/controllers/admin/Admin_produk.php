<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_produk extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    $this->load->model("entity/Produk");
  }

  function index()
  {
    $page["produk"] = $this->Produk->find();
    $page["view"] = "pages_admin/produk";
    $data["judul"] = "Produk Manajer";
    $data["css"] =  array(
       base_url("assets/css/bootstrap.min.css"),
       base_url("assets/css/style_admin.css"),
       base_url("assets/css/spinners.css"),
       base_url("assets/plugins/sweetalert/sweetalert2.css"),
       base_url("assets/plugins/metisMenu/dist/metisMenu.min.css"),
       base_url("assets/plugins/morrisjs/morris.css"),
       base_url("assets/plugins/datatables/jquery.dataTables.min.css"),
       base_url("assets/plugins/fa/css/font-awesome.min.css")

    );
    $data["js"] =  array(
      base_url("assets/js/jquery.min.js"),
      base_url("assets/js/bootstrap.min.js"),
      base_url("assets/plugins/datatables/jquery.dataTables.min.js"),
      base_url("assets/plugins/bootbox/bootbox.min.js"),
      base_url("assets/plugins/metisMenu/dist/metisMenu.min.js"),
      base_url("assets/plugins/morrisjs/morris.js"),
      base_url("assets/plugins/raphael/raphael-min.js"),
      base_url("assets/js/jquery.nicescroll.js"),
      base_url("assets/js/waves.js"),
      base_url("assets/plugins/sweetalert/sweetalert2.min.js"),
      base_url("assets/js/myadmin.js"),
      base_url("assets/js/dashboard.js")
    );
    $data["data"] = $page;
    $this->load->view("end/header",$data);
    $this->load->view("end/body",$data);
    $this->load->view("end/footer",$data);
  }
  function tambah(){
    if(isset($_POST["tambah"])){
      $data = $this->input->post(null,true);
      unset($data["tambah"]);
        $config["detect_mime"] = true;
        $config["encrypt_name"] = true;
        $config["mod_mime_fix"] = true;
        if (isset($_FILES["img"]["tmp_name"])) {
          $config['upload_path'] = FCPATH."_upload/";
          $config['allowed_types'] = 'jpg|jpeg|png|gif';
          $config['max_size'] = 500;
          $this->load->library('upload', $config);
          if($this->upload->do_upload('img')){
            $data_file = $this->upload->data();
            $produk = $this->Produk;
            $data["img"] = $data_file["file_name"];
            if($produk->insert($data)){
              $page["msg"] = "Simpan Data Berhasil";
            }else{
              unlink($data["full_path"]);
              $page["msg"] = "Simpan Data Gagal";
            }
          }else {
            $page["msg"] = "Upload Gagal Karena : ".$this->upload->display_errors();
          }
        }else{
          $page["msg"] = "Pilih Minimal 1 Gambar";
        }
    }
    $page["view"] = "pages_admin/produk_tambah";
    $data["judul"] = "Tambah Produk";
    $data["css"] =  array(
       base_url("assets/css/bootstrap.min.css"),
       base_url("assets/css/style_admin.css"),
       base_url("assets/css/spinners.css"),
       base_url("assets/plugins/sweetalert/sweetalert2.css"),
       base_url("assets/plugins/metisMenu/dist/metisMenu.min.css"),
       base_url("assets/plugins/morrisjs/morris.css"),
       base_url("assets/plugins/datatables/jquery.dataTables.min.css"),
       base_url("assets/plugins/fa/css/font-awesome.min.css")

    );
    $data["js"] =  array(
      base_url("assets/js/jquery.min.js"),
      base_url("assets/js/bootstrap.min.js"),
      base_url("assets/plugins/datatables/jquery.dataTables.min.js"),
      base_url("assets/plugins/bootbox/bootbox.min.js"),
      base_url("assets/plugins/metisMenu/dist/metisMenu.min.js"),
      base_url("assets/plugins/morrisjs/morris.js"),
      base_url("assets/plugins/raphael/raphael-min.js"),
      base_url("assets/js/jquery.nicescroll.js"),
      base_url("assets/js/waves.js"),
      base_url("assets/plugins/sweetalert/sweetalert2.min.js"),
      base_url("assets/js/myadmin.js"),
      base_url("assets/js/dashboard.js")
    );
    $data["data"] = $page;
    $this->load->view("end/header",$data);
    $this->load->view("end/body",$data);
    $this->load->view("end/footer",$data);
  }
  function edit($id=''){
    echo $id;
  }
  function hapus($id=''){
    echo $id;
  }

}
