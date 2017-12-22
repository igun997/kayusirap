<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Model{

  public function __construct()
  {
    parent::__construct();
  }
  public function find($data='')
  {
    if($data == ''){
      return $this->db->get("users");
    }else {
      return $this->db->get_where("users",$data);
    }
  }
  public function insert($data='')
  {
    return $this->db->insert("users",$data);
  }
  public function update($data,$where)
  {
    $this->db->where($where)->update("users",$where);
    return $this->db->affected_rows();
  }
  public function delete($data='')
  {
    if($data == ''){
      $this->db->delete("users");
    }else {
      $this->db->delete("users",$data);
    }
    return $this->db->affected_rows() > 0;
  }

}
