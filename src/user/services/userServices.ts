import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/user";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";

const saltRounds = 10;

export class userService {

    public static async login(username: string, password: string){
        try{
            const user = await this.getUserByUsername(username);
            if(!user){
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return null;
            }

            const payload = {
                user_id: user.user_id,
                role_id: user.role_id,
                username: user.username
            }
            return await jwt.sign(payload, secretKey, { expiresIn: '5m' });

        }catch (error: any){
            throw new Error(`Error logging in: ${error.message}`);
        }

    }

    public static async getAllUsers(): Promise<User[]> {
        try{
            return await UserRepository.findAll();
        }catch (error: any){
            throw new Error(`Error getting users: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try{
            return await UserRepository.findById(userId);
        }catch (error: any){
            throw new Error(`Error finding user: ${error.message}`);
        }
    }

    public static async getUserByUsername(username: string): Promise<User | null> {
        try {
          return await UserRepository.findByUsername(username);
        } catch (error: any) {
          throw new Error(`Error finding user: ${error.message}`);
        }
      }

    public static async addUser(user: User) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            user.password = await bcrypt.hash(user.password, salt);
            user.deleted = false;
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User){
        try{
            const userFound =  await UserRepository.findById(userId);
            const salt = await bcrypt.genSalt(saltRounds);

            if(userFound){
                if(userData.lastname){
                    userFound.lastname = userData.lastname;
                }
                if(userData.password){
                    userFound.password = await bcrypt.hash(userData.password, salt);
                }
                if(userData.role_id){
                    userFound.role_id = userData.role_id;
                }
                if(userData.deleted !== undefined){
                    userFound.deleted = userData.deleted;
                }
            }else{
                return null;
            }
            userFound.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.updateUser(userId, userFound);
        }catch (error: any){
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    public static async deleteUser(userId: number): Promise<boolean> {
        try{
            return await UserRepository.deleteUser(userId);
        }catch (error: any){
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

}