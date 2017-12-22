<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sitemeta extends CI_Model{

    public function __construct()
    {
      parent::__construct();
    }
    public function find($data='')
    {
      if($data == ''){
        return $this->db->get("sitemeta");
      }else {
        return $this->db->get_where("sitemeta",$data);
      }
    }
    public function insert($data='')
    {
      return $this->db->insert("sitemeta",$data);
    }
    public function update($data,$where)
    {
      $this->db->where($where)->update("sitemeta",$where);
      return $this->db->affected_rows();
    }
    public function delete($data='')
    {
      if($data == ''){
        $this->db->delete("sitemeta");
      }else {
        $this->db->delete("sitemeta",$data);
      }
      return $this->db->affected_rows() > 0;
    }

}
