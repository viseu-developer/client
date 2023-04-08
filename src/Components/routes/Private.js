import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Spinner from '../Spinner';


const Private = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async() =>{
            const res = await axios.get('/api/auth/user-auth');

            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        };
        if(auth?.token) authCheck();

    },[auth?.token]);

    return ok ? <Outlet/> : <Spinner/>

//   return (
//     <div>Private
//         {

//         }
//     </div>
//   )
}

export default Private;