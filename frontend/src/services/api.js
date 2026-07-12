// src/services/api.js

const API_URL = "http://localhost:5000/api";

// Helper to get Authorization headers
const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

// Helper to handle fetch responses
const handleResponse = async (res) => {
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;
};

export const api = {

    // ==========================
    // AUTHENTICATION
    // ==========================

    login: async (credentials) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await handleResponse(res);

        // Save JWT
        localStorage.setItem("token", data.token);

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    },

    register: async (userData) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await handleResponse(res);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    // ==========================
    // VEHICLES
    // ==========================

    getVehicles: async () => {
        const res = await fetch(`${API_URL}/vehicles`, {
            method: "GET",
            headers: getHeaders()
        });

        return await handleResponse(res);
    },

    createVehicle: async (vehicleData) => {
        const res = await fetch(`${API_URL}/vehicles`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(vehicleData)
        });

        return await handleResponse(res);
    },

    // ==========================
    // DRIVERS
    // ==========================

    getDrivers: async () => {
        const res = await fetch(`${API_URL}/drivers`, {
            method: "GET",
            headers: getHeaders()
        });

        return await handleResponse(res);
    },

    // ==========================
    // TRIPS
    // ==========================

    getTrips: async () => {
        const res = await fetch(`${API_URL}/trips`, {
            method: "GET",
            headers: getHeaders()
        });

        return await handleResponse(res);
    },

    dispatchTrip: async (tripData) => {
        const res = await fetch(`${API_URL}/trips/dispatch`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(tripData)
        });

        return await handleResponse(res);
    },

    // ==========================
    // FINANCE
    // ==========================

    getOperationalCosts: async () => {
        const res = await fetch(`${API_URL}/finance/costs`, {
            method: "GET",
            headers: getHeaders()
        });

        return await handleResponse(res);
    },

    // ==========================
    // DASHBOARD
    // ==========================

    getDashboardData: async () => {
        const [vehicles, trips, drivers] = await Promise.all([
            api.getVehicles(),
            api.getTrips(),
            api.getDrivers()
        ]);

        return {
            vehicles,
            trips,
            drivers
        };
    }
};