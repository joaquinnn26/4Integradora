import { uManager } from "../DAL/dao/mongo/users.dao.js"
import { hashData } from "../utils/bcrypt.js";


export const findById = (id) => {
  const user = uManager.findUserByID(id);
  return user;
};

export const findByEmail = (id) => {
    const user = uManager.findUserByEmail(id);
    return user;
  };

export const createOne = (obj) => {
  const hashedPassword = hashData(obj.password);
  const newObj = { ...obj, password: hashedPassword };
  const createdUser = uManager.createUser(newObj);
  return createdUser;
};
export const saveUserDocuments = async ({email, dni, address, bank }) => {
  const savedDocuments = await uManager.updateUser(email, {
    documents: [
      {
        name: "dni",
        reference: dni[0].path,
      },
      {
        name: "address",
        reference: address[0].path,
      },
      {
        name: "bank",
        reference: bank[0].path,
      },
    ],
  });
  console.log("savedDocumenbt de service",savedDocuments)
  return savedDocuments;
};

