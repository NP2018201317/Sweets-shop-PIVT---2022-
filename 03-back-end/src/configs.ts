import IConfig from './common/IConfig.interface';
import CategoryRouter from './components/category/CategoryRouter.router';

const DevConfig: IConfig = {
    server: {
        port:10000,
        static:{
            index: false,
            dotfiles: "deny",
            cacheControl: true,
            etag: true,
            maxAge: 1000 * 60 * 60 * 24,
            route: "/assets",
            path: "./static"
        }
    },
   logging: {
    path: "./logs",
    fileName: "access.log",
    format: ":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length] bytes\t:response-time ms",

    },

    database: {
        host:'localhost',
        port: 3306,
        user: 'aplikacija',
        password: 'aplikacija',
        database: 'sweets_shop_db',
        charset: 'utf8',
        timezone: '+01:00',
 
    },
    routers: [
        new CategoryRouter(),
    ]
};

export {DevConfig};