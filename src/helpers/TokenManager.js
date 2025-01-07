import axios from "axios";

const TokenManager = {
    getAccessToken: () => localStorage.getItem("accessToken"),
    setAccessToken: (token) => localStorage.setItem("accessToken", token),

    getRefreshToken: () => localStorage.getItem("refreshToken"),
    setRefreshToken: (token) => localStorage.setItem("refreshToken", token),

    setUserRole: (role) => localStorage.setItem("userRole", role),
    getUserRole: () => localStorage.getItem("userRole"),

    clearTokens: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
    },

    isTokenExpired: () => {
        const token = TokenManager.getAccessToken();
        if (!token) return true;

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return Date.now() >= decodedToken.exp * 1000;
    },

    getValidAccessToken: async () => {
        const token = TokenManager.getAccessToken();
        if (token && !TokenManager.isTokenExpired()) {
            return token;
        }

        const refreshToken = TokenManager.getRefreshToken();
        const response = await axios.post("/auth/refresh", { refreshToken });
        TokenManager.setAccessToken(response.data.accessToken);
        TokenManager.setRefreshToken(response.data.refreshToken);

        return response.data.accessToken;
    },
};

export default TokenManager;
