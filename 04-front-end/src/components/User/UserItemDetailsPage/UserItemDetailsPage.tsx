import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import IItem from '../../../models/Item.model';
import IItemDetailsPreview from '../Item/ItemsDetailsPreview';
import { useParams } from 'react-router-dom';
export interface IUserItemDetailsPageUrlParams extends Record<string, string | undefined>{
    id: string;
}

export default function UserItemDetailsPage() {
    const [item, setItem] = useState<IItem>();
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    
    const params = useParams<IUserItemDetailsPageUrlParams>();

    useEffect(() => {
        setLoading(true);

        api("get", "/api/item/" + params.id, "user")
            .then(res => {
                if (res.status === 'error') {
                    throw { message: 'Could not get item data!' }
                    
                }
                
                return setItem(res.data);
                
            })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Uknown error while loading this item...');
        })
        .finally(() => {
            setLoading(false);
        })
    }, [params.id ])

    return (
        <div>
            { loading && <p>Loading...</p>} 
            { errorMessage && <p>Error: {errorMessage}</p>}
            

<div>
                    { item && (
                        <div className="container"> 
                            <div className="row">
                            { <IItemDetailsPreview key={ "item-" + item.itemId } item={ item }/>}
                            </div>  
                        </div>
            

                
            )}
            </div>
            </div>
    );
}