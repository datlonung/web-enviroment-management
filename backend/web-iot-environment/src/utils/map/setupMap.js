import images from "../../assets/images";
import TrashChildren from "../../components/trashChildren/TrashChildren";
import ReactDOMServer from 'react-dom/server';


const setupMap = (map, goongjs, trashCan) => {
    const row = document.getElementById(`row-${trashCan._id}`);
    const htmlString = ReactDOMServer.renderToString(
        <TrashChildren name={trashCan.name} trashChildren={trashCan.trash_child} />
    );
    const imageName = 'custom-marker-' + trashCan._id;

    if (!map.hasImage(imageName)) {
        const image = trashCan?.image;
        const image_thumbnail = image?.image_thumnail ? image.image_thumnail : "https://firebasestorage.googleapis.com/v0/b/environmental-6719a.appspot.com/o/trasncan1.png?alt=media&token=a1bb2837-a3ae-4bb8-a7ce-f2c14214fd0a"

        map.loadImage(image_thumbnail, (error, image) => {
            if (error) throw error;

            map.addImage(imageName, image);

            const sourceId = 'places-' + trashCan._id;
            const layerId = 'places-' + trashCan._id;

            if (!map.getSource(sourceId)) {
                map.addSource(sourceId, {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'properties': {
                                    'description': htmlString,
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [trashCan.lng, trashCan.lat]
                                }
                            }
                        ]
                    }
                });
            }

            map.on('click', sourceId, (e) => handlePopupClick(e, row, goongjs, map));
            map.on('mouseenter', sourceId, () => map.getCanvas().style.cursor = 'pointer');
            map.on('mouseleave', sourceId, () => map.getCanvas().style.cursor = '');

            map.addLayer({
                'id': layerId,
                'type': 'symbol',
                'source': sourceId,
                'layout': {
                    'icon-image': imageName,
                    'icon-size': image_thumbnail === images.noImgae ? 0.2 : 0.1,
                    'icon-allow-overlap': true
                }
            });
        });
    } else {
        console.log(`Image ${imageName} already exists. Skipping image load.`);
    }
};

const handlePopupClick = (e, row, goongjs, map) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const popup = new goongjs.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);

    if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'start' });
        row.style.borderBottom = "1px solid #67B758";
    };

    popup.on('close', () => {
        if (row) {
            row.style.border = "inherit";
        }
    });
};


export default setupMap;