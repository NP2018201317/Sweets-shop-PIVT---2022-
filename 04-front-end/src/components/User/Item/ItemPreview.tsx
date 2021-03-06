import IItem from "../../../models/Item.model";
import { Link } from 'react-router-dom';

export interface IItemPreviewProperties {
    item: IItem;
}


export default function ItemPreview(props: IItemPreviewProperties) {
   // return (
     //   <div>
     //       <h2>{props.item.name }</h2>
     //       <p>{ props.item.description}</p>
     //       <p>Ingredients:</p>
    //        {/* <ul>
     //          {props.item.ingredient.map(ingredient => <span className=""></>)}
    //        </ul> */}
    //    </div>

   // );

   return (
    <div className="col-sm-4 pt-3">
        <div className="card">
        <img className="card-img-top" src={ props.item.imagePath} alt={props.item.name}/>
        <div className="card-body">
            <h5 className="card-title">{ props.item.name}</h5>
            <p className="card-text">{ props.item.description }</p>
            <p className="card-text">{ props.item.price } RSD</p>
            <Link className="btn btn-primary me-3" to="/admin/dashboard/order/list/new">Add to cart</Link>
            <Link className="btn btn-primary" to={"/item/" + props.item.itemId}>Details</Link>
        </div>
    </div>
    </div>
   );

}
