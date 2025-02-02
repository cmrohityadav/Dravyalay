import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express'
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";

import * as AdminJSMongoose from '@adminjs/mongoose'
import { COOKIE_PASSWORD } from "./config.js";
import { dark, light, noSidebar } from '@adminjs/themes'
import { DB_TYPE } from "./dbname.js";


AdminJS.registerAdapter(AdminJSMongoose)

const DEFAULT_ADMIN = {
    email: 'rohit@rohit.in',
    password: "123456789",

}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null;
}

export const buildAdminJS = async (app) => {
    const admin = new AdminJS({
        resources: [
            {
                resource: Product
            },
            {
                resource: Category
            },
            {
                resource: Order
            },
            {
                resource: User
            },
            {
                resource: Transaction
            },
        ],
        branding: {
            companyName: 'Rohit',
            withMadeWithLove: false,

        },
        defaultTheme: dark.id,
        availableThemes: [dark, light, noSidebar],
        rootPath: '/admin'
    })

    const MongoDBStore = ConnectMongoDBSession(session)
    const sessionStore = new MongoDBStore({
        uri: DB_TYPE,
        collection: 'sessions'
    })

    const adminRouter = await AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: COOKIE_PASSWORD
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === 'production'
            },
            name: 'adminjs'
        }
    )

    app.use(admin.options.rootPath,adminRouter)
}
