import axios from "axios"

export const leadUpdate=(userData)=>async(dispatch,state)=>{
        const response=await axios.post("http://localhost:9011/lead/addlead",userData)
        console.log(response)
        dispatch({type:"lead",result:response.data.result})
}