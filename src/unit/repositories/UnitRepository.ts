import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Unit } from '../models/Unit';

export class UnitRepository {

  public static async findAll(): Promise<Unit[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM unit', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const units: Unit[] = results as Unit[];
          resolve(units);
        }
      });
    });
  }

  public static async findById(unit_id: number): Promise<Unit | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM unit WHERE unit_id = ?', [unit_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const units: Unit[] = results as Unit[];
          if (units.length > 0) {
            resolve(units[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUnit(unit: Unit): Promise<Unit> {
    const query = 'INSERT INTO unit (name, series,  marca, placa,numeroUnidad, created_at, updated_at, deleted) VALUES ( ?, ?, ?, ?, ?, ?, ?,?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [unit.name, unit.series, unit.marca, unit.placa,unit.numeroUnidad, unit.created_at, unit.updated_at, unit.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUnitId = result.insertId;
          const createdUnit: Unit = { ...unit, unit_id: createdUnitId };
          resolve(createdUnit);
        }
      });
    });
  }

  public static async updateUnit(unit_id: number, unitData: Unit): Promise<Unit | null> {
    const query = 'UPDATE unit SET name = ?, series = ?,  marca = ?, placa = ?,numeroUnidad = ?, updated_at = ?, deleted = ? WHERE unit_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [unitData.name, unitData.series,  unitData.marca, unitData.placa,unitData.numeroUnidad, unitData.updated_at, unitData.deleted, unit_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUnit: Unit = { ...unitData, unit_id: unit_id };
            resolve(updatedUnit);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUnit(unit_id: number): Promise<boolean> {
    const query = 'DELETE FROM unit WHERE unit_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [unit_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}
