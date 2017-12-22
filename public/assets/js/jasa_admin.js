$(document).ready(function() {
  console.log("Jasa Admin Pages Scripts");
  $('table').dataTable();

  $(".add").on("click", function() {
    var dialog = bootbox.dialog({
      title: 'Persiapan',
      message: '<p align="center"><i class="fa fa-spin fa-spinner"></i> Loading ...</p>'
    });
    dialog.init(function() {
      setTimeout(function() {
        dialog.find(".modal-title").html("Tambah Jasa");
        dialog.find(".bootbox-body").html("<div class='row'><div class='col-md-12'><form action='' method='post' id='formJasa'><div class='form-group'><input class='form-control' id='nama' placeholder='Nama Jasa' name='nama'></div><div class='form-group'><input class='form-control' id='harga' placeholder='Harga' name='harga'></div><div class='form-group'><textarea class='form-control' id='deskripsi' name='deskripsi'></textarea></div><div class='form-group'><input class='form-control' type='file' id='img' name='img'></div><div class='form-group'><button type='button' id='savejasa' class='btn btn-success'><li class='fa fa-save'></li></button></div></form></div></div>");
        dialog.find("#deskripsi").ready(function() {
          console.log("Init Textarea");
          tinymce.init({ selector:'textarea' });
        });
        dialog.find("#savejasa").on("click", function() {
          bootbox.hideAll();
          swal({
            title: 'Simpan Data',
            text: 'Tunggu Sebentar',
            timer: 1000,
            onOpen: () => {
              swal.showLoading();
            }
          }).then((result) => {
            var formData = new FormData();
            formData.append('img', dialog.find("#img")[0].files[0]);
            $.ajax({
              url: base_url + "/rest/uploadjasa",
              type: 'POST',
              data: formData,
              mimeType: "multipart/form-data",
              contentType: false,
              cache: false,
              processData: false,
              success: function(data, textStatus, jqXHR) {
                data = JSON.parse(data);
                if (textStatus == "success") {
                  if (data.status == 1) {
                    var img = data.data.file_name;
                    var nama = dialog.find("#nama").val();
                    var harga = dialog.find("#harga").val();
                    var deskripsi = dialog.find("#deskripsi").val();
                    var postdata = {
                      nama: nama,
                      harga: harga,
                      deskripsi: deskripsi,
                      img: img
                    };
                    console.log("Image :" + img);
                    var saveset = post(base_url + "/rest/savejasa", postdata);
                    if (saveset.status == 1) {
                      swal("Yeaay !", saveset.msg, "success").then((result) => {
                        location.reload();
                      });
                    } else {
                      swal("Oops !", saveset.msg, "error");
                    }
                  } else {
                    swal("Opps !", data.msg, "error");
                  }
                } else {
                  swal("Opps !", "Cek Koneksi Internet Anda", "error");
                }
              }
            });
          });
        });
      }, 1000);
    });
  });
  $("#jasaTable").on("click", ".edit", function() {
    var ini = $(this);
    var dialog = bootbox.dialog({
      title: 'Ambil Data',
      message: '<p align="center"><i class="fa fa-spin fa-spinner"></i> Loading ...</p>'
    });
    dialog.init(function() {
      setTimeout(function() {
        var send = post(base_url + "/rest/getjasa", {
          id_jasa: ini.data("id")
        });
        if (send.status == 1) {
          var html = "";
          dialog.find(".modal-title").html("Jasa ID #" + ini.data("id"));
          html += "<div class='row'>";
          html += "<div class='col-md-12'>";
          html += "<form  id='formJasa' action='' method='post'>";
          html += "<div class='form-group'>";
          html += "<input class='form-control' name='nama' placeholder='Nama Jasa' value='" + send.nama + "'>";
          html += "<input value='" + ini.data("id") + "' name='id_jasa' hidden>";
          html += "</div>";
          html += "<div class='form-group'>";
          html += "<input class='form-control' name='harga' placeholder='Harga Jasa' value='" + send.harga + "'>";
          html += "</div>";
          html += "<div class='form-group'>";
          html += "<textarea class='form-control' name='deskripsi'>" + send.deskripsi + "</textarea>";
          html += "</div>";
          html += "<div class='form-group'>";
          html += "<button type='button' class='btn btn-success update'><li class='fa fa-save'></li></button>";
          html += "</div>";
          html += "</form>";
          html += "</div>";
          html += "</div>";
          dialog.find(".bootbox-body").html(html);
          dialog.find(".update").on("click", function() {
            swal({
              title: 'Simpan Data . .',
              text: 'Tunggu Sebentar',
              timer: 1000,
              onOpen: () => {
                swal.showLoading();
              }
            }).then((result) => {
              var data = dialog.find("#formJasa").serializeArray();
              var sender = post(base_url + "/rest/updatejasa/", data);
              if (sender.status == 1) {
                bootbox.hideAll();
                swal("Yeaay !", sender.msg, "success");
              } else {
                swal("Oops !", sender.msg, "error");
              }
            });
          });
        } else {
          bootbox.hideAll();
          swal("Opps !", send.msg, "error");
        }
      }, 1000);
    });
  });
  $("#jasaTable").on("click", ".trash", function() {
    var ini = $(this);
    swal({
      title: 'Apakah Anda Yakin ?',
      text: "Anda Akan Menghapus Jasa",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya Hapus',
      cancelButtonText: 'Tidak',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Menghapus . .',
          text: 'Tunggu Sebentar',
          timer: 1000,
          onOpen: () => {
            swal.showLoading();
          }
        }).then((result) => {
          var send = post(base_url+"/rest/hapusjasa",{id_jasa:ini.data("id")});
          if(send.status == 1){
            swal("Yeaay !",send.msg,"success").then((result)=>{
              location.reload();
            });
          }else{
            swal("Opps !",send.msg,"error");
          }
        });
      } else if (result.dismiss === 'cancel') {
        swal(
          'Dibatalkan',
          'Permintaaan Anda Di Batalkan',
          'error'
        )
      }
    });
  });

  function post(urls, data) {
    var result = null;
    $.ajax({
      url: urls,
      type: 'post',
      dataType: 'json',
      data: data,
      async: false,
      success: function(data) {
        result = data;
      }
    });
    return result;
  }

  function get(urls) {
    var result = null;
    $.ajax({
      url: urls,
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        result = data;
      }
    });
    return result;
  }
});
