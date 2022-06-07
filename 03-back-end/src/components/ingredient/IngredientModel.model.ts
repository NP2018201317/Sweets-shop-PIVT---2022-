import IModel from '../../common/IModel.interface';

export interface IItemIgredient {
    ingredient_item_id: number;
    item_id: number,
    ingredient_id: number
}

export default class IngredientModel implements IModel {
    priceId: number;
    name: string;
}