import IModel from '../../common/IModel.interface';
export default class ItemModel implements IModel {
    itemId: number;
    name: string;
    imagePath: string;
    description: string;
    isActive: boolean;
    
    categoryId: number;
}
