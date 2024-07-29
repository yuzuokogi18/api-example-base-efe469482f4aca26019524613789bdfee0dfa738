import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User_Unit } from '../models/User_Unit';

export class UserUnitRepository {

  public static async findAll(): Promise<User_Unit[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user_unit', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const userUnits: User_Unit[] = results as User_Unit[];
          resolve(userUnits);
        }
      });
    });
  }

  public static async findById(user_unit_id: number): Promise<User_Unit | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user_unit WHERE user_unit_id = ?', [user_unit_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const userUnits: User_Unit[] = results as User_Unit[];
          if (userUnits.length > 0) {
            resolve(userUnits[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUserUnit(userUnit: User_Unit): Promise<User_Unit> {
    const query = 'INSERT INTO user_unit (unit_id, user_id, created_at, updated_at, deleted) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userUnit.unit_id, userUnit.user_id, userUnit.created_at, userUnit.updated_at, userUnit.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserUnitId = result.insertId;
          const createdUserUnit: User_Unit = { ...userUnit, user_unit_id: createdUserUnitId };
          resolve(createdUserUnit);
        }
      });
    });
  }

  public static async updateUserUnit(user_unit_id: number, userUnitData: User_Unit): Promise<User_Unit | null> {
    const query = 'UPDATE user_unit SET unit_id = ?, user_id = ?, updated_at = ?, deleted = ? WHERE user_unit_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userUnitData.unit_id, userUnitData.user_id, userUnitData.updated_at, userUnitData.deleted, user_unit_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUserUnit: User_Unit = { ...userUnitData, user_unit_id: user_unit_id };
            resolve(updatedUserUnit);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUserUnit(user_unit_id: number): Promise<boolean> {
    const query = 'DELETE FROM user_unit WHERE user_unit_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user_unit_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}
