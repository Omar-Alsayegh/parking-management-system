import * as parkingRepo from "@/repositories/parkingRepository";
import { Parking } from "@/types/parking";

export const fetchAllParkings = async (): Promise<Parking[]> => {
  return await parkingRepo.getAllParkings();
};

export const fetchParkingById = async (id: number): Promise<Parking> => {
  const parking = await parkingRepo.getParkingById(id);
  if (!parking) throw new Error("Parking not found");
  return parking;
};

export const registerParking = async (
  name: string,
  total_slots: number,
  status: string
): Promise<number> => {
  if (!name || total_slots === undefined) {
    throw new Error("Missing required fields: Name and Total Slots");
  }

  return await parkingRepo.createParking(
    name,
    total_slots,
    status
  );
};

export const updateParkingService = async (
  id: number,
  name: string,
  total_slots: number,
  status: string
): Promise<void> => {
  if (!id) throw new Error("Invalid id");

  const updated = await parkingRepo.updateParkingRepository(
    id,
    name,
    total_slots,
    status
  );

  if (!updated) throw new Error("Parking not found");
};

export const deleteParkingService = async (id: number): Promise<void> => {
  if (!id) throw new Error("Invalid id");
  const deleted = await parkingRepo.deleteParkingRepository(id);
  if (!deleted) throw new Error("Parking not found");
};