import axios from "axios"

export const leaddelete=(userData)=>async(dispatch,state)=>{
        const response=await axios.delete(`http://localhost:9011/lead/deletelead/${userData}`)
        console.log(response)
        dispatch({type:"delete",result:response.data.result})
}