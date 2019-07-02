ymaps.ready(init);
var popup = document.querySelector('.popup');
var title = document.querySelector('.popup__title');
var nameInput = document.querySelector('.popup__input-name');
var placeInput = document.querySelector('.popup__input-place');
var reviewText = document.querySelector('#textarea');
var btn = document.querySelector('.add-btn');
var close = document.querySelector('.popup__close');
var reviews = document.querySelector('.reviews__list');
var reviewsStatus = document.querySelector('.not-reviews')

function init(){ 
    var myMap = new ymaps.Map("map", {
        center: [55.78874, 49.12214],
        zoom: 12,
        controls: []
    });
    
    myMap.events.add('click', function (e) {
       popup.style.display = 'block';
        var coords = e.get('coords');

        var myGeocoder = ymaps.geocode(coords);

        myGeocoder.then(function(res) {
            var address = res.geoObjects.get(0).getAddressLine();

            title.textContent = address;

            localStorage[address] = JSON.stringify(coords);
            
            var myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point", 
                    coordinates: coords 
                }
            });

            myMap.geoObjects.add(myGeoObject); 
        });
    });
    
    // function rennderPoints() {
        
    //     for (var key in localStorage) {
    //         var coords = JSON.parse(localStorage[key]);
    
    //         var myGeoObject = new ymaps.GeoObject({
    //             geometry: {
    //                 type: "Point", 
    //                 coordinates: coords 
    //             }
    //         });
    
    //         myMap.geoObjects.add(myGeoObject); 
    //     }
    // };
    
    // rennderPoints();
}

close.addEventListener('click', function close() {
    popup.style.display = 'none';
});

btn.addEventListener('click', function() {
    var nameValue = nameInput.value;
    var placeValue = placeInput.value;
    var textValue = reviewText.value;
    var date = new Date();
    reviewsStatus.style.display = 'none';
    reviews.innerHTML += ` <li class="reviews__item">
                                <div class="review__name"><b>${nameValue}</b><span>${placeValue}</span><span>${date}</span></div>
                                <div class="review__text">${textValue}</div>
                            </li>`;
    nameInput.value = '';
    placeInput.value = '';
    reviewText.value = '';
});
