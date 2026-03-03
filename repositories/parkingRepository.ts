import { db } from "@/lib/db";
import { Parking } from "@/types/parking";

export const getAllParkings = async (): Promise<Parking[]> => {
  const [rows] = await db.query(
    "SELECT id, name, total_slots, status FROM parkings"
  );

  return rows as Parking[];
};

export const getParkingById = async (
  id: number
): Promise<Parking | null> => {
  const [rows] = await db.query(
    "SELECT id, name, total_slots, status FROM parkings WHERE id = ?",
    [id]
  );

  const parkings = rows as Parking[];
  return parkings.length ? parkings[0] : null;
};

export const createParking = async (
  name: string,
  total_slots: number,
  status: string
): Promise<number> => {
  const [result]: any = await db.execute(
    `INSERT INTO parkings 
     (name, total_slots, status)
     VALUES (?, ?, ?)`,
    [name, total_slots, status]
  );

  return result.insertId;
};

export const updateParkingRepository = async (
  id: number,
  name: string,
  total_slots: number,
  status: string
): Promise<boolean> => {
  const [result]: any = await db.execute(
    `UPDATE parkings
     SET name = ?, 
         total_slots = ?, 
         status = ?
     WHERE id = ?`,
    [name, total_slots, status, id]
  );

  return result.affectedRows > 0;
};

export const deleteParkingRepository = async (
  id: number
): Promise<boolean> => {
  const [result]: any = await db.execute(
    "DELETE FROM parkings WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};