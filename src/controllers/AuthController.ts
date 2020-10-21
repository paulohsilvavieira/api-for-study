import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { Users } from '../models/Users';
const AuthController = {
  login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;
      const user = await getConnection().manager.findOne(Users, {
        where: {
          email,
        },
      });
      if (user && user.comparePassword(password)) {
        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign({ user }, secret);
        return response.status(200).json({
          token,
        });
      }
      return response.status(401).json({
        msg: 'Unauthorized',
      });
    } catch (error) {
      return response.status(500).json({
        msg: new Error(error).message,
      });
    }
  },
};

export default AuthController;
