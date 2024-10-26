const setupGoongGeocoder = (map, GoongGeocoder, goongjs, marker, setMarker) => {
    const geocoder = new GoongGeocoder({
        accessToken: process.env.REACT_APP_GOOG_MAP_GEOCODER_KEY
    });

    geocoder.addTo('#geocoder');

    geocoder.on('result', async (e) => {
        const lat = e.result.result.geometry.location.lat;
        const lng = e.result.result.geometry.location.lng;

        map.flyTo({ center: [lng, lat], zoom: 15 });

        if (marker) {
            marker.remove();
        }
        const coordinates = document.getElementById('coordinates');
        const newMarker = new goongjs.Marker({ draggable: true }).setLngLat([lng, lat]).addTo(map);
        function onDragEnd() {
            var lngLat = newMarker.getLngLat();
            coordinates.style.display = 'block';
            coordinates.innerHTML =
                'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        }

        newMarker.on('dragend', onDragEnd);
        setMarker(newMarker);
    });



}

export default setupGoongGeocoder;