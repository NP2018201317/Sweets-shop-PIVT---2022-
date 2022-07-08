import { useEffect, useState } from 'react';
import ItemPreview from '../Item/ItemPreview';
import IItem from '../../../models/Item.model';

export default function UserHomePage() {
    const [items, setItems] = useState<IItem[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    

    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:10000/api/item").then(res => res.json()).then(data => {
            setItems(data);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Uknown error while loading items...');
        })
        .finally(() => {
            setLoading(false);
        })
    }, [ ])

    return (
        <div>
            { loading && <p>Loading...</p>} 
            { errorMessage && <p>Error: {errorMessage}</p>}
            
        

                    { items && (
                        <div className="container"> 
                            <div className="row">
                            { items.map(item => <ItemPreview key={ "item-" + item.itemId } item={ item }/>)}
                            </div>  
                        </div>
            

                
            )}
            </div>
    );
}