<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    $this->load->model("entity/Produk");
  }

  function index()
  {
    $page["produk"] = $this->Produk->find('',0,2);
    $data["judul"] = "Halaman Utama";
    $page["view"] = "pages/home";
    $data["data"] = $page;
    $data["css"] =  array(
       base_url("assets/css/bootstrap.min.css"),
       base_url("assets/css/style.css"),
       "//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
       '//fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic',
       '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css',
       '//fonts.googleapis.com/css?family=Cookie'
    );
    $data["js"] =  array(
      base_url("assets/js/jquery.js"),
      base_url("assets/js/bootstrap.min.js")
    );
    $this->load->view("front/header",$data);
    $this->load->view("front/body",$data);
    $this->load->view("front/footer",$data);
  }

}
