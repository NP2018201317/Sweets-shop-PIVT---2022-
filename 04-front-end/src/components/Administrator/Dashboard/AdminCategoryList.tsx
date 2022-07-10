import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import ICategory from '../../../models/ICategory.model';

interface IAdminCategoryListRowProperties {
    category: ICategory;
}



export default function AdminCategoryList() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    function AdminCategoryListRow(props: IAdminCategoryListRowProperties) {
        const [ name, setName ] = useState<string>(props.category.name);

        

        

        return(
            <tr>
                <td>{ props.category.categoryId }</td>
                <td>{ props.category.name }</td>
                <td>{ props.category.imagePath }</td>
                <td>{ +props.category.isActive }</td>
                <td>{ props.category.mesuarment }</td>
            </tr>
        )
    }
    
    const loadCategories = () => {
        api("get", "/api/category", "administrator")
        .then(apiResponse => {
            if (apiResponse.status === 'ok') {
                return setCategories(apiResponse.data)
            }

            throw { message: 'Unknown error while loading categories...', }
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error while loading categories...');
        })
    }

    useEffect(() => {
        
        loadCategories();
    
    }, [ ])

    return (
        <div>
            {errorMessage && (<p>Error: {errorMessage}</p>)}
            { !errorMessage &&
                <table className='table table-bordered table-hover table-striped'>
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image Path</th>
                        <th>Is active</th>
                        <th>Measurement</th>
                        <th>Options</th>
                    </tr> 
                  </thead>
                  <tbody>

                  { categories.map(category => <AdminCategoryListRow key={"category-row" + category.categoryId} category={category} />) }
                  </tbody> 
                </table>
        }
        </div>
    );
}



