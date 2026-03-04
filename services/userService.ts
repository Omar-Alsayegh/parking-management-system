import bcrypt from "bcrypt";
import * as userRepo from "@/repositories/userRepository";
import { User } from "@/types/user";

export const fetchAllUsers = async (): Promise<User[]> => {
  return await userRepo.getAllUsers();
};

export const fetchUserById = async (
  id: number
): Promise<User> => {
  const user = await userRepo.getUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string = "user"
): Promise<number> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepo.createUser(name, email, hashedPassword, role);
};

export const updateUserService = async (
  id: number,
  name: string,
  email: string,
  role: string,
  updated_by: number | null
): Promise<void> => {
  if (!id) throw new Error("Invalid id");

  const updated = await userRepo.updateUserRepository(
    id,
    name,
    email,
    role,
    updated_by
  );

  if (!updated) throw new Error("User not found");
};

export const deleteUserService = async (
  id: number
): Promise<void> => {
  if (!id) throw new Error("Invalid id");

  const deleted = await userRepo.deleteUserRepository(id);
  if (!deleted) throw new Error("User not found");
};

export const getAdminsService = async (): Promise<User[]> => {
  return await userRepo.getAdmins();
};

export const getRegularUsersService = async (): Promise<User[]> => {
  return await userRepo.getRegularUsers();
};