import React,{ createContext, useContext, useReducer, useEffect } from "react";
import AuthReducer, {initialState} from './AuthReducer';
// import { reducer,initialState } from './store.reducer';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const localToken = localStorage.getItem('token');
    const localUserId = localStorage.getItem('userId');
    const localUsername = localStorage.getItem('username');
    
    useEffect(() => {    
        console.count('authContext init...')

        if(localToken && localUserId && localUsername){
            initialState.token = JSON.parse(localToken);
            initialState.userId = JSON.parse(localUserId);
            initialState.username = JSON.parse(localUsername);
        }
    }, [localToken])

	console.log('inside auth provider..')
    const [authState, authDispatch] = useReducer(AuthReducer, initialState);

    return <AuthContext.Provider value = {{ authState, authDispatch }}>
        {children}
    </AuthContext.Provider>
}