import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Root reducer
const rootReducer = combineReducers({ user: userReducer });

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,  // Use the persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
export const persistor = persistStore(store);
