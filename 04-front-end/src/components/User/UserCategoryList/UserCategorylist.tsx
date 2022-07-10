import ICategory from '../../../models/ICategory.model';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';
import CategoryPreview from '../Category/CategoryPreview';

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
        
        <div className="container"> 
                            <div className="row">
                            { categories.map(category => (
                                <div className="col-sm-4 pt-3">
                             <Link className="reset-link" to={"/category/" + category.categoryId}>
                            <CategoryPreview key={ "category-" + category.categoryId } category={ category }/>
                            </Link>  
                            </div> 
                            ))}
                            </div>  
                        </div>
        

        }
        </div>
    );
}