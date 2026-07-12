const API_URL = "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("transitops_token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`
    })
  };
};

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || data.message || "Request failed"
    );
  }

  return data;
};

export const api = {

  // ===================
  // LOGIN
  // ===================

  login: async (credentials) => {

    const res = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      }
    );

    const data = await handleResponse(res);

    localStorage.setItem(
      "transitops_token",
      data.token
    );

    localStorage.setItem(
      "transitops_user",
      JSON.stringify(data.user)
    );

    return data;
  },

  // ===================
  // REGISTER
  // ===================

  register: async (userData) => {

    const res = await fetch(
      `${API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      }
    );

    const data = await handleResponse(res);

    localStorage.setItem(
      "transitops_token",
      data.token
    );

    localStorage.setItem(
      "transitops_user",
      JSON.stringify(data.user)
    );

    return data;
  },

  logout: () => {
    localStorage.removeItem("transitops_token");
    localStorage.removeItem("transitops_user");
  },

  // ===================
  // VEHICLES
  // ===================

  getVehicles: async () => {
    const res = await fetch(
      `${API_URL}/vehicles`,
      {
        headers: getHeaders()
      }
    );

    return handleResponse(res);
  },

  createVehicle: async (vehicle) => {

    const res = await fetch(
      `${API_URL}/vehicles`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(vehicle)
      }
    );

    return handleResponse(res);
  },

  // ===================
  // DRIVERS
  // ===================

  getDrivers: async () => {

    const res = await fetch(
      `${API_URL}/drivers`,
      {
        headers: getHeaders()
      }
    );

    return handleResponse(res);
  },

  // ===================
  // TRIPS
  // ===================

  getTrips: async () => {

    const res = await fetch(
      `${API_URL}/trips`,
      {
        headers: getHeaders()
      }
    );

    return handleResponse(res);
  },

  dispatchTrip: async (tripData) => {

    const res = await fetch(
      `${API_URL}/trips/dispatch`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(tripData)
      }
    );

    return handleResponse(res);
  },

  // ===================
  // FINANCE
  // ===================

  getOperationalCosts: async () => {

    const res = await fetch(
      `${API_URL}/finance/costs`,
      {
        headers: getHeaders()
      }
    );

    return handleResponse(res);
  },

  // ===================
  // DASHBOARD
  // ===================

  getDashboardData: async () => {

    const [vehicles, trips, drivers] =
      await Promise.all([
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