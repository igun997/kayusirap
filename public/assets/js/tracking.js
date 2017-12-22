$(document).ready(function() {
  $("#tracking").on("click", function() {
    console.log("Tracking Scripts");
    var a = $("#trackingForm").serializeArray();
    var dialog = bootbox.dialog({
      title: 'Pelacakan',
      message: '<p align="center"><i class="fa fa-spin fa-spinner"></i> Loading ...</p>'
    });
    dialog.init(function() {
      setTimeout(function() {
        var res = post(base_url + "/rest/tracking", a);
        if (res.status == 1) {
          dialog.find(".modal-title").html("Data #" + res.no_tracking);
          var html = "";
          html += "<div class='row'><div class='col-md-12'>";
          html += "<ul class='list-group'>";
          html += "<li class='list-group-item list-group-item-info' align='center'>";
          if (res.data != null) {
            html += "Tracking Progress Faktur #" + res.no_faktur;
          } else {
            html += "Maaf Untuk Sekarang Belum Ada Progress, Mohon Tunggu 1x24 Jam";
          }
          html += "</li>";
          for (var i = 0; i < (res.data != null)?res.data.length:0; i++) {
            console.log("Tracking Progress " + i);
            html += "<li class='list-group-item list-group-item-default' align='center'>";
            html += "<p><span class='fa fa-check'></span> "+res.data[i].pesan+"</p>";
            html += "<p><span class='fa fa-clock-o'></span> "+res.data[i].tanggal_progress+"</p>";
            html += "</li>";
          }
          if(res.status_barang != 0){
            var sBar = "success";
          }else{
            var sBar = "warning";
          }
          html += "<li class='list-group-item list-group-item-"+sBar+"' align='center'>";
          if (res.status_barang != 0) {
            html += "Completed";
          } else {
            html += "On-Progress";
          }
          html += "</li>";
          html += "</ul>";
          html += "</div></div>";
          dialog.find(".bootbox-body").html(html);
        } else {
          bootbox.hideAll();
          swal({
            title: "Opps !",
            text: res.msg,
            type: "warning"
          })
        }
      }, 1000);
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
});
