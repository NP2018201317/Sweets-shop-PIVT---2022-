import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import ICategory from '../../../models/ICategory.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

interface IAdminCategoryListRowProperties {
    category: ICategory;
}



export default function AdminCategoryList() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const loadCategories = () => {
        api("get", "/api/categories/admin", "administrator")
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

    function AdminCategoryListRow(props: IAdminCategoryListRowProperties) {
        const [ name, setName ] = useState<string>(props.category.name);

        
        const activeSideClass = props.category.isActive ? " btn-primary" : " btn-light";
        const inactiveSideClass = !props.category.isActive ? " btn-primary" : " btn-light";
        
        function doToggleCategoryActiveState() {
            api("put", "/api/category/" + props.category.categoryId , "administrator", {
                isActive: !props.category.isActive
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }

                loadCategories();
            })
        }

        return(
            <tr>
                <td>{ props.category.categoryId }</td>
                <td>{ props.category.name }</td>
                <td>{ props.category.imagePath }</td>
                <td> 
                    <div className='btn-group' onClick= {() => { doToggleCategoryActiveState() }}>
                    <div className={'btn btn-sm' + activeSideClass }><FontAwesomeIcon icon={ faSquareCheck }/></div>
                    <div className={'btn btn-sm' + inactiveSideClass}><FontAwesomeIcon icon={ faSquare }/></div>
                </div>
                </td>
                <td>{ props.category.measurement }</td>
            </tr>
        )
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



