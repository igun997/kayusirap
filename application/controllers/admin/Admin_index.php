<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_index extends CI_Controller{

  public function __construct()
  {
    parent::__construct();
    //Codeigniter : Write Less Do More
  }

  function index()
  {
      $page["view"] = "pages_admin/home";
      $data["judul"] = "Administrator";
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

}
