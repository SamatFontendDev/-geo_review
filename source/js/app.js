ymaps.ready(init);

function init(){ 
    // Создание карты.    
    var myMap = new ymaps.Map("map", {
        center: [55.78874, 49.12214],
        zoom: 12
    });
    
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        var myGeocoder = ymaps.geocode(coords);

        myGeocoder.then(function(res) {
            console.log(res.geoObjects.get(0).getAddressLine());
        });
    });
}