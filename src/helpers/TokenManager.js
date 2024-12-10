import axios from "axios";

const TokenManager = {

    getAccessToken: () => localStorage.getItem('accessToken'),
    setAccessToken: (token) => localStorage.setItem('accessToken', token),

    getRefreshToken: () => localStorage.getItem('refreshToken'),
    setRefreshToken: (token) => localStorage.setItem('refreshToken', token),

    clearTokens: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    isTokenExpired: () => {
        const token = TokenManager.getAccessToken();
        if (!token) return true;

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const exp = decodedToken.exp * 1000;
        return Date.now() > exp;
    },

    isRefreshing: false,
    refreshSubscribers: [],

    onRefreshed: function(callback) {
        this.refreshSubscribers.push(callback);
    },

    notifySubscribers: function(newToken) {
        this.refreshSubscribers.forEach((callback) => callback(newToken));
        this.refreshSubscribers = [];
    },

    getValidAccessToken: async function() {
        const token = this.getAccessToken();

        if (token && !this.isTokenExpired()) {
            return token;
        }

        if (!this.isRefreshing) {
            this.isRefreshing = true;

            try {
                const refreshToken = this.getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post('/refresh-token', {
                    refreshToken,
                });

                this.setAccessToken(response.data.accessToken);
                this.setRefreshToken(response.data.refreshToken);

                this.isRefreshing = false;
                this.notifySubscribers(response.data.accessToken);

                return response.data.accessToken;
            } catch (error) {
                this.isRefreshing = false;
                this.clearTokens();
                window.location.href = '/';
                throw error;
            }
        } else {
            return new Promise((resolve, reject) => {
                this.onRefreshed((newToken) => {
                    resolve(newToken);
                });
            });
        }
    },

};

export default TokenManager;
