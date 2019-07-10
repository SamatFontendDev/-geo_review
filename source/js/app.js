ymaps.ready(init);
var popup = document.querySelector('.popup');
var title = document.querySelector('.popup__title');
var nameInput = document.querySelector('.popup__input-name');
var placeInput = document.querySelector('.popup__input-place');
var reviewText = document.querySelector('#textarea');
var btn = document.querySelector('.add-btn');
var close = document.querySelector('.popup__close');
var reviews = document.querySelector('.reviews__list');
var reviewsStatus = document.querySelector('.not-reviews');
function formatDate (date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
}

function renderReview (name, place, date, text, address, titleReview) {
    titleReview.textContent = address;
    reviews.innerHTML +=    `<li class="reviews__item">
                                <div class="review__name"><b>${name}</b><span>${place}</span><span>${date}</span></div>
                                <div class="review__text">${text}</div>
                            </li>`;
}

function init(){ 
    var myMap = new ymaps.Map("map", {
        center: [55.78874, 49.12214],
        zoom: 12,
        controls: []
    });

    var arrMarks = [];

    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class=ballon_header>{{ properties.balloonContentHeader|raw }}</div>' +
        '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'+
        '<span class="ballon-date">{{ properties.balloonContentDate|raw }}</span>'
    );

    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    });

    

    myMap.geoObjects.add(clusterer);
    
    myMap.events.add('click', function (e) {
        popup.style.display = 'block';

        var coords = e.get('coords');
        
        reviews.innerHTML = '';

        var myGeocoder = ymaps.geocode(coords);

        myGeocoder.then(function(res) {
            var address = res.geoObjects.get(0).getAddressLine();

            title.textContent = address;
            
            btn.onclick = function() {
                var nameValue = nameInput.value;
                var placeValue = placeInput.value;
                var textValue = reviewText.value;
                var d = new Date();
                var date = formatDate(d);

                reviewsStatus.style.display = 'none';
                
                reviews.innerHTML +=    `<li class="reviews__item">
                                            <div class="review__name"><b>${nameValue}</b><span>${placeValue}</span><span>${date}</span></div>
                                            <div class="review__text">${textValue}</div>
                                        </li>`;
                
                var markObj = {
                    coords,
                    address,
                    review: {
                        nameValue,
                        placeValue,
                        textValue
                    }
                }

                arrMarks.push(markObj);
                console.log(arrMarks);
                nameInput.value = '';
                placeInput.value = '';
                reviewText.value = '';

                var placemark = new ymaps.Placemark(coords, {
                    balloonContentHeader: placeValue,
                    balloonContentBody: address,
                    balloonContentFooter: textValue,
                    balloonContentDate: date
                });

                placemark.events.add('click', function (e) {
                    var markCoords = e.get('coords');
                    
                    for (var i = 0; i < arrMarks.length; i++) {
                        if (arrMarks[i].coords === markCoords) {
                            renderReview (arrMarks[i].nameValue,
                                        arrMarks[i].placeValue,
                                        arrMarks[i].date,
                                        arrMarks[i].textValue,
                                        arrMarks[i].address, 
                                        title);
                        }
                    }

                    e.preventDefault();
                   
                    popup.style.display = 'block';
                });    

                clusterer.add(placemark);
            };
             
        });
    });
}
close.addEventListener('click', function close() {
    popup.style.display = 'none';
});
