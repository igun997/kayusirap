<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Produk extends CI_Model{

    public function __construct()
    {
      parent::__construct();
    }
    public function find($data='')
    {
      if($data == ''){
        return $this->db->get("produk");
      }else {
        return $this->db->get_where("produk",$data);
      }
    }
    public function insert($data='')
    {
      return $this->db->insert("produk",$data);
    }
    public function update($data,$where)
    {
      $this->db->where($where)->update("produk",$where);
      return $this->db->affected_rows();
    }
    public function delete($data='')
    {
      if($data == ''){
        $this->db->delete("produk");
      }else {
        $this->db->delete("produk",$data);
      }
      return $this->db->affected_rows() > 0;
    }

}
