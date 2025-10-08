import { v4 as uuidv4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = uuidv4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    return users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    return users.find((user) => user.email === email);
  },

  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    return users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },
};
