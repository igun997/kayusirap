$(document).ready(function() {
  console.log("Form Order JS Handler");
  initForm();
  initMaps();
  initMapsKirim();
  initRoute();
  var apiKey = "AIzaSyDhPhd40W7v2RXXI90KK-K3IEb1T5d8jSA";
  var map;
  var maps;
  var route;
  var origin = null;
  var dst = {lat:-6.928449,lng:107.616305};
  var merchants = {lat:-6.928449,lng:107.616305};
  var statusDst = "";
  $("#pengiriman").on("change",function(){
    console.log("Pengiriman Changed");
    statusDst = 1;
  });
  function initRoute() {
    route = new GMaps({
      div: "#maps_route",
      lat: -6.9257547,
      lng: 107.6151116,
      zoom: 16
    });
    var getCenter = route.getCenter();
  }

  function initMaps() {
    map = new GMaps({
      div: "#maps_jemput",
      lat: -6.9257547,
      lng: 107.6151116,
      zoom: 16
    });
    var getCenter = map.getCenter();
    map.addMarker({
      lat: getCenter.lat(),
      lng: getCenter.lng(),
      draggable: true,
      dragend: function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var latLng = lat + "," + lng;
        $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng + "&key=" + apiKey, function(a) {
          $("#penjemputan").val(a.results[0].formatted_address);
          $(".cordinate_jemput").val(latLng);
          origin = {lat:lat,lng:lng};
          if(origin != null && dst != null){
            if(statusDst != ""){
              routeMap(origin,dst,merchants);
            }else {
              routeMap(origin,dst);
            }
          }
        });
      },
      title: 'Set Penjemputan',
      infoWindow: {
        content: "Set Penjemputan"
      }
    });

  }

  function initMapsKirim() {
    maps = new GMaps({
      div: "#maps_kirim",
      lat: -6.9257547,
      lng: 107.6151116,
      zoom: 16
    });
    var getCenter = maps.getCenter();
    maps.addMarker({
      lat: getCenter.lat(),
      lng: getCenter.lng(),
      draggable: true,
      dragend: function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var latLng = lat + "," + lng;
        $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng + "&key=" + apiKey, function(a) {
          $("#pengiriman").val(a.results[0].formatted_address);
          $(".cordinate_kirim").val(latLng);
          dst = {lat:lat,lng:lng};
          if(origin != null && dst != null){
            if(statusDst != ""){
              routeMap(origin,dst,merchants);
            }else {
              routeMap(origin,dst);
            }
          }
        });
      },
      title: 'Set Pengiriman',
      infoWindow: {
        content: "Set Pengiriman"
      }
    });

  }

  function initForm() {
    $("#orderItem").attr("data-min", 1);
    var item = $("#orderItem").attr("data-min");
    cekButton(item);
    console.log("Item : " + item);
    var html = "";
    html += '<div class="oItem_1">' + '\n';
    html += '<div class="col-md-6">' + '\n';
    html += '<div class="form-group">' + '\n';
    html += '<label for="jasa_1">Pilih Jasa </label>' + '\n';
    html += '<select class="form-control jasa_1" name="jasa_1">' + '\n';
    var result = getData(base_url + "/rest/selected");
    for (var i = 0; i < result.length; i++) {
      html += "<option value='" + result[i].id_jasa + "'>" + result[i].nama + "</option>" + "\n";
    }
    html += '</select>' + '\n';
    html += '</div>' + '\n';
    html += '</div>' + '\n';
    html += '<div class="col-md-6">' + '\n';
    html += '<label for="banyak_1">Berapa banyak ?</label>' + '\n';
    html += '<input type="number" name="banyak_1" class="form-control banyak_1">' + '\n';
    html += '</div>' + '\n';
    html += '<div class="col-md-12">' + '\n';
    html += '<hr>' + '\n';
    html += '</div>' + '\n';
    html += '</div>' + '\n';
    $("#orderItem").html(html);
  }
  $("#tambahJasa").on("click", function() {
    console.log("Tambah Jasa");
    $("#tambahJasa").attr("disabled", true);
    var item = $("#orderItem").attr("data-min");
    cekButton(item);
    var html = "";
    item = parseInt(item) + 1;
    html += '<div class="oItem_' + item + '">' + '\n';
    html += '<div class="col-md-6">' + '\n';
    html += '<div class="form-group">' + '\n';
    html += '<label for="jasa_' + item + '">Pilih Jasa </label>' + '\n';
    html += '<select class="form-control jasa_' + item + '" name="jasa_' + item + '">' + '\n';
    var result = getData(base_url + "/rest/selected");
    for (var i = 0; i < result.length; i++) {
      html += "<option value='" + result[i].id_jasa + "'>" + result[i].nama + "</option>" + "\n";
    }
    html += '</select>' + '\n';
    html += '</div>' + '\n';
    html += '</div>' + '\n';
    html += '<div class="col-md-6">' + '\n';
    html += '<label for="banyak_' + item + '">Berapa banyak ?</label>' + '\n';
    html += '<input type="number" name="banyak_' + item + '" class="form-control banyak_' + item + '">' + '\n';
    html += '</div>' + '\n';
    html += '<div class="col-md-12">' + '\n';
    html += '<hr>' + '\n';
    html += '</div>' + '\n';
    html += '</div>' + '\n';
    $("#orderItem").append(html);

    console.log("Data " + parseInt(item));
    $("#orderItem").attr("data-min", item);
    $("#tambahJasa").attr("disabled", false);

  });
  $("#kurangiJasa").on("click", function() {
    console.log("Kurangi Jasa");
    var item = $("#orderItem").attr("data-min");
    cekButton(item);
    item = parseInt(item);
    console.log("Item Sekarang : " + item);
    console.log("Remove Item " + item);
    var a = $(".oItem_" + item).remove();
    console.log(a);
    item = item - 1;
    console.log("Item Sekarang : " + item);
    $("#orderItem").attr("data-min", item);
  });
  $("#penjemputan").on("change", function() {
    var addr = $(this).val();
    console.log("Address Di Cari :" + addr);
    GMaps.geocode({
      address: addr,
      callback: function(results, status) {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          map.setCenter(latlng.lat(), latlng.lng());
          map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            draggable: true,
            dragend: function(event) {
              var lat = event.latLng.lat();
              var lng = event.latLng.lng();
              var latLng = lat + "," + lng;
              $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng + "&key=" + apiKey, function(a) {
                $("#penjemputan").val(a.results[0].formatted_address);
                console.log(latLng);
                $(".cordinate_jemput").val(latLng);
                origin = {lat:lat,lng:lng};
                if(origin != null && dst != null){
                  if(statusDst != ""){
                    routeMap(origin,dst,merchants);
                  }else {
                    routeMap(origin,dst);
                  }
                }
              });
            }
          });
          var latLngs = latlng.lat() + "," + latlng.lng();
          $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLngs + "&key=" + apiKey, function(a) {
            $("#penjemputan").val(a.results[0].formatted_address);
            console.log(latLngs);
            $(".cordinate_jemput").val(latLngs);
            origin = {lat:latlng.lat(),lng:latlng.lng()};
            if(origin != null && dst != null){
              if(statusDst != ""){
                console.log("Ubah Origin");
                routeMap(origin,dst,merchants);
              }else {
                console.log("Ubah Origin Set 2");
                routeMap(origin,dst);
              }
            }
          });
        }
      }
    });
  });
  $("#pengiriman").on("change", function() {
    var addr = $(this).val();
    console.log("Address Di Cari :" + addr);
    GMaps.geocode({
      address: addr,
      callback: function(results, status) {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          maps.setCenter(latlng.lat(), latlng.lng());
          maps.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            draggable: true,
            dragend: function(event) {
              var lat = event.latLng.lat();
              var lng = event.latLng.lng();
              var latLng = lat + "," + lng;
              $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng + "&key=" + apiKey, function(a) {
                $("#pengiriman").val(a.results[0].formatted_address);
                $(".cordinate_kirim").val(latLng);
                dst = {lat:lat,lng:lng};
                if(origin != null && dst != null){
                  if(statusDst != ""){
                    routeMap(origin,dst,merchants);
                  }else {
                    routeMap(origin,dst);
                  }
                }
              });
            }
          });
          var latLngs = latlng.lat() + "," + latlng.lng();
          $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLngs + "&key=" + apiKey, function(a) {
            $("#pengiriman").val(a.results[0].formatted_address);
            $(".cordinate_kirim").val(latLngs);
            dst = {lat:latlng.lat(),lng:latlng.lng()};
            if(origin != null && dst != null){
              if(statusDst != ""){
                console.log("Ubah destination");
                routeMap(origin,dst,merchants);
              }else {
                console.log("Ubah destination Set 2");
                routeMap(origin,dst);
              }
            }
          });
        }
      }
    });
  });

  function getData(urls) {
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

  function cekButton(item) {
    $("#kurangiJasa").attr("disabled", true);
    if (parseInt(item) > 1) {
      $("#kurangiJasa").attr("disabled", false);
    }
  }
  function routeMap(origin,dst,merchant=''){
    console.log("Route Started");
    route.cleanRoute();
    route.drawRoute({
      origin: [origin.lat, origin.lng],
      destination: [dst.lat, dst.lng],
      travelMode: 'driving',
      strokeColor: '#131540',
      strokeOpacity: 0.6,
      strokeWeight: 6
    });
    if(merchant != ''){
      route.drawRoute({
        origin: [dst.lat, dst.lng],
        destination: [merchant.lat, merchant.lng],
        travelMode: 'driving',
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });
    }
    route.getRoutes({
      origin: [origin.lat, origin.lng],
      destination: [dst.lat, dst.lng],
      callback: function(e) {
        var time = 0;
        var distance = 0;
        for (var i = 0; i < e[0].legs.length; i++) {
          time += e[0].legs[i].duration.value;
          distance += e[0].legs[i].distance.value;
        }
        $(".jHide").attr("value",(parseFloat(distance)/1000));
      }
    });
    if(merchant != ''){
      route.getRoutes({
        origin: [dst.lat, dst.lng],
        destination: [merchant.lat, merchant.lng],
        callback: function(e) {
          var time = 0;
          var distance = 0;
          for (var i = 0; i < e[0].legs.length; i++) {
            time += e[0].legs[i].duration.value;
            distance += e[0].legs[i].distance.value;
          }
          var jhide = $(".jHide").val();
          $(".jHide").attr("value",(parseFloat(distance)/1000)+parseFloat(jhide));
        }
      });
    }
    route.removeMarkers();
    route.setCenter(origin.lat,origin.lng);
    if(statusDst == ''){
      var pontOrigin = "<b>Point Jemput dan Antar</b>";
      var pointDst = "<b>Merchant Terdekat</b>";
    }else{
      var pointDst = "<b>Point Antar</b>";
      var pontOrigin = "<b>Point Jemput</b>";
    }
    route.addMarker({
      lat: origin.lat,
      lng: origin.lng,
      infoWindow: {
        content: pontOrigin
      }
    });
    route.addMarker({
      lat: dst.lat,
      lng: dst.lng,
      infoWindow: {
        content: pointDst
      }
    });
    if(merchant != ''){
      route.addMarker({
        lat: merchant.lat,
        lng: merchant.lng,
        infoWindow: {
          content: '<b>Merchant Terdekat</b>'
        }
      });
    }
  }
  initInterval();
  function initInterval() {
    var refreshIntervalId = setInterval(hitungRekap, 5000);
  }

  function hitungRekap() {
    console.log("Auto Count");
    var data = $("#orderItem").data().min;
    var f = $("#formOrder").serializeArray();
    var jarak = $(".jHide").val();
    var data_jasa = getDataPost(base_url + "/rest/hitung", f);
    $(".listJasa").html(data_jasa.visual);
    $(".totalBiaya").html(data_jasa.total);

    var html = "";
    var fee = data_jasa.totalHargaKM;
    if(isNaN(fee)){
      fee  = 0;
    }
    html +='<div class="row">';
    html +='<div class="col-md-4">';
    html +='<p>Jarak</p>';
    html +='</div>';
    html +='<div class="col-md-4">';
    html +='<p>Jarak '+jarak+'</p>';
    html +='</div>';
    html +='<div class="col-md-4">';
    html +='<p>Rp. '+fee+'</p>';
    html +='</div>';
    html +='</div>';
    $(".biayaKM").html(html);
    console.log("Log Data");
  }
});
