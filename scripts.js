document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Visitor Counter
    const counterElement = document.getElementById('count');
    let count = parseInt(localStorage.getItem('visitorCount')) || 0;
    count += 1;
    localStorage.setItem('visitorCount', count);
    counterElement.innerText = count;

    // Set current year in footer
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.innerText = currentYear;

    // Geolocation with Google Maps
    const locationElement = document.getElementById('location');
    const mapElement = document.getElementById('map');
    let map, marker;

    function initializeMap(lat, lon) {
        const latLng = new google.maps.LatLng(lat, lon);
        map = new google.maps.Map(mapElement, {
            center: latLng,
            zoom: 14,
        });

        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: 'Your Location',
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError);
    } else {
        locationElement.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        locationElement.innerHTML = `Latitude: ${lat}<br>Longitude: ${lon}`;

        if (!map) {
            initializeMap(lat, lon);
        } else {
            const latLng = new google.maps.LatLng(lat, lon);
            map.setCenter(latLng);
            marker.setPosition(latLng);
        }
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                locationElement.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                locationElement.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                locationElement.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                locationElement.innerHTML = "An unknown error occurred.";
                break;
        }
    }
});
