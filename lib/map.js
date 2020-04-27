var comboboxVN200 = {
  LCa: 'Lai Châu',
  ĐB: 'Điện Biên',
  LC: 'Lào Cai',
  SL: 'Sơn La',
  YB: 'Yên Bái',
  HG: 'Hà Giang',
  TQ: 'Tuyên Quang',
  PT: 'Phú Thọ',
  VP: 'Vĩnh Phúc',
  CB: 'Cao Bằng',
  LS: 'Lạng Sơn',
  BC: 'Bắc Cạn',
  TN: 'Thái Nguyên',
  BG: 'Bắc Giang',
  BN: 'Bắc Ninh',
  QNi: 'Quảng Ninh',
  HP: 'TP Hải Phòng',
  HD: 'Hải Dương',
  HY: 'Hưng Yên',
  HN: 'TP Hà Nội',
  HB: 'Hoà Bình',
  HNa: 'Hà Nam',
  NĐ: 'Nam Định',
  TB: 'Thái Bình',
  NB: 'Ninh Bình',
  TH: 'Thanh Hoá',
  NA: ' Nghệ An',
  HT: 'Hà Tĩnh',
  QB: 'Quảng Bình',
  QT: 'Quảng Trị',
  TTH: 'Thừa Thiên Huế',
  ĐN: 'Đà Nẵng',
  QN: 'Quảng Nam',
  Qng: 'Quảng Ngãi',
  BĐ: 'Bình Định',
  KT: 'Kon Tum',
  GL: 'Gia Laik',
  ĐLa: 'Đak Lak',
  ĐNo: 'Đak Nông',
  PY: 'Phú Yên',
  KH: 'Khánh Hoà',
  NT: 'Ninh Thuận',
  BT: 'Bình Thuận',
  LĐ: 'Lâm Đồng',
  BD: 'Bình Dương',
  BP: 'Bình Phước',
  ĐNa: 'Đồng Nai',
  BRVT: 'Bà Rịa Vũng Tàu',
  TNi: 'Tây Ninh',
  LA: 'Long An',
  TG: 'Tiền Giang',
  BT: 'Bến Tre',
  ĐT: 'Đồng Tháp',
  VL: 'Vĩnh Long',
  TV: 'Trà Vinh',
  AG: 'An Giang',
  KG: 'Kiên Giang',
  CT: 'TP. Cần Thơ',
  HG: 'Hậu Giang',
  ST: 'Sóc Trăng',
  BL: 'Bạc Liêu',
  CM: 'Cà Mau',
  HCM: 'TP Hồ Chí Minh'
};

function getLongitude(idlongItude) {
  switch (idlongItude) {
    case 'LCa':
    case 'ĐB':
      return '103.00';
    case 'LC':
    case 'PT':
    case 'NA':
    case 'AG':
      return '104.45';
    case 'KG':
      return '104.50';
    case 'CM':
      return '104.30';
    case 'SL':
    case 'YB':
      return '104.00';
    case 'VP':
    case 'HN':
    case 'HNa':
    case 'NB':
    case 'TH':
    case 'ĐT':
    case 'CT':
    case 'HG':
    case 'BL':
      return '105.00';
    case 'HG':
    case 'BN':
    case 'HD':
    case 'HY':
    case 'NĐ':
    case 'TB':
    case 'HT':
    case 'TNi':
    case 'VL':
    case 'TV':
    case 'ST':
      return '105.30';
    case 'BD':
    case 'BT':
    case 'HCM':
      return '105.45';
    case 'TQ':
    case 'HB':
    case 'QB':
      return '106.00';
    case 'QT':
    case 'BP':
      return '106.15';
    case 'CB':
    case 'HP':
    case 'LA':
    case 'TG':
      return '105.45';
    case 'LS':
      return '107.15';
    case 'BC':
    case 'TN':
      return '106.30';
    case 'BG':
    case 'TTH':
      return '107.00';
    case 'QNi':
    case 'ĐN':
    case 'QN':
    case 'LĐ':
    case 'ĐNa':
    case 'BRVT':
      return '107.45';
    case 'KT':
      return '107.30';
    case 'Qng':
      return '108.00';
    case 'BĐ':
    case 'KH':
    case 'NT':
      return '108.15';
    case 'GL':
    case 'ĐLa':
    case 'ĐNo':
    case 'PY':
    case 'BT':
      return '108.30';
  }
}

function setProjection(valueLongitude) {
  return `+proj=tmerc +lat_0=0 +lon_0=${valueLongitude} +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,0.00928836,-0.01975479,0.00427372,0.252906278 +units=m +no_defs`;
}

