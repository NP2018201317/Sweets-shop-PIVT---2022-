import IModel from '../../common/IModel.interface';
import CategoryModel from '../category/CategoryModel.model';
import IngredientModel from '../ingredient/IngredientModel.model';
 
export default class ItemModel implements IModel {
    itemId: number;
    name: string;
    imagePath: string;
    description: string;
    isActive: boolean;
    
    categoryId: number;
    category?: CategoryModel;
    ingredients?: IngredientModel [] = []; /// videcemo za price
}
