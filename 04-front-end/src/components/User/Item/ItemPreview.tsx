import IItem from "../../../models/Item.model";

export interface IItemPreviewProperties {
    item: IItem;
}


export default function ItemPreview(props: IItemPreviewProperties) {
    return (
        <div>
            <h2>{props.item.name }</h2>
            <p>{ props.item.description}</p>
            <p>Ingredients:</p>
            {/* <ul>
               {props.item.ingredient.map(ingredient => <span className=""></>)}
            </ul> */}
        </div>

    );

}