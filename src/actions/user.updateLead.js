import axios from "axios"

export const leadUpdate=(userData)=>async(dispatch,state)=>{
        const response=await axios.put(`http://localhost:9011/lead/updatelead`,userData)
        console.log(response)
        dispatch({type:"updated",result:response.data.result})
}