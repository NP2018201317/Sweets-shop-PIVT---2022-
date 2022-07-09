import ICategory from '../../../models/ICategory.model';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';

export default function UserCategoryList() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    

    useEffect(() => {
        api("get", "/api/category", "user" )
        .then(apiResponse => {
            if (apiResponse.status === 'ok') {
                return setCategories(apiResponse.data);
            }

            throw {
                message: 'Unknown error while loading categories...'
            }
        })
        
        
        
        .catch(error => {
            setErrorMessage(error?.message ?? 'Uknown erro while loading categories...');
        })
    }, [ ])

    return (
        <div>
            {errorMessage && (<p>Error: {errorMessage}</p>)}
            { !errorMessage &&
        
        <ul>
            {categories.map(category => (
                <li key= {"category-" + category.categoryId }>
                    <Link to={"/category/" + category.categoryId}> {category.name}</Link>
                </li>

            ))}
        
        </ul>
        }
        </div>
    );
}