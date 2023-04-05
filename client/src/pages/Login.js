import React, { useState, useEffect } from "react";
//The useState hook is used for storing variables that are part of your application's state and will change as the user interacts with your website. 
//The useEffect hook allows components to react to lifecycle events such as mounting to the DOM, re-rendering, and unmounting.
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Dispatch is used to send actions into our redux store and is the only way we can affect the store from within a component. 
//A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";

const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    //useSelector() calls selectors on state to get values from auth depending on whether or not there's an error loading or not.
    const { email, password } = formValue;
    const dispatch = useDispatch();
    //useDispatch() uses dispatch to call login when it's invoked
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }));
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const googleSuccess = (resp) => {
        const email = resp?.profileObj?.email;
        const name = resp?.profileObj?.name;
        const token = resp?.tokenId;
        const googleId = resp?.googleId;
        const result = { email, name, token, googleId };
        dispatch(googleSignIn({ result, navigate, toast }));
    };
    const googleFailure = (error) => {
        toast.error(error);
    };
    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "120px",
            }}
        >
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your email"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your password"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {loading && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br />
                    <GoogleLogin
                        clientId="your client id"
                        render={(renderProps) => (
                            <MDBBtn
                                style={{ width: "100%" }}
                                color="danger"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                            </MDBBtn>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account ? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Login;
