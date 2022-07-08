
import IIngredient from './IIngredient.model';
export default interface IItem {
    itemId:number;
    name: string;
    imagePath: string;
    isActive: boolean;
    description: string;
    categoryId: number;
    price: number;
    ingredient: IIngredient[];
}