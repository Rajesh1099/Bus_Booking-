import axios from 'axios';
import React, {  useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const validateToken= async()=>{
        try {
            const response = await axios.post('/api/users/get-user-by-id',{},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            if(response.data.success){
                setLoading(false);
                navigate('/');
                
            }else{
                setLoading(false);
                navigate("/login");
            }
            
        } catch (error) {
            setLoading(false);
                navigate("/login");
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            validateToken();
        }else{
            navigate("/login");
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  return <div>{loading ? <div>loading...</div>:<>{children}</>}</div>;
}

export default ProtectedRoute;