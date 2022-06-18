import * as mysql2 from 'mysql2/promise';
import CategoryService from '../components/category/CategoryServices.service';
import ItemService from '../components/item/ItemService.service';
import AdministratorService from '../components/administrator/AdministratorService.service';
import IngredientService from '../components/ingredient/IngredientService.service';
import UserService from '../components/user/UserService.service';

export interface IServices {
    category: CategoryService;
    item: ItemService;
    administrator: AdministratorService;
    ingredient: IngredientService;
    user: UserService;
}

export default interface IApplicationResources{
    databaseConnection: mysql2.Connection;
    services: IServices;

}

