$(document).ready(function() {
  console.log("Dashboard Pages Scripts");
  console.log("Init Datatables");
  var tabIt = $('#orderTable').dataTable();
  $("#orderTable").on("click", ".hapus", function() {
    var ini = $(this);
    swal({
      title: 'Apakah Anda Yakin ?',
      text: "Anda Akan Membatalkan Pesanan",
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
          title: 'Pembatalan Order . .',
          text: 'Tunggu Sebentar',
          timer: 1000,
          onOpen: () => {
            swal.showLoading();
          }
        }).then((result) => {
          var send = post(base_url + "/rest/hapusorder", {
            no_faktur: ini.data("id")
          });
          if (send.status == 1) {
            swal("Yeaay !", send.msg, "success").then((result) => {
              location.href = base_url + "/admin";
            });
          } else {
            swal("Yeaay !", send.msg, "success");
          }
        });
      } else if (result.dismiss === 'cancel') {
        swal(
          'Dibatalkan',
          'Permintaaan Anda Di Batalkan',
          'error'
        )
      }
    })
  });
  $("#orderTable").on("click", ".verif", function() {
    var ini = $(this);
    var nofaktur = ini.data("id");
    var dialog = bootbox.dialog({
      title: 'Ambil Data',
      message: '<p align="center"><i class="fa fa-spin fa-spinner"></i> Loading ...</p>'
    });
    dialog.init(function() {
      setTimeout(function() {
        var data = post(base_url + "/rest/verif", {
          no_faktur: nofaktur
        });
        if (data.status == 1) {
          dialog.find(".modal-title").html("Bukti Pembayaran Faktur #" + nofaktur);
          var html = "";
          html += "<div class='row'>";
          html += "<div class='col-md-12'>";
          html += "<p>No Rekening : <b>" + data.no_rekening + "</b></p>";
          html += "<p>Jumlah Pembayaran : Rp.<b>" + data.total_harga + "</b></p>";
          html += "<hr>";
          html += "<img src='" + base_url + "/_upload/" + data.img + "' class='img-responsive'></img>";
          html += "<hr>";
          if (data.verif != 1) {
            html += "<button class='btn btn-success' id='verifikasi' type='button'>Verifikasi</button>";
          }
          html += " <button class='btn btn-danger' id='reset' type='button'>Reset</button>";
          html += "</div>";
          html += "</div>";
          dialog.find(".bootbox-body").html(html);
          dialog.find("#verifikasi").on("click", function() {
            var dataVerif = post(base_url + "/rest/verifcheck", {
              no_faktur: nofaktur
            });
            if (dataVerif.status == 1) {
              bootbox.hideAll();
              swal("Yeeay !", dataVerif.msg, "success");
              location.reload();
            } else {
              swal("Opps !", dataVerif.msg, "error");
            }
          });
          dialog.find("#reset").on("click", function() {
            var dataVerif = post(base_url + "/rest/verifreset", {
              no_faktur: nofaktur
            });
            if (dataVerif.status == 1) {
              bootbox.hideAll();
              swal("Yeeay !", dataVerif.msg, "success");
              location.reload();
            } else {
              swal("Opps !", dataVerif.msg, "error");
            }
          });
        } else {
          bootbox.hideAll();
          swal("Opps !", data.msg, "error");
        }
      }, 1000);
    });
  });
  $("#orderTable").on("click", ".edit", function() {
    var ini = $(this);
    var dialog = bootbox.dialog({
      title: 'Ambil Data',
      message: '<p align="center"><i class="fa fa-spin fa-spinner"></i> Loading ...</p>'
    });
    dialog.init(function() {
      setTimeout(function() {
        dialog.find(".modal-title").html("Data #" + ini.data("id"));
        var dataSelect = post(base_url + "/rest/getlevel",{no_faktur:ini.data("id")});
        if (dataSelect.status == 1) {
          var html = '';
          html += '<div class="row">';
          html += '<div class="col-md-12 col-xs-12">';
          html += '<h3>Tambahan Biaya</h3>';
          html += '<form id="formDashboard">';
          html += '<div class="form-group">';
          html += '<input class="form-control" placeholder="Masukan Harga" name="harga"/>';
          html += '</div>';
          html += '<div class="form-group">';
          html += '<input name="no_faktur" value="' + ini.data("id") + '" hidden>';
          html += '<textarea class="form-control" name="keterangan" value="" row="4"></textarea>';
          html += '</div>';
          html += '<div class="form-group">';
          html += '<button type="button" class="btn btn-success" id="sendEdit"><li class="fa fa-save"></li></button>';
          html += '</div>';
          html += '</form>';
          html += '</div">';
          html += '</div">';
          dialog.find(".bootbox-body").html(html);
          dialog.find("#sendEdit").on("click", function() {
            var inis = $("#formDashboard").serializeArray();
            swal({
              title: 'Verifikasi Order . .',
              text: 'Tunggu Sebentar',
              timer: 1000,
              onOpen: () => {
                swal.showLoading();
              }
            }).then((result) => {
              var sender = post(base_url + "/rest/sendedit", inis);
              if (sender.status == 1) {
                bootbox.hideAll();
                swal({
                  title: "Yeaay !",
                  text: sender.msg,
                  type: "success"
                })
              } else {
                swal({
                  title: "Opps !",
                  text: sender.msg,
                  type: "warning"
                })
              }
            });
          });
        } else {
          bootbox.hideAll();
          swal("Oops", dataSelect.msg, "error");
        }
      }, 1000);
    });
  });
  $("#orderTable").on("click", ".view", function() {
    var ini = $(this);
    var dialog = bootbox.dialog({
      title: 'Ambil Data',
      message: '<p align="center"><i class="fa fa-spin fa-spinner"></i> Loading ...</p>'
    });
    dialog.init(function() {
      setTimeout(function() {
        var data = {
          no_faktur: ini.data("id")
        };
        var send = post(base_url + "/rest/view/", data);
        if (send.status == 1) {
          dialog.find(".modal-title").html("Detail Faktur #" + ini.data("id"));
          var html = "";
          var status_bayar = "";
          var status_order = "";
          if (send.status_faktur == 1) {
            status_bayar = '<label class="label label-success">Dibayar</label>';
          } else if (send.status_faktur == 2) {
            status_bayar = '<label class="label label-danger">Canceled</label>';
          } else {
            status_bayar = '<label class="label label-warning">Belum Dibayar</label>';
          }
          if (send.biaya_tambahan.length > 0) {
            status_order = '<label class="label label-success">Verfied</label>';
          } else {
            status_order = '<label class="label label-warning">Unverified</label>';
          }
          html += '<div class="row">';
          html += '<div class="col-md-6 col-xs-12">';
          html += '<h4>Rincian Faktur</h4>';
          html += '<p>No Faktur : <b>' + send.no_faktur + '</b></p>';
          html += '<p>Tanggal Dibuat : <b>' + send.tanggal_buat + '</b></p>';
          html += '<p>Status Pembayaran : ' + status_bayar + '</p>';
          html += '<p>Status Order : ' + status_order + '</p>';
          html += '<p>Total Harga : <b>' + send.total_harga + '</b></p>';
          html += '<p>Jarak : <b>' + send.jarak + ' KM</b></p>';
          html += '<p>Alamat Jemput : <b>' + send.alamat_jemput + ' KM</b></p>';
          html += '<p>Alamat Antar : <b>' + send.alamat_antar + ' KM</b></p>';
          html += '</div>';
          html += '<div class="col-md-6 col-xs-12">';
          html += '<h4>Rincian Jasa</h4>';
          for (var i = 0; i < send.detil_faktur.length; i++) {
            html += '<p>Nama Jasa : <b>' + send.detil_faktur[i].nama + '</b></p>';
            html += '<p>Jumlah : <b>' + send.detil_faktur[i].qty + '</b></p>';
            html += '<p>Subtotal : <b>' + send.detil_faktur[i].subtotal + '</b></p>';
            html += '<hr>';
          }
          html += '</div>';
          if (send.biaya_tambahan.length > 0) {
            html += '<hr>';
            html += '<div class="col-md-12 col-xs-12">';
            html += '<h4>Biaya Tambahan</h4>';
            for (var i = 0; i < send.biaya_tambahan.length; i++) {
              html += '<p>Pesan : <b>' + send.biaya_tambahan[i].keterangan + '</b></p>';
              html += '<p>Harga : Rp. <b>' + send.biaya_tambahan[i].harga + '</b></p>';
              html += '<hr>';
            }
            html += '</div>';
          }
          html += '<div class="col-md-12 col-xs-12">';
          html += '<h4>Rute Perjalanan</h4>';
          html += '<div id="maping">Map</div>';
          html += '</div>';
          html += '</div>';
          dialog.find(".bootbox-body").html(html);
          var lat_merchant = "-6.928449";
          var lng_merchant = "107.616305";
          if (send.lat_kordinat_antar == lat_merchant && lng_merchant == send.lat_kordinat_antar) {
            var pontOrigin = "<b>Point Jemput dan Antar</b>";
            var pointDst = "<b>Merchant Terdekat</b>";
          } else {
            var pointDst = "<b>Point Antar</b>";
            var pontOrigin = "<b>Point Jemput</b>";
          }
          var maps = dialog.find(".bootbox-body");
          maps.ready(function() {
            maps.find("#maping").attr("style", "width:100%;height:400px");
            var origin = {
              lat: send.lat_kordinat_jemput,
              lng: send.lng_kordinat_jemput
            };
            var dst = {
              lat: send.lat_kordinat_antar,
              lng: send.lng_kordinat_antar
            };
            var map;
            map = new GMaps({
              div: "#maping",
              lat: origin.lat,
              lng: origin.lng,
              zoom: 16
            });
            console.log("Route Started");
            map.cleanRoute();
            map.drawRoute({
              origin: [origin.lat, origin.lng],
              destination: [dst.lat, dst.lng],
              travelMode: 'driving',
              strokeColor: '#131540',
              strokeOpacity: 0.6,
              strokeWeight: 6
            });
            if (send.lat_kordinat_antar != lat_merchant && lng_merchant != send.lat_kordinat_antar) {
              map.drawRoute({
                origin: [dst.lat, dst.lng],
                destination: [lat_merchant, lng_merchant],
                travelMode: 'driving',
                strokeColor: '#131540',
                strokeOpacity: 0.6,
                strokeWeight: 6
              });
            }
            map.getRoutes({
              origin: [origin.lat, origin.lng],
              destination: [dst.lat, dst.lng],
              callback: function(e) {
                var time = 0;
                var distance = 0;
                for (var i = 0; i < e[0].legs.length; i++) {
                  time += e[0].legs[i].duration.value;
                  distance += e[0].legs[i].distance.value;
                }
              }
            });
            map.removeMarkers();
            map.setCenter(origin.lat, origin.lng);
            map.addMarker({
              lat: origin.lat,
              lng: origin.lng,
              infoWindow: {
                content: pontOrigin
              }
            });
            map.addMarker({
              lat: dst.lat,
              lng: dst.lng,
              infoWindow: {
                content: pointDst
              }
            });
            if (send.lat_kordinat_antar != lat_merchant && lng_merchant != send.lat_kordinat_antar) {
              map.addMarker({
                lat: lat_merchant,
                lng: lng_merchant,
                infoWindow: {
                  content: '<b>Merchant Terdekat</b>'
                }
              });
            }
          });
        } else {
          bootbox.hideAll();
          swal({
            title: "Opps !",
            text: send.msg,
            type: "warning"
          })
        }
      }, 1000);
    });
  });

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
});
