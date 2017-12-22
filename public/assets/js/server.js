$(document).ready(function() {
  console.log("Validate Email");

  function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }
  console.log("Logout Scripts");
  $("#logoutBtn").on("click", function() {
    $.get(base_url + "/rest/Logout", function(a) {
      if (a.status == 1) {
        swal({
          title: "Yeaay!",
          text: a.msg,
          type: "success"
        }).then((result) => {
          window.location = base_url;
        });
      } else {
        swal({
          title: "Shitt !",
          text: "Logout Gagal ! Tolong Kontak Kami",
          type: "error"
        });
      }
    });
  });
  console.log("Custom Scripts");
  $("#send").on('click', function() {
    var a = $('#sendMessage').serializeArray();
    $(this).attr("disabled", true);
    if (validateEmail($("#email").val())) {
      $.post(base_url + "/rest/contact", a, function(e) {
        if (e["status"] == 1) {
          $("#sendMessage")[0].reset();
          swal("Yeaay!", e.msg, "success");
        } else {
          swal("Oops!", e.msg, "error");
        }
      }).fail(function() {
        swal("Oops!", "Sepertinya Ada Kesalahan, Cek Koneksi Internet Kamu ", "error");
      });
    } else {
      swal("Oops!", "Masukan Email Yang Benar !", "error");
    }

    $(this).attr("disabled", false);
  });
  console.log("Login Scripts");
  $("#sendLogin").on('click', function() {
    var a = $('#loginForm').serializeArray();
    $(this).attr("disabled", true);
    swal({
      title: 'Login In . .',
      text: 'Tunggu Sebentar',
      timer: 1000,
      onOpen: () => {
        swal.showLoading();
      }
    }).then((result) => {
      if (result.dismiss === 'timer') {
        $.post(base_url + "/rest/login", a, function(e) {
          if (e["status"] == 1) {
            $("#loginForm")[0].reset();
            swal.close();
            swal({
              title: "Yeaay!",
              text: e.msg,
              type: "success"
            }).then((result) => {
              window.location = base_url;
            });
          } else if (e["status"] == 2) {
            $("#loginForm")[0].reset();
            swal.close();
            swal({
              title: "Selamat Datang",
              text: e.msg,
              type: "success"
            }).then((result) => {
              window.location = base_url + "/admin";
            });
          } else {
            swal.close();
            swal("Oops!", e.msg, "error");
          }
        }).fail(function() {
          swal("Oops!", "Cek Kondisi Internet Kamu", "error");
        });
      }
    });
    $(this).attr("disabled", false);
  });
  $("#sendRegister").on('click', function() {
    var a = $('#registerForm').serializeArray();
    $(this).attr("disabled", true);
    if (validateEmail($("#email").val())) {
      swal({
        title: 'Register . .',
        text: 'Tunggu Sebentar',
        timer: 1000,
        onOpen: () => {
          swal.showLoading();
        }
      }).then((result) => {
        $.post(base_url + "/rest/register", a, function(e) {
          console.log(a);
          if (e["status"] == 1) {
            $("#registerForm")[0].reset();
            swal({
              title: "Yeaay!",
              text: e.msg,
              type: "success"
            }).then((result) => {
              window.location = base_url + "/login";
            });
          } else {
            swal("Oops!", e.msg, "error");
          }
        }).fail(function() {
          swal("Oops!", "Cek Kondisi Internet Kamu", "error");
        });
      })
    } else {
      swal("Oops!", "Cek Email Kamu", "error");
    }
    $(this).attr("disabled", false);
  });

  function getDataPost(urls, datas) {
    var result = null;
    $.ajax({
      url: urls,
      type: 'post',
      dataType: 'json',
      data: datas,
      async: false,
      success: function(data) {
        result = data;
      }
    });
    return result;
  }
  $("#sendOrder").on("click", function() {
    console.log("= Save Order =");
    var a = $('#formOrder').serializeArray();
    swal({
      title: 'Loading . .',
      text: 'Tunggu Sebentar',
      timer: 2000,
      onOpen: () => {
        swal.showLoading();
      }
    }).then((result) => {
      var data = getDataPost(base_url + "/rest/order/", a);
      if (data.status == true) {
        swal.close();
        swal({
          title: "Yeaay!",
          text: data.msg,
          type: "success"
        }).then((result) => {
          window.location = base_url + "/history";
        });
      } else {
        swal.close();
        swal({
          title: "Opps!",
          text: data.msg,
          type: "error"
        });
      }
    });
  });
})
