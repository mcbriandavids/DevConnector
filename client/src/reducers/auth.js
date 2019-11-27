import
{

    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_OUT,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
    
} from '../Actions/types'


const initialState = {
    token: localStorage.getItem( 'token' ),
    isAuthenticated: null,
    loading: true,
    user: null
    
    
}
const auth =(state=initialState, action)=>{
    const { type, payload } = action
    
    
    switch ( type ) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
                
            localStorage.setItem( 'token', payload.token )
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            case ACCOUNT_DELETED:
            case LOGIN_OUT:
            localStorage.removeItem( 'token' )
            return {
                ...state,
                token:null,
               isAuthenticated: false,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state
        
    }
}



export default auth;