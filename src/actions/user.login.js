import axios from "axios"

export const userLogin=(userData)=>async(dispatch,state)=>{
        const response=await axios.post("http://localhost:9011/user/login",userData)
        console.log(response)
        console.log("in action ",response.data.passwordresult,response.data.emailresult,response.data.token)
        if(response.data.result){
        localStorage.setItem("token",JSON.stringify(response.data.token))
        }
        dispatch({type:"USERLOGIN",passwordresult:response.data.passwordresult,emailresult:response.data.emailresult})
       
}