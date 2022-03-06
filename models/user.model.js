import { Model,DataTypes } from "sequelize";
import  {database} from "../config/database.js";


export class UserModel extends Model {}

UserModel.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING
    },
    Apellido:{
        type: DataTypes.STRING
    },
    Edad: {
        type: DataTypes.INTEGER
    },
    updatedAt: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.INTEGER
    },
   


},{
    sequelize: database ,
    tableName: 'users',
    timestamps: false,
});
