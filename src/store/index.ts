import { configureStore } from "@reduxjs/toolkit";
import { pixabayApi } from "./api/pixabayApi";
import authReducer from "./authSlice";
import bookmarkreducer from "./bookmarkSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [pixabayApi.reducerPath]: pixabayApi.reducer,
        bookmark: bookmarkreducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(pixabayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
