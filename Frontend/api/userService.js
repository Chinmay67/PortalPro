import axios from './axios'


export const fetchCustomers=async()=>{
    try {
        const response=await axios.get('/customers/getCustomers')
        return response
    } catch (error) {
        return error
    }
}

export const CheckLogin=async()=>{
    try{
        const response=await axios.get('/auth/checkLogin')
        return response 
    }
    catch(error){
        return error
    }
}

export const createCustomer=async(customerData)=>{
    console.log(customerData)
    try {
        const response=await axios.post('/customers/create',customerData,{
            
                headers: {
                  'Content-Type': 'application/json',
                },
            
        })
        return response
    } catch (error) {
        return error
    }
}

export const updateCustomerById=async(id,newData)=>{
    try {
        const response =await axios.patch(`/customers/update/${id}`,newData,{
            headers: {
                'Content-Type': 'application/json',
              },
        })
        return response
    } catch (error) {
        return error
    }
}
