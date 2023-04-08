import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () =>{

    const [categories, setCategories] = useState([]);
    
    const getCategory = async() =>{
        try {
            const {data} = await axios.get('/api/category/get-category');
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        getCategory();
    }, [])

    return categories;
}



export default useCategory;