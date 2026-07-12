// Base URL for your local hackathon backend
const API_URL = 'http://localhost:5000/api';

// Helper to get the token from localStorage
const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const api = {
    // Authentication
    login: async (credentials) => {
        // Hackathon Mock: Replace with actual fetch when backend is ready
        // const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', body: JSON.stringify(credentials), headers: { 'Content-Type': 'application/json' }});
        // return res.json();

        return { token: 'mock-token', user: { email: credentials.email, role: credentials.role } };
    },

    // Vehicles
    getVehicles: async () => {
        const res = await fetch(`${API_URL}/vehicles`, { headers: getHeaders() });
        return res.json();
    },

    // Trips
    dispatchTrip: async (tripData) => {
        const res = await fetch(`${API_URL}/trips/dispatch`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(tripData)
        });
        return res.json();
    },

    // Finance
    getOperationalCosts: async () => {
        const res = await fetch(`${API_URL}/finance/costs`, { headers: getHeaders() });
        return res.json();
    }
};