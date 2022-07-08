import ICategory from '../../../models/ICategory.model';
import { useState, useEffect } from 'react';
import IItem from '../../../models/Item.model';
import ItemPreview from '../Item/ItemPreview';
import { useParams } from 'react-router-dom';

export interface IUserCategoryPageUrlParams extends Record<string, string | undefined> {
    id: string;
}



export default function UserCategoryPage() {
    const [ category, setCategory ] = useState<ICategory|null>(null);
    const [items, setItems] = useState<IItem[]>([]);
    const [ errorMessage, setErrorMessage] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    const params = useParams<IUserCategoryPageUrlParams>();

    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:10000/api/category/" + params.id).then(res => res.json())
        .then(data =>{
            setCategory(data);
        })
        .then(data =>{
            return fetch("http://localhost:10000/api/category/" + params.id + "/item");
        })
        .then(res => res.json())
        .then(data => {
            setItems(data)
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error while loading category!')
        })
        .finally(() => {
            setLoading(false);
        })


    }, [params.id])

    return (
        <div>
            { loading && <p>Loading...</p>} 
            { errorMessage && <p>Error: {errorMessage}</p>}
            
            {category && (
            <div>
                    <h1>{ category?.name}</h1>

                    { items && (
                        <div className="container"> 
                            <div className="row">
                            { items.map(item => <ItemPreview key={ "item-" + item.itemId } item={ item }/>)}
                            </div>  
                        </div>
                    )}

                </div>
            )}
            </div>

    )
}