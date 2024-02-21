import { usersService } from "../repositoryServices/index.js";
import customError from "../services/errors/errors.generate.js"
import { errorsMessage, errorsName } from "../services/errors/errors.enum.js";
import passport from "passport";
import { uManager } from "../DAL/dao/mongo/users.dao.js";
import {saveUserDocuments} from "../services/users.service.js"




export const findUserById = (req, res) => {
    passport.authenticate("jwt", { session: false }),

    async (req, res) => {
        const { idUser } = req.params;
        const user = await usersService.findById(idUser);
        if (!user) {
            customError.createError(errorsName.USER_NOT_FOUND,errorsMessage.USER_NOT_FOUND,500)
            }
        res.json({ message: "User", user });
}};

export const findUserByEmail = async (req, res) => {
    const { UserEmail } = req.body;
    const user = await usersService.findByEmail(UserEmail);
    if (!user) {
        customError.createError(errorsName.USER_NOT_FOUND,errorsMessage.USER_NOT_FOUND,500)
    }
    res.status(200).json({ message: "User found", user });
};

export const createUser =  async (req, res) => {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password) {
        customError.createError(errorsName.DATA_NOT_RECEIVED,errorsMessage.DATA_NOT_RECEIVED,500)
    }
    const createdUser = await usersService.createOne(req.body);
    res.status(200).json({ message: "User created", user: createdUser });
};

export const changeRole= async (req, res) => {
        const { idUser } = req.params;
        console.log(req.params)
        const user = await usersService.findById(idUser);
        if (!user) {
            customError.createError(errorsName.USER_NOT_FOUND,errorsMessage.USER_NOT_FOUND,500)
            }
        
    try {
        console.log("usuario se eocntro en changerole",user)
        let roleChange;
        let result
        if (user.documents[0].name=="dni" && user.documents[0].name=="address" && user.documents[0].name=="bank") {
            console.log(user)

        if (user.role === 'PREMIUM') {
            roleChange = { role: 'USER' }
        } else if (user.role === 'USER' ){
            roleChange = { role: 'PREMIUM' }
        }

        result =await uManager.updateUser(user.email,{role:roleChange})
        }else{
            customError.createError(errorsName.DOCUMENT_MISSING,errorsMessage.DOCUMENT_MISSING,404)
        }

        /* const newUser= upd //aca hay q implementar el resto
        console.log(user)
        if(user.role=="USER"){
            user.role="ADMIN"
        }*/
        res.status(200).json({message:"role updated",user:result})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const documentMulter=async(req,res)=> {
    const {idUser} =req.params;
    
    const emailUser=await usersService.findById(idUser)
    const email=emailUser.email
    console.log("email",emailUser)
    const { dni, address, bank } = req.files;
    console.log(req.files)
    const response = await saveUserDocuments({ email, dni, address, bank });

    console.log(response)
    res.json({ response });
}