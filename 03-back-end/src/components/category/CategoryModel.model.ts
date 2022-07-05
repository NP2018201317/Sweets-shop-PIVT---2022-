import ItemModel from '../item/ItemModel.model';
import IModel from '../../common/IModel.interface';
class CategoryModel implements IModel {
    categoryId: number;
    name: string;
    imagePath: string;
    isActive: boolean;
    mesuarment: '100g' | 'komad' | 'kugla' ;
       

    items? : ItemModel[];  

}

export default CategoryModel;