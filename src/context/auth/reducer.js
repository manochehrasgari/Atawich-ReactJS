

export const initialState = {
    users : null,
    user : null ,
    token : null ,
    error : ''
}

export const reducer = (state,action)=>{

    switch (action.type) {
        
        case "SET_USERS" : 
                return {
                    ...state,
                    users : action.payload
                }
        case "LOGIN_SUCCESS":
            const { user, token } = action.payload
            return {
                ...state,
                // users : [...oldUsers],
                user : user ,
                token : token,
                error : null
            }
            case "LOGIN_ERROR":
                return {
                    ...state,
                    user : null,
                    token: null,
                    error: action.payload.error
                }
            case "LOGOUT":
                return {
                    ...state,
                    user: null,
                    token: null,
                    error: null
                }
            default:
                throw Error(`action type not allowed: ${action.type}`)
        }   
    
        
    }




