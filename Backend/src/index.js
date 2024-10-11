import dotenv from "dotenv"
dotenv.config({
    path: '../.env'
})
import sequelize from "./config/DBConfig.js"
import {app} from './app.js'





sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT || 3000, () => {
        console.log("mysql database connected")
    })
})
.catch((err)=>{
    console.log("connection failed ",err)
})