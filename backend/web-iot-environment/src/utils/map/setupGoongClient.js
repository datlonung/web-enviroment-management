const setupGoongClient = (map, goongSdk, polyline) => {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    // Initialize goongClient with an API KEY
    const goongClient = goongSdk({
        accessToken: process.env.REACT_APP_GOOG_MAP_SDK_KEY
    });

    // Get Directions
    goongClient.directions
        .getDirections({
            origin: '16.026769792566206, 108.2223514955645',
            destination: '16.069893523186835, 108.193465',
            vehicle: 'bike'
        })
        .send()
        .then(function (response) {
            var directions = response.body;
            var route = directions.routes[0];

            var geometry_string = route.overview_polyline.points;
            var geoJSON = polyline.toGeoJSON(geometry_string);
            map.addSource('route', {
                'type': 'geojson',
                'data': geoJSON
            });

            // Add route layer below symbol layers
            map.addLayer(
                {
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#1e88e5',
                        'line-width': 8
                    }
                },
                firstSymbolId
            );
        });
}

export default setupGoongClient;