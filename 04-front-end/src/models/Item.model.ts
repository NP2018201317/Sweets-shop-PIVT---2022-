
import IIngredient from './IIngredient.model';
import ICategory from './ICategory.model';
export default interface IItem {
    itemId:number;
    name: string;
    imagePath: string;
    isActive: boolean;
    description: string;
    categoryId: number;
    price: number;
    ingredients: IIngredient[];
    category: ICategory;
}