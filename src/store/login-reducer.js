const initialState = {
    email: '',
    isAuth: false,
    password: ''
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                email: action.email,
                isAuth: true,
                password: action.password
            };
        default:
            return state;
    }
};

export const setAuthUserData = (email, password) => ({ type: 'SET_USER_DATA', email, password });

export default loginReducer;
