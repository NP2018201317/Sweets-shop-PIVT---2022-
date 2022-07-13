import IItem from '../../../models/Item.model';
import './ItemDetailsPreview.sass';
export interface IItemPreviewProperties{
    item: IItem;
}

export default function IItemDetailsPreview(props: IItemPreviewProperties){
    return (
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-7 pt-3">
            <img src={ props.item.imagePath} alt={props.item.name} className="rounded"/>
            <div className="project-info-box">
                <p><b>Name:</b> { props.item.name}</p>
                <p><b>Description:</b> { props.item.description }</p>
                <p><b>Ingredients:</b> { props.item.ingredients.map(ingredient => (
            <span>{ingredient.name}, </span>
            ))}</p>
            <p><b>Measurement:</b> { props.item.category.measurement }</p>
                <p><b>Price:</b> { props.item.price } RSD</p> <button className='btn btn-primary'>Add to cart</button>
            </div>
        </div>
        


    
    </div>
    </div>
    

    

    
    )
}