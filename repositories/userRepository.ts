import { db } from "@/lib/db";
import { User } from "@/types/user";

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await db.query(
    "SELECT id, name, email, role, created_at, updated_at, updated_by FROM users"
  );
  return rows as User[];
};

export const getUserById = async (
  id: number
): Promise<User | null> => {
  const [rows] = await db.query(
    "SELECT id, name, email, role, created_at, updated_at, updated_by FROM users WHERE id = ?",
    [id]
  );

  const users = rows as User[];
  return users.length ? users[0] : null;
};

export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  role: string
): Promise<number> => {
  // Check: Do you have 4 columns and 4 question marks?
  const [result]: any = await db.execute(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );

  return result.insertId;
};
export const updateUserRepository = async (
  id: number,
  name: string,
  email: string,
  role: string,
  updated_by: number | null
): Promise<boolean> => {
  const [result]: any = await db.execute(
    `UPDATE users 
     SET name = ?, email = ?, role = ?, updated_by = ?, updated_at = NOW()
     WHERE id = ?`,
    [name, email, role, updated_by, id]
  );

  return result.affectedRows > 0;
};

export const deleteUserRepository = async (
  id: number
): Promise<boolean> => {
  const [result]: any = await db.execute(
    "DELETE FROM users WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};