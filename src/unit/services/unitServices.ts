import { UnitRepository } from "../repositories/UnitRepository";
import { Unit } from "../models/Unit";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class UnitService {
    public static async getAllUnits(): Promise<Unit[]> {
        try {
            return await UnitRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener unidades: ${error.message}`);
        }
    }

    public static async getUnitById(unitId: number): Promise<Unit | null> {
        try {
            return await UnitRepository.findById(unitId);
        } catch (error: any) {
            throw new Error(`Error al encontrar unidad: ${error.message}`);
        }
    }

    public static async addUnit(unit: Unit) {
        try {
            unit.created_at = DateUtils.formatDate(new Date());
            unit.updated_at = DateUtils.formatDate(new Date());
            unit.deleted = false;
            return await UnitRepository.createUnit(unit);
        } catch (error: any) {
            throw new Error(`Error al crear unidad: ${error.message}`);
        }
    }

    public static async modifyUnit(unitId: number, unitData: Unit) {
        try {
            const unitFound = await UnitRepository.findById(unitId);

            if (unitFound) {
                if (unitData.name) unitFound.name = unitData.name;
                if (unitData.series) unitFound.series = unitData.series;
                if (unitData.marca !== undefined) unitFound.marca = unitData.marca;
                if (unitData.placa !== undefined) unitFound.placa = unitData.placa;
                if(unitData.numeroUnidad !== undefined) unitFound.numeroUnidad = unitData.numeroUnidad;
                if (unitData.deleted !== undefined) unitFound.deleted = unitData.deleted;
                
                unitFound.updated_at = DateUtils.formatDate(new Date());
                return await UnitRepository.updateUnit(unitId, unitFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar unidad: ${error.message}`);
        }
    }

    public static async deleteUnit(unitId: number): Promise<boolean> {
        try {
            return await UnitRepository.deleteUnit(unitId);
        } catch (error: any) {
            throw new Error(`Error al eliminar unidad: ${error.message}`);
        }
    }
}
