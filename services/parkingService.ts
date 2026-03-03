import * as parkingRepo from "@/repositories/parkingRepository";
import { Parking } from "@/types/parking";

export const fetchAllParkings = async (): Promise<Parking[]> => {
  return await parkingRepo.getAllParkings();
};

export const fetchParkingById = async (
  id: number
): Promise<Parking> => {
  const parking = await parkingRepo.getParkingById(id);

  if (!parking) throw new Error("Parking not found");

  return parking;
};

export const registerParking = async (
  name: string,
  location: string,
  description: string,
  price_per_hour: number,
  total_slots: number,
  status: string
): Promise<number> => {
  if (!name || !location || !description) {
    throw new Error("Missing required fields");
  }

  return await parkingRepo.createParking(
    name,
    location,
    description,
    price_per_hour,
    total_slots,
    status
  );
};

export const updateParkingService = async (
  id: number,
  name: string,
  location: string,
  description: string,
  price_per_hour: number,
  total_slots: number,
  status: string
): Promise<void> => {
  if (!id) throw new Error("Invalid id");

  const updated = await parkingRepo.updateParkingRepository(
    id,
    name,
    location,
    description,
    price_per_hour,
    total_slots,
    status
  );

  if (!updated) throw new Error("Parking not found");
};

export const deleteParkingService = async (
  id: number
): Promise<void> => {
  if (!id) throw new Error("Invalid id");

  const deleted = await parkingRepo.deleteParkingRepository(id);

  if (!deleted) throw new Error("Parking not found");
};