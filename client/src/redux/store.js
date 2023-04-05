import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";

export default configureStore({
    //A store is a state container which holds the application's state. Redux can have only a single store in your application. 
    //Whenever a store is created in Redux, you need to specify the reducer.
    reducer: {
        auth: AuthReducer,
        tour: TourReducer,
    },
});
