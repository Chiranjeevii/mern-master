import axios from "axios";
//Axios is used to communicate with the backend. 
//It is a library which is used to make requests to an API, return data from the API, and then do things with that data in our React application.


const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
            }`;
    }
    return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
// /The code is meant to sign in a user with the token they have stored in local storage.
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post("/tour", tourData);
export const getTours = () => API.get("/tour");
export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData, id) =>
    API.patch(`/tour/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
