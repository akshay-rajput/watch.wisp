
const actionTypes = {
    login: 'LOGIN',
    logout: "LOGOUT"
}

export const initialState = {
        userId: '',
        username: '',
        token: null,
}

const AuthReducer = (state, action) => {
    
    const {type, payload} = action;
    // console.log('action is: ', action);

    console.log('inside reducer:', type);

    switch (type) {
        case actionTypes.login:
            return {
                ...state,
                userId: payload.id,
                username: payload.name,
                token: payload.id
            }
        
        case actionTypes.logout:
            console.log('logoutAction..')
            localStorage.setItem('userId', null);
            localStorage.setItem('username', null);
            localStorage.setItem('token', null);

            return {
                ...state,
                userId: "",
                username: "",
                token: null
            }

        default:
            return state
    }
}

export default AuthReducer;