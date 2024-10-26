import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import mqttSilice from "./mqttSilice";
import deviceSlice from "./deviceSlice";
import trashCanSlice from "./trashCanSlice";
import mapSlice from "./mapSlice";
import userSlice from "./userSlice";



const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({ mqtt: mqttSilice, device: deviceSlice, trashCan: trashCanSlice, map: mapSlice, user: userSlice });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredActionPaths: ['payload'], // Bỏ qua các giá trị không phù hợp trong action
                ignoredPaths: ['map.map', 'mqtt.mqttClient'],
            },
        }),
});

export let persistor = persistStore(store);
