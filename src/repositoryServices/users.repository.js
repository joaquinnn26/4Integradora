import { uManager } from "../DAL/dao/mongo/users.dao.js";
import { cManager } from "../DAL/dao/mongo/carts.dao.js";
import RequestDto from "../DAL/dtos/request.dto.js";
import ResponseDto from "../DAL/dtos/response.dto.js";
import { hashData } from "../utils/index.js";

export default class UsersRepository {
    
    async findById(id) {
      try {
        const result = await uManager.findUserByID(id);

        if (!result) {
            console.log(`No se encontró ningún usuario con el ID: ${id}`);
            return null;
        }

        console.log(result);
        return result;
    } catch (error) {
        console.error(`Error al buscar usuario por ID ${id}: ${error.message}`);
        throw error; 
    }
    }

    async findByEmail(id) {
        const user = uManager.findUserByEmail(id);
        return user
    }

    async createOne(user) {
      const hashPassword = await hashData(user.password);
      const createdCart = await cManager.createCart()
      const userDto = new RequestDto(
        { ...user, 
          cart: createdCart._id,
          password: hashPassword });
      
      const createdUser = await uManager.createUser(userDto);
      return createdUser;
    }    
    
}