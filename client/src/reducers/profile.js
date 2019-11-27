

import {GET_REPOS, PROFILE_ERROR, GET_PROFILE, GET_PROFILES, CLEAR_PROFILE, UPDATE_PROFILE} from '../Actions/types'

const initialState = {
    profile: null,
    profiles: [],
    repos:[],
    error: {},
    loading: true,
    
  
   
}

const profile = (state=initialState, action)=>{
    const {type, payload} = action
switch (type) {
    case GET_PROFILE:
        return {
            ...state,
            profile: payload,
            loading: false
        }
        case    GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                loading: false
            }
          case UPDATE_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            }
    case PROFILE_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        }
        case CLEAR_PROFILE:
            return{
              ...state,
              profile: null,
              repos: [],
              loading: false  
            }
           case GET_REPOS:
               return{
                  ...state,
                   repos:payload,
                   loading: false
               }
      
    default:
        return state
}
}

export default profile