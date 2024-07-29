import { CheckerRepository } from '../repositories/CheckerRepostory';
import { Checker } from '../models/Checker';
import { DateUtils } from '../../shared/utils/DateUtils';

export class CheckerService {
  public static async getAllCheckers(): Promise<Checker[]> {
    try {
      return await CheckerRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener checadores: ${error.message}`);
    }
  }

  public static async getCheckerById(checkerId: number): Promise<Checker | null> {
    try {
      return await CheckerRepository.findById(checkerId);
    } catch (error: any) {
      throw new Error(`Error al encontrar checador: ${error.message}`);
    }
  }
  public static async addChecker(checker: Checker): Promise<Checker> {
    try {
        // Asegúrate de que 'date' esté en formato correcto
        const date = new Date(checker.date);
        checker.date = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        checker.created_at = DateUtils.formatDate(new Date());
        checker.updated_at = DateUtils.formatDate(new Date());
        checker.deleted = false;

        return await CheckerRepository.createChecker(checker);
    } catch (error: any) {
        throw new Error(`Error al crear checador: ${error.message}`);
    }
}

  public static async modifyChecker(checkerId: number, checkerData: Checker): Promise<Checker | null> {
    try {
      const checkerFound = await CheckerRepository.findById(checkerId);

      if (checkerFound) {
        if (checkerData.numeroUnidad) checkerFound.numeroUnidad = checkerData.numeroUnidad;
        if (checkerData.Datetime) checkerFound.Datetime = checkerData.Datetime;
        if (checkerData.nombreChecador) checkerFound.nombreChecador = checkerData.nombreChecador;
        if (checkerData.direction) checkerFound.direction = checkerData.direction;
        if (checkerData.date) checkerFound.date = checkerData.date;
        if (checkerData.deleted !== undefined) checkerFound.deleted = checkerData.deleted;
        
        checkerFound.updated_at = DateUtils.formatDate(new Date());
        return await CheckerRepository.updateChecker(checkerId, checkerFound);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar checador: ${error.message}`);
    }
  }

  public static async deleteChecker(checkerId: number): Promise<boolean> {
    try {
      return await CheckerRepository.deleteChecker(checkerId);
    } catch (error: any) {
      throw new Error(`Error al eliminar checador: ${error.message}`);
    }
  }
  public static async getCheckerByName(name: string): Promise<Checker | null> {
    try {
      return await CheckerRepository.findByName(name);
    } catch (error: any) {
      throw new Error(`Error al encontrar checador por nombre: ${error.message}`);
    }
  }
  public static async getCheckerByUnitNumber(unitNumber: string): Promise<Checker | null> {
    try {
      return await CheckerRepository.findByUnitNumber(unitNumber);
    } catch (error: any) {
      throw new Error(`Error al encontrar checador por número de unidad: ${error.message}`);
    }
  }
}
