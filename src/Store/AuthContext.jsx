import React,{ createContext, useContext, useReducer, useEffect } from "react";
import AuthReducer, {initialState} from './AuthReducer';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import { reducer,initialState } from './store.reducer';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

// request interceptor
function setupAuthHeader() {
    axios.interceptors.request.use(function(config) {
        const token = JSON.parse(localStorage.getItem('token'));

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    function(err) {
        console.log('general request rejected', err.response.status)
        return Promise.reject(err);
    }
);}

// interceptor to handle 401s
function handleUnauthorizedResponse(navigate,authDispatch) {

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
            console.log("unauthorized route")
            // dispatch to change state as well
            authDispatch({
                type: 'LOGOUT',
            })
            navigate("/login");
        }
        return Promise.reject(error);
      }
    );
}

export function AuthProvider({children}) {
    const [authState, authDispatch] = useReducer(AuthReducer, initialState);

    const navigate = useNavigate();

    const localToken = JSON.parse(localStorage.getItem('token'));
    const localUserId = JSON.parse(localStorage.getItem('userId'));
    const localUsername = JSON.parse(localStorage.getItem('username'));
    const localAvatar = JSON.parse(localStorage.getItem('userAvatar'));

    // async function loginUser(userData){
    //     await authDispatch({
    //         type: 'LOGIN',
    //         payload: userData
    //     });
    //     console.log('dispatched...');
    // }

    useEffect(() => {    
        // console.log('authContext init... localtoken changed >', localToken);
        // add auth header
        if(localToken && localUserId && localUsername){
            initialState.token = localToken;
            initialState.userId = localUserId;
            initialState.username = localUsername;
            initialState.userAvatar = localAvatar;

            let userData = {
                id: localUserId,
                name: localUsername,
                token: localToken,
                avatarUrl: localAvatar
            }
            // console.log('call login from context: ', userData);
            // dispatch to change state as well
            authDispatch({
                type: 'LOGIN',
                payload: userData
            });
            // loginUser(userData);

            // setupAuthHeader(localToken);
        }
        setupAuthHeader();
        handleUnauthorizedResponse(navigate, authDispatch);

    }, [localToken])

	// console.log('inside auth provider..')

    return <AuthContext.Provider value = {{ authState, authDispatch }}>
        {children}
    </AuthContext.Provider>
}