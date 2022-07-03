import ICategory from '../../../models/ICategory.model';
import { useState, useEffect } from 'react';

export default function UserCategoryList() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    

    useEffect(() => {
        fetch("http://localhost:10000/api/category").then(res => res.json()).then(data => {
            setCategories(data);
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
                    {category.name}
                </li>
            ))}
        
        </ul>
        }
        </div>
    );
}