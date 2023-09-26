// Modelo que se guardara en la base de Datos 

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TaskModel = sequelize.define("Task",{
    title:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    url:{
        type: DataTypes.STRING,
        allowNull:true 
    }
}, {
    timestamps: true
})