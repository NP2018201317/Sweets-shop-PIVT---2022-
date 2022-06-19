import IConfig from './common/IConfig.interface';
import CategoryRouter from './components/category/CategoryRouter.router';
import AdministratorRouter from './components/administrator/AdministratorRouter.router';
import UserRouter from './components/user/UserRouter.router';
import { MailConfigurationParameters } from './config.mail';
import AuthRouter from './components/auth/AuthRouter.router';
import { readFileSync } from "fs"

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
        new AdministratorRouter(),
        new UserRouter(),
        new AuthRouter(),
    ],

    mail: {
        host: "smtp.office365.com",
        port: 587,
        email: "",
        password: "",
        debug: true,
    },
    auth: {
        administrator:{
            algorithm: "RS256",
            issuer: "PIiVT",
            tokens: {
                auth:{
                    duration: 60 * 60 * 24,
                    keys: {
                        public: readFileSync("./.keystore/app.public", "ascii"),
                        private: readFileSync("./.keystore/app.private", "ascii"),
                    }
            },
            refresh:{

                duration: 60 * 60 * 24 * 60,
                    keys: {
                        public: readFileSync("./.keystore/app.public", "ascii"),
                        private: readFileSync("./.keystore/app.private", "ascii"),
                    }
            }
        },

    },
        user: {
            algorithm: "RS256",
            issuer: "PIiVT",
            tokens: {
                auth:{
                    duration: 60 * 60 * 24,
                    keys: {
                        public: readFileSync("./.keystore/app.public", "ascii"),
                        private: readFileSync("./.keystore/app.private", "ascii"),
                    }
            },
            refresh:{

                duration: 60 * 60 * 24 * 60,
                    keys: {
                        public: readFileSync("./.keystore/app.public", "ascii"),
                        private: readFileSync("./.keystore/app.private", "ascii"),
                    }
            }
        },
        },
    },
};

DevConfig.mail = MailConfigurationParameters;

export {DevConfig};