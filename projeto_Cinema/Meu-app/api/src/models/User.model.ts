/**
 * User Model
 * 
 * Modelo de dados para usuários com validações e operações de banco de dados.
 * Implementa o padrão Repository para isolar a lógica de acesso aos dados.
 */

import Database, { User as UserEntity } from '../config/database';

/**
 * Interface para dados de criação de usuário
 */
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

/**
 * Interface para resposta de usuário (sem senha)
 */
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Storage em memória para web
 */
const memoryStorage: Map<string, UserEntity> = new Map();
let nextId = 1;

/**
 * Classe Model para operações relacionadas a usuários
 */
export class UserModel {
  private db = Database.getInstance();

  /**
   * Cria um novo usuário no banco de dados
   * 
   * @param userData - Dados do usuário a ser criado
   * @returns Dados do usuário criado (sem senha)
   * @throws Error se o email já estiver em uso
   */
  async create(userData: CreateUserDTO): Promise<UserResponse> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      if (memoryStorage.has(userData.email)) {
        throw new Error('Email já cadastrado');
      }

      const user: UserEntity = {
        id: nextId++,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString(),
      };

      memoryStorage.set(userData.email, user);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
    }

    // Verifica se o email já existe
    const existing = await database.getFirstAsync(
      'SELECT * FROM users WHERE email = ?',
      [userData.email]
    ) as UserEntity | null;

    if (existing) {
      throw new Error('Email já cadastrado');
    }

    // Insere o novo usuário
    const result = await database.runAsync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [userData.name, userData.email, userData.password]
    );

    // Busca o usuário criado
    const user = await database.getFirstAsync(
      'SELECT id, name, email, createdAt FROM users WHERE id = ?',
      [result.lastInsertRowId]
    ) as UserEntity | null;

    if (!user) {
      throw new Error('Erro ao criar usuário');
    }

    return user as UserResponse;
  }

  /**
   * Busca um usuário por email
   * 
   * @param email - Email do usuário
   * @returns Usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      return memoryStorage.get(email) || null;
    }
    
    const user = await database.getFirstAsync(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as UserEntity | null;

    return user || null;
  }

  /**
   * Busca um usuário por ID
   * 
   * @param id - ID do usuário
   * @returns Dados do usuário (sem senha) ou null
   */
  async findById(id: number): Promise<UserResponse | null> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      for (const user of memoryStorage.values()) {
        if (user.id === id) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          };
        }
      }
      return null;
    }
    
    const user = await database.getFirstAsync(
      'SELECT id, name, email, createdAt FROM users WHERE id = ?',
      [id]
    ) as UserResponse | null;

    return user || null;
  }

  /**
   * Lista todos os usuários
   * 
   * @returns Array de usuários (sem senhas)
   */
  async findAll(): Promise<UserResponse[]> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      return Array.from(memoryStorage.values()).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      }));
    }
    
    const users = await database.getAllAsync(
      'SELECT id, name, email, createdAt FROM users'
    ) as UserResponse[];

    return users;
  }

  /**
   * Atualiza dados de um usuário
   * 
   * @param id - ID do usuário
   * @param userData - Dados parciais para atualizar
   * @returns Dados atualizados do usuário
   */
  async update(id: number, userData: Partial<CreateUserDTO>): Promise<UserResponse> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      for (const [email, user] of memoryStorage.entries()) {
        if (user.id === id) {
          if (userData.name) user.name = userData.name;
          if (userData.email) {
            memoryStorage.delete(email);
            user.email = userData.email;
            memoryStorage.set(userData.email, user);
          }
          if (userData.password) user.password = userData.password;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          };
        }
      }
      throw new Error('Usuário não encontrado');
    }

    const fields: string[] = [];
    const values: any[] = [];

    if (userData.name) {
      fields.push('name = ?');
      values.push(userData.name);
    }
    if (userData.email) {
      fields.push('email = ?');
      values.push(userData.email);
    }
    if (userData.password) {
      fields.push('password = ?');
      values.push(userData.password);
    }

    if (fields.length === 0) {
      throw new Error('Nenhum campo para atualizar');
    }

    values.push(id);

    await database.runAsync(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    const user = await this.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  /**
   * Remove um usuário do banco de dados
   * 
   * @param id - ID do usuário
   */
  async delete(id: number): Promise<void> {
    const database = this.db.getDatabase();

    // Fallback para web (in-memory)
    if (!database) {
      for (const [email, user] of memoryStorage.entries()) {
        if (user.id === id) {
          memoryStorage.delete(email);
          return;
        }
      }
      return;
    }
    
    await database.runAsync('DELETE FROM users WHERE id = ?', [id]);
  }
}

