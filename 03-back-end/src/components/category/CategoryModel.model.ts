import ItemModel from '../item/ItemModel.model';
import IModel from '../../common/IModel.interface';
class CategoryModel implements IModel {
    categoryId: number;
    name: string;
    imagePath: string;
    isActive: boolean;
    /*enum Measurment {
        GRAMAZA = "100g",
        KOMAD= "komad",
        KUGLA = "kugla",
      }  */ 

    items? : ItemModel[];  

}

export default CategoryModel;