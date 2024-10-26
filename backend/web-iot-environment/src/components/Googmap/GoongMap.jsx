import { useEffect, useState } from 'react';
import '@goongmaps/goong-js/dist/goong-js.css';
import '@goongmaps/goong-geocoder/dist/goong-geocoder.css';
import classNames from "classnames/bind";
import styles from "./GoongMap.module.scss";
import setupMap from '../../utils/map/setupMap';
import setupGoongGeocoder from '../../utils/map/setupGoongGeocoder';
// eslint-disable-next-line
import setupGoongClient from '../../utils/map/setupGoongClient';
import { useDispatch } from 'react-redux';
import { setError, setMessageError } from '../../redux/trashCanSlice';
import { setMapp } from '../../redux/mapSlice';

const cx = classNames.bind(styles);

function GoongMap({ trashCans = [], trashCan = [] }) {
    const dispatch = useDispatch();
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const loadMap = async () => {
            try {
                const goongjs = require('@goongmaps/goong-js');
                // eslint-disable-next-line
                const goongSdk = require('@goongmaps/goong-sdk/umd/goong-sdk.js');
                // eslint-disable-next-line
                const polyline = require('@mapbox/polyline');

                goongjs.accessToken = process.env.REACT_APP_GOOG_MAP_TOKEN_KEY;
                const newMap = new goongjs.Map({
                    container: 'map',
                    style: 'https://tiles.goong.io/assets/goong_map_web.json',
                    center: [108.206230, 16.047079],
                    zoom: 12,
                });

                setMap(newMap);
                dispatch(setMapp(newMap));

                newMap.addControl(new goongjs.FullscreenControl());
                newMap.addControl(new goongjs.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }));

                if (trashCans) {
                    newMap.on('load', () => {
                        setIsMapLoaded(true);
                        trashCans?.forEach(trashCan => setupMap(newMap, goongjs, trashCan));
                        //setupGoongClient(newMap, goongSdk, polyline);
                    });
                }

                if (trashCan) {
                    setIsMapLoaded(true);
                    newMap.on('load', () => {
                        setupMap(newMap, goongjs, trashCan);
                    });
                    newMap.flyTo({
                        center: [trashCan.lng, trashCan.lat],
                        essential: true
                    });
                }

            } catch (error) {
                dispatch(setError(true));
                dispatch(setMessageError(error.message));
            }
        };

        loadMap();

        return () => {
            if (map) {
                dispatch(setMapp({}));
                map.remove();
            }
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isMapLoaded) {
            const goongjs = require('@goongmaps/goong-js');
            const GoongGeocoder = require('@goongmaps/goong-geocoder');
            setupGoongGeocoder(map, GoongGeocoder, goongjs, marker, setMarker);
        }
        // eslint-disable-next-line
    }, [isMapLoaded]); // Gọi setupGoongGeocoder khi map đã load hoàn tất



    return (
        <div className={cx("wrapper")}>
            <div id="geocoder" className={cx("search-googmap")}></div>
            <div id="map" className={cx("map")} />
            <pre id="coordinates" className={cx("coordinates")}></pre>
        </div>
    );
}

export default GoongMap;
