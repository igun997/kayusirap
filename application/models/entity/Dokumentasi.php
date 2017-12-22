<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dokumentasi extends CI_Model{


    public function __construct()
    {
      parent::__construct();
    }
    public function find($data='')
    {
      if($data == ''){
        return $this->db->get("dokumentasi");
      }else {
        return $this->db->get_where("dokumentasi",$data);
      }
    }
    public function insert($data='')
    {
      return $this->db->insert("dokumentasi",$data);
    }
    public function update($data,$where)
    {
      $this->db->where($where)->update("dokumentasi",$where);
      return $this->db->affected_rows();
    }
    public function delete($data='')
    {
      if($data == ''){
        $this->db->delete("dokumentasi");
      }else {
        $this->db->delete("dokumentasi",$data);
      }
      return $this->db->affected_rows() > 0;
    }

}
