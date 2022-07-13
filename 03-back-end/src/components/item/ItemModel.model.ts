import IModel from '../../common/IModel.interface';
import CategoryModel from '../category/CategoryModel.model';
import IngredientModel from '../ingredient/IngredientModel.model';
import ICategory from '../../../../04-front-end/src/models/ICategory.model';
 
export default class ItemModel implements IModel {
    itemId: number;
    name: string;
    imagePath: string;
    description: string;
    isActive: boolean;
    price:number;
    category: ICategory;

    categoryId: number;
    //category?: CategoryModel = null;
    ingredients?: IngredientModel [] = []; /// videcemo za price
}
