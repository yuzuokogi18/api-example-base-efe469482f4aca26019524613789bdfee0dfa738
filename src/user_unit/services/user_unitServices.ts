import { UserUnitRepository } from "../repositories/User_UnitRepostory";
import { User_Unit } from "../models/User_Unit";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class UserUnitService {
    public static async getAllUserUnits(): Promise<User_Unit[]> {
        try {
            return await UserUnitRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener user_units: ${error.message}`);
        }
    }

    public static async getUserUnitById(user_unit_id: number): Promise<User_Unit | null> {
        try {
            return await UserUnitRepository.findById(user_unit_id);
        } catch (error: any) {
            throw new Error(`Error al encontrar user_unit: ${error.message}`);
        }
    }

    public static async addUserUnit(userUnit: User_Unit) {
        try {
            userUnit.created_at = DateUtils.formatDate(new Date());
            userUnit.updated_at = DateUtils.formatDate(new Date());
            return await UserUnitRepository.createUserUnit(userUnit);
        } catch (error: any) {
            throw new Error(`Error al crear user_unit: ${error.message}`);
        }
    }

    public static async modifyUserUnit(user_unit_id: number, userUnitData: User_Unit) {
        try {
            const userUnitFound = await UserUnitRepository.findById(user_unit_id);

            if (userUnitFound) {
                if (userUnitData.unit_id !== undefined) userUnitFound.unit_id = userUnitData.unit_id;
                if (userUnitData.user_id !== undefined) userUnitFound.user_id = userUnitData.user_id;
                if (userUnitData.deleted !== undefined) userUnitFound.deleted = userUnitData.deleted;

                userUnitFound.updated_at = DateUtils.formatDate(new Date());
                return await UserUnitRepository.updateUserUnit(user_unit_id, userUnitFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar user_unit: ${error.message}`);
        }
    }

    public static async deleteUserUnit(user_unit_id: number): Promise<boolean> {
        try {
            return await UserUnitRepository.deleteUserUnit(user_unit_id);
        } catch (error: any) {
            throw new Error(`Error al eliminar user_unit: ${error.message}`);
        }
    }
}
