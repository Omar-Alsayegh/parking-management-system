"use client";

import { useState } from "react";

export default function ParkingInfo() {
    const [parkingId, setParkingId] = useState("");
    const [parking, setParking] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFetchParkingById = async () => {
        if (!parkingId) return;

        setError(null); 
        try {
            // Hits the dynamic route: /api/parkings/[id]
            const response = await fetch(`/api/parkings/${parkingId}`);

            if (!response.ok) {
                setParking(null);
                if (response.status === 404) {
                    setError("Parking spot not found (404)");
                } else {
                    setError("Server error happened");
                }
                return;
            }

            const data = await response.json();
            setParking(data);
        } catch (err) {
            setError("Failed to connect to the API");
            console.error(err);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Find Parking Spot</h1>
            <input 
                type="number" 
                placeholder="Enter Parking ID" 
                value={parkingId}
                onChange={(e) => setParkingId(e.target.value)}
            />
            <button onClick={handleFetchParkingById}>Fetch Details</button>
            
            <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
                <p><strong>Searching for Spot ID:</strong> {parkingId || "None"}</p>
                
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                {parking ? (
                    <div>
                        <p><strong>Location:</strong> {parking.location}</p>
                        <p><strong>Description:</strong> {parking.description || "No description"}</p>
                        <p><strong>Price:</strong> ${parking.priceperhour}/hr</p>
                        <p><strong>Status:</strong> {parking.reserved_by_id ? "🔴 Reserved" : "🟢 Available"}</p>
                    </div>
                ) : (
                    !error && <p>Search for a parking ID to see details.</p>
                )}
            </div>
        </div>
    );
}