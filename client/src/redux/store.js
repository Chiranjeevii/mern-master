import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";

export default configureStore({
    //A store is a state container which holds the application's state. Redux can have only a single store in your application. 
    //Whenever a store is created in Redux, you need to specify the reducer.
    reducer: {
        //Registering authReducer with the key auth
        auth: AuthReducer,
        tour: TourReducer,
        //We will be able to access the state with the value of key auth in our component
    },
});
