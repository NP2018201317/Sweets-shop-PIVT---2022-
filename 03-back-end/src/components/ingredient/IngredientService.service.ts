import { IItemAdapterOptions } from '../item/ItemService.service';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import IngredientModel from './IngredientModel.model';
import IAddIngredient from './dto/IAddIngredient.dto';
import IEditIngredient from './dto/IEditIngredient.dto';
class IngredientAdapterOptions implements IAdapterOptions{

}

interface ItemIngredientInterface {
    ingredient_item_id: number;
    item_id: number;
    ingredient_id: number;
}

class IngredientService extends BaseService<IngredientModel, IngredientAdapterOptions> {
    tableName(): string {
        return "ingredient";
    }
    sortFildName(): string {
        return "ingredient_id";
    }


protected async adaptToModel(data: any): Promise<IngredientModel>{
    const ingredient: IngredientModel = new IngredientModel();

    ingredient.ingredientId = +data?.ingredient_id;
    ingredient.name = data?.name;


    return ingredient;
}

public async add(data: IAddIngredient): Promise<IngredientModel> {
    return this.baseAdd(data, {});
}

public async editById(ingredientId: number, data:IEditIngredient, options: IngredientAdapterOptions): Promise<IngredientModel> {
    return this.baseEditById(ingredientId, data, options);
}

public async delete(ingredientId): Promise<true> {
    return this.baseDeleteById(ingredientId);
}

public async getAllByItemId(itemId: number, options: IngredientAdapterOptions = {}): Promise<IngredientModel[]> {
    return new Promise((resolve, reject) => { 
    this.getAllFromTableByFieldNameAndValue<ItemIngredientInterface>("ingredient_item", "item_id", itemId)
    .then(async result =>{
        const ingredientIds = result.map(ii => ii.ingredient_id);

        const ingredients: IngredientModel[] = [];

        for (let ingredientId of ingredientIds) {
            const ingredient = await this.getById(ingredientId, options);
            ingredients.push(ingredient);
        }

        resolve(ingredients);

    })  
    .catch(error =>{
        reject(error);

    });

    
});

}}


export default IngredientService;