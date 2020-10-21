import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Users } from '../models/Users';

const UsersController = {
  create: async (request: Request, response: Response) => {
    try {
      const { email, name, password } = request.body;
      const user = new Users();
      user.email = email;
      user.password = password;
      user.name = name;

      await getConnection().manager.save(user);
      return response.status(201).json({
        msg: 'User Created',
      });
    } catch (error) {
      return response.status(500).json({
        msg: new Error(error).message,
      });
    }
  },
  read: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const user = await getConnection().manager.findOne(Users, {
        where: { id },
      });
      return response.status(200).json({
        user,
      });
    } catch (error) {
      return response.status(500).json({
        msg: new Error(error).message,
      });
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { email, name, password } = request.body;
      const user = new Users();
      user.email = email;
      user.password = password;
      user.name = name;

      await getConnection().manager.update(Users, { id }, user);

      return response.status(204).json({});
    } catch (error) {
      return response.status(500).json({
        msg: new Error(error).message,
      });
    }
  },
  all: async (request: Request, response: Response) => {
    try {
      const users = await getConnection().manager.find(Users, {});

      return response.status(200).json({ users });
    } catch (error) {
      return response.status(500).json({
        msg: new Error(error).message,
      });
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      await getConnection().manager.delete(Users, { id });
      return response.status(204).json({});
    } catch (error) {
      return response.status(500).json({
        msg: new Error(error).message,
      });
    }
  },
};

export default UsersController;
