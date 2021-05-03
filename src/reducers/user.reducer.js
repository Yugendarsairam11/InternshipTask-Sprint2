export const UserReducer = (state ={}, action) => {
    switch(action.type){
        case "REGISTERUSER":
            return({isUserRegister:action.result})
            // console.log("from reducer",action.result)
        case "USERLOGIN" :
            console.log("in user login case from reducer",action.passwordresult,action.emailresult)
            return({passwordresult:action.passwordresult,emailresult:action.emailresult})

        case "update":
            return({isPasswordUpdate:action.result})
        case "lead":
            return({isLeadAdded:action.result}) 
        case "delete":
            return({isLeadDelete:action.result})     
        case "updated":
            return({isLeadUpdated:action.result})
        case "profileupdate":
            return({isProfileUpdated:action.result})    
        default:
            return state;  

    }
}