import IRouter from './IRouter.interface';
interface IConfig{
    server: {
        port:number;
        static:{
            index: string | false;
            dotfiles: "allow" | "deny";
            cacheControl: boolean;
            etag: boolean;
            maxAge: number;
            route: string;
            path: string;
        };
    };
    logging: {
        path: string;
        fileName: string;
        format: string;
    };
    database: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        charset: string,
        timezone: string,
 
    }
    routers: IRouter[],
}

export default IConfig;