function initMap() {
  var polygon;
  // var firstProjection = `+proj=tmerc +lat_0=0 +lon_0=104.5 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,0.00928836,-0.01975479,0.00427372,0.252906278 +units=m +no_defs`;
  var secondProjection = `+proj=longlat +datum=WGS84  +ellps=WGS84 +no_defs`;

  function renderMap() {
    let stringCoordinateVn2000 = $('#textCoordinate').val();
    let selectLongitude = $('#selectLongitude').val();
    console.log(selectLongitude);

    let valueLongitude = getLongitude(selectLongitude);
    let firstProjection = setProjection(valueLongitude);
    if (!stringCoordinateVn2000) {
      alert('Coordinate is empty');
      return;
    }
    console.log(valueLongitude);

    var arrCoordinateVN200 = stringCoordinateVn2000.split('\n');

    const arrLocation = arrCoordinateVN200.map(value => {
      const coordinate = value.trim().split(',');

      const location = proj4(firstProjection, secondProjection).forward([
        Number(coordinate[1]),
        Number(coordinate[0])
      ]);
      if (valid_coords(location[1], location[0])) {
      }
      return { lat: location[1], lng: location[0] };
    });

    let center = arrLocation.reduce(
      (initCenter, value) => {
        return {
          lat: initCenter.lat + value.lat,
          lng: initCenter.lng + value.lng
        };
      },
      { lat: 0, lng: 0 }
    );

    center = {
      lat: center.lat / arrLocation.length,
      lng: center.lng / arrLocation.length
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: { lat: center.lat, lng: center.lng },
      mapTypeId: 'terrain'
    });

    const arrCoords = arrLocation.map(value => {
      return new google.maps.LatLng(value.lat, value.lng);
    });

    polygon = new google.maps.Polygon({
      editable: true,
      paths: arrCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      draggable: true,
      geodesic: true
    });
  }

  function getPathArea() {
    var len = polygon.getPath().getLength();
    for (var i = 0; i < len; i++) {
      var path = polygon
        .getPath()
        .getAt(i)
        .toUrlValue(6);

      console.log(path);
    }
  }

  function isNumber(string) {
    return isNaN(string);
  }

  function inrange(min, number, max) {
    if (!isNaN(number) && number >= min && number <= max) {
      return true;
    } else {
      return false;
    }
  }
  function valid_coords(number_lat, number_lng) {
    return inrange(-90, number_lat, 90) && inrange(-180, number_lng, 180);
  }

  function preCreateMap() {
    polygon = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: 10.2236515728, lng: 105.2247904053 },
      mapTypeId: 'terrain'
    });
    $('#btnRenderMap').click(renderMap);
    $('#btnGetLocation').click(getPathArea);
    $('#btnMyLocation').click(getLocation);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(renderLocation);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  function renderLocation(position) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
      mapTypeId: 'terrain'
    });

    var marker = new google.maps.Marker({
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      map: map,
      title: 'Hello World!'
    });
  }

  return preCreateMap();
}

// function initMap() {
//   // var map = new google.maps.Map(document.getElementById('map'), {
//   //   zoom: 1,
//   //   center: { lat: 24.886, lng: -70.268 },
//   //   mapTypeId: 'terrain'
//   // });

//   var firstProjection = `+proj=tmerc +lat_0=0 +lon_0=105.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,0.00928836,-0.01975479,0.00427372,0.252906278 +units=m +no_defs`;
//   var secondProjection = `+proj=longlat +datum=WGS84  +ellps=WGS84 +no_defs`;
//   // let sourceProj = proj4.defs('VN2000-UTM48N');
//   // let targetProj = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ';

//   //I'm not going to redefine those two in latter examples.
//   // console.log(
//   //   proj4(firstProjection, secondProjection).forward([442156.06, 1130638.62])
//   // );
//   // const location = proj4(firstProjection, secondProjection).forward([
//   //   446873.37,
//   //   1111884.1
//   // ]);
//   //[10.2236515728, 105.2247904053]
//   // [-2690666.2977344505, 3662659.885459918]
//   // console.log(document.getElementById('map'));
//   new google.maps.Map(document.getElementById('map'), {
//     zoom: 15,
//     center: { lat: location[1], lng: location[0] },
//     mapTypeId: 'terrain'
//   });
// }

// function renderMap() {
//   var firstProjection = `+proj=tmerc +lat_0=0 +lon_0=105.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,0.00928836,-0.01975479,0.00427372,0.252906278 +units=m +no_defs`;
//   var secondProjection = `+proj=longlat +datum=WGS84  +ellps=WGS84 +no_defs`;

//   var arrCoordinateVN200 = $('#textCoordinate')
//     .val()
//     .split('\n');
//   console.log(arrCoordinateVN200);
//   const arrLocation = arrCoordinateVN200.map(value => {
//     const coordinate = value.trim().split(',');
//     console.log(coordinate);
//     const location = proj4(firstProjection, secondProjection).forward([
//       Number(coordinate[0]),
//       Number(coordinate[1])
//     ]);
//     return { lat: location[1], lng: location[0] };
//   });
//   console.log(arrLocation);
//   // const arrLatLon = [
//   //   {
//   //     lat: 51.474821,
//   //     lng: -0.001935
//   //   },
//   //   {
//   //     lat: 51.474647,
//   //     lng: 0.003966
//   //   },
//   //   {
//   //     lat: 51.477708,
//   //     lng: 0.004073
//   //   },
//   //   {
//   //     lat: 51.479753,
//   //     lng: 0.000468
//   //   },
//   //   {
//   //     lat: 51.477654,
//   //     lng: -0.002192
//   //   }
//   // ];

//   let center = arrLocation.reduce(
//     (initCenter, value) => {
//       return {
//         lat: initCenter.lat + value.lat,
//         lng: initCenter.lng + value.lng
//       };
//     },
//     { lat: 0, lng: 0 }
//   );

//   center = {
//     lat: center.lat / arrLocation.length,
//     lng: center.lng / arrLocation.length
//   };

//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 15,
//     center: { lat: center.lat, lng: center.lng },
//     mapTypeId: 'terrain'
//   });

//   const arrCoords = arrLocation.map(value => {
//     return new google.maps.LatLng(value.lat, value.lng);
//   });

//   polygon = new google.maps.Polygon({
//     editable: true,
//     paths: arrCoords,
//     strokeColor: '#FF0000',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#FF0000',
//     fillOpacity: 0.35,
//     map: map,
//     draggable: true,
//     geodesic: true
//   });
// }

// function getArrCoordinateNV200() {
//   return $('#textCoordinate')
//     .val()
//     .split('\n');
// }

// function getPathArea() {
//   var len = polygon.getPath().getLength();
//   for (var i = 0; i < len; i++) {
//     var path = polygon
//       .getPath()
//       .getAt(i)
//       .toUrlValue(6);

//     console.log(path);
//   }
// }
