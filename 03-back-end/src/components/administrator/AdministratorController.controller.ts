import BaseController from '../../common/BaseController';
import {Request, response, Response} from 'express';
import IAddAdministrator, { AddAdministratorValidator } from './dto/IAddAdministrator.dto';
import { IAddAdministratorDto } from './dto/IAddAdministrator.dto';
import * as bcrypt from "bcrypt";
import { EditAdministratorValidator, IEditAdministratorDto } from './dto/IEditAdministrator.dto';
import IEditAdministrator from './dto/IEditAdministrator.dto';

export default class  AdministratorController extends BaseController {
    getAll(req: Request, res: Response) {
        this.services.administrator.getAll({
            removePassword: true
        },
        ).then(result =>{
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        })

    }

    getById(req: Request, res:Response) {
        const id: number = +req.params?.id;

        this.services.administrator.getById(id,{
            removePassword: true
        }).then(result =>{
            if (result === null) {
                res.status(404).send('Administrator not found!');
            }
            
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        })
        
    }

    async add(req: Request, res: Response) {
        const body = req.body as IAddAdministratorDto;

        if (!AddAdministratorValidator(body)) {
            return  res.status(404).send(AddAdministratorValidator.errors);
        }

        const passwordHash = bcrypt.hashSync(body.password, 10);
        
        this.services.administrator.add({
            username: body.username,
            password_hash: passwordHash
        }).then(result =>{

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        })
    }


    editById(req: Request, res: Response) {
        const id: number = +req.params?.aid;
        const data = req.body as IEditAdministratorDto;

        if (!EditAdministratorValidator(data)) {
            return  res.status(404).send(EditAdministratorValidator.errors);
        }

        

        const serviceData: IEditAdministrator = { };
        
        if(data.password !== undefined) {
            const passwordHash = bcrypt.hashSync(data.password, 10);
            serviceData.password_hash = passwordHash;
        }
    

        if (data.isActive !== undefined) {
            serviceData.is_active = data.isActive ? 1 : 0;
        }

        this.services.administrator.edit(id, serviceData)
        .then((result) => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async getAllAdministratorsAdmin(req: Request, res: Response) {
        if(req.authorisation?.role === "administrator"){
            return res.send([
                "test for " + req.authorisation?.identity  
            ]);
    
        }
    
    
        this.services.administrator.getAllAdministratorsForAdmin().then(result =>{
            res.send(result);
        }).catch(error => {
            res.status(500).send((error)?.message);
        });
    }
}

