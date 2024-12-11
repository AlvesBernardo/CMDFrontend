import axios from "axios";

const TokenManager = {
    getAccessToken: () => localStorage.getItem("accessToken"),
    setAccessToken: (token) => localStorage.setItem("accessToken", token),

    getRefreshToken: () => localStorage.getItem("refreshToken"),
    setRefreshToken: (token) => localStorage.setItem("refreshToken", token),

    clearTokens: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
        const response = await axios.post("/refresh-token", { refreshToken });
        TokenManager.setAccessToken(response.data.accessToken);
        TokenManager.setRefreshToken(response.data.refreshToken);

        return response.data.accessToken;
    },
};

export default TokenManager;
