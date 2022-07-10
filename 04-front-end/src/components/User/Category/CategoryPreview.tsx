import ICategory from "../../../models/ICategory.model";
import './CategoryPreview.sass';

export interface ICategoryPreviewProperties {
    category: ICategory;
}


export default function CategoryPreview(props: ICategoryPreviewProperties) {
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
        <div className="card">
        <img className="card-img-top" src={ props.category.imagePath} alt={props.category.name}/>
        <div className="card-body">
            <h5 className="card-title">{ props.category.name}</h5>
        </div>
    </div>
   );

}