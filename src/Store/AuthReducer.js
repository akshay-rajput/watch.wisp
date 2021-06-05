
const actionTypes = {
    login: 'LOGIN',
    logout: "LOGOUT",
    updateUsername: 'UPDATE_USERNAME'
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

        case actionTypes.updateUsername:
            let updatedName = `"${payload.name}"`;
            console.log("change username: ", payload.name)
            localStorage.setItem('username', updatedName);

            return {
                ...state,
                username: payload.name,
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