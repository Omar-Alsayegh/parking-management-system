"use client";

import { useState } from "react";

export default function ParkingInfo() {
    // 1. States for input, data, and errors
    const [parkingId, setParkingId] = useState("");
    const [parking, setParking] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFetchParkingById = async () => {
        if (!parkingId) return;

        setError(null); 
        try {
            // 2. Fetch from the parking API endpoint
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
            <h1>Parking Spot Details</h1>
            <input 
                type="number" 
                placeholder="Enter Parking ID" 
                value={parkingId}
                onChange={(e) => setParkingId(e.target.value)}
            />
            <button onClick={handleFetchParkingById}>Check Spot</button>
            
            <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
                <p><strong>Searching for Spot ID:</strong> {parkingId || "None"}</p>
                
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                {parking ? (
                    <div>
                        <p><strong>Spot Status:</strong> {parking.reserved_by_id ? "🔴 Reserved" : "🟢 Available"}</p>
                        <p><strong>Location:</strong> {parking.location_name || "Main Lot"}</p>
                        {parking.reserved_by_id && (
                            <p style={{ color: "gray" }}>Reserved by User ID: {parking.reserved_by_id}</p>
                        )}
                    </div>
                ) : (
                    !error && <p>Enter an ID to see if the spot is available.</p>
                )}
            </div>
        </div>
    );
}