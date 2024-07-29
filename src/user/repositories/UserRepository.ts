import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/user';

export class UserRepository {

  public static async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        connection.query('SELECT user_id, firstname, lastname,  phone_number, email, role_id, username, password, created_at, updated_at, deleted FROM user', (error: any, results) => {
            if (error) {
                reject(error);
            } else {
                const users: User[] = results as User[];
                resolve(users);
            }
        });
    });
  }

  public static async findById(user_id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE user_id = ?', [user_id], (error: any, results) => {
            if (error) {
                reject(error);
            } else {
                const users: User[] = results as User[];
                if (users.length > 0) {
                    resolve(users[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
  }

  public static async findByUsername(username: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE username = ?', [username], (error: any, results) => {
            if (error) {
                reject(error);
            } else {
                const users: User[] = results as User[];
                if (users.length > 0) {
                    resolve(users[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO user (firstname, lastname,  phone_number, email,  role_id, username, password, created_at, updated_at, deleted) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.execute(query, [user.firstname, user.lastname,  user.phone_number, user.email,  user.role_id, user.username, user.password, user.created_at, user.updated_at, user.deleted], (error, result: ResultSetHeader) => {
            if (error) {
                reject(error);
            } else {
                const createdUserId = result.insertId;
                const createdUser: User = { ...user, user_id: createdUserId };
                resolve(createdUser);
            }
        });
    });
  }

  public static async updateUser(user_id: number, userData: User): Promise<User | null> {
    const query = 'UPDATE user SET firstname = ?, lastname = ?,  phone_number = ?, email = ?,  role_id = ?, username = ?, password = ?, updated_at = ?, deleted = ? WHERE user_id = ?';
    return new Promise((resolve, reject) => {
        connection.execute(query, [userData.firstname, userData.lastname,  userData.phone_number, userData.email,  userData.role_id, userData.username, userData.password, userData.updated_at, userData.deleted, user_id], (error, result: ResultSetHeader) => {
            if (error) {
                reject(error);
            } else {
                if (result.affectedRows > 0) {
                    const updatedUser: User = { ...userData, user_id: user_id };
                    resolve(updatedUser);
                } else {
                    resolve(null);
                }
            }
        });
    });
  }

  public static async deleteUser(user_id: number): Promise<boolean> {
    const query = 'DELETE FROM user WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}
