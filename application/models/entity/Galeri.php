<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Galeri extends CI_Model{

    public function __construct()
    {
      parent::__construct();
    }
    public function find($data='')
    {
      if($data == ''){
        return $this->db->get("galeri");
      }else {
        return $this->db->get_where("galeri",$data);
      }
    }
    public function insert($data='')
    {
      return $this->db->insert("galeri",$data);
    }
    public function update($data,$where)
    {
      $this->db->where($where)->update("galeri",$where);
      return $this->db->affected_rows();
    }
    public function delete($data='')
    {
      if($data == ''){
        $this->db->delete("galeri");
      }else {
        $this->db->delete("galeri",$data);
      }
      return $this->db->affected_rows() > 0;
    }

}
