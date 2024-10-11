import axios from './axios'



export const fetchAdminLogs=async()=>{
    try {
        const response=await axios.get('/admin/logs')
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return error        
    }
}