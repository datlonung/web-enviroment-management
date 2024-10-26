import { useEffect } from "react";
import mqtt from "mqtt";
import { useDispatch } from "react-redux";
import { setConnected, setConnecting, setDisconnected, setError, setMessage, setMqttClient, setSubscribed } from "../redux/mqttSilice";
import { setDeviceConnected, setLevelGauges, setMacAddress, setMacAddressToAddDevice, setStatus, setTrashLevelPresent, setVirtual } from "../redux/deviceSlice";


const useMqttEffects = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const host = process.env.REACT_APP_MQTT_BROKER_HOST
        const mqttOptions = {
            username: process.env.REACT_APP_MQTT_BROKER_USERNAME,
            password: process.env.REACT_APP_MQTT_BROKER_PASSWORD
        }

        const connectMqtt = () => {
            dispatch(setConnecting(true))
            const mqttClient = mqtt.connect(host, mqttOptions);
            mqttClient.on('connect', () => {
                dispatch(setConnected(true))
                dispatch(setConnecting(false))
                dispatch(setMqttClient(mqttClient));
                mqttClient.on('message', async (topic, message) => {
                    const data = JSON.parse(message.toString());
                    switch (topic) {
                        case 'connect':
                            dispatch(setMacAddressToAddDevice(data.mac_a))
                            dispatch(setMacAddress(data.mac_a))
                            dispatch(setDeviceConnected(true))
                            dispatch(setVirtual(false))
                            break;
                        case 'distance':
                            dispatch(setMacAddressToAddDevice(data.mac_a))
                            dispatch(setMacAddress(data.mac_a))
                            dispatch(setLevelGauges(data.distance))
                            break;
                        case 'location':
                            // improve later
                            break;
                        case 'device_virtual_data':
                            dispatch(setMacAddressToAddDevice(data.mac_a))
                            dispatch(setMacAddress(data.mac_a))
                            dispatch(setLevelGauges(data.distance))
                            dispatch(setTrashLevelPresent(data.trash_level_present))
                            dispatch(setVirtual(data.virtual))
                            dispatch(setStatus(data.status))
                            break;
                        case 'trash_level_present':
                            dispatch(setMacAddressToAddDevice(data.mac_a))
                            dispatch(setMacAddress(data.mac_a))
                            dispatch(setTrashLevelPresent(data.trash_level_present))
                            dispatch(setStatus(data.status))
                            dispatch(setVirtual(false))
                            break;
                        default:
                            console.log('Unknown topic:', topic);
                            break;
                    }
                });

                mqttClient.subscribe(['connect', 'distance', 'location', 'device_virtual_data', 'trash_level_present'], (err) => {
                    if (err) {
                        dispatch(setSubscribed({ error: err, subscribed: false }))
                    } else {
                        dispatch(setSubscribed({ error: false, subscribed: true }))
                    }
                });

            });

            mqttClient.on('reconnecting', () => {
                dispatch(setConnecting(true))
                dispatch(setConnected(false))
            });

            mqttClient.on('error', (error) => {
                dispatch(setConnecting(false))
                dispatch(setConnected(false))
                dispatch(setDisconnected(true))
                dispatch(setError(true))
                dispatch(setMessage({ error: error }))
            });

            return () => {
                mqttClient.end(); // Close MQTT connection when component unmounts
            };
        }
        connectMqtt();
        // eslint-disable-next-line
    }, []);
};

export default useMqttEffects;
