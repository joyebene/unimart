import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://unimart-backend.onrender.com/api',
});

// Add token to every request if available
API.interceptors.request.use((req) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
    }
    return req;
});

export interface User {
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    profileUrl?: string;
    isVerified: boolean;
    otp?: string;
    otpExpiry?: string;
    department?: string;
    level?: string;
    bio?: string;
    whatsappNum?: string;
    address?: string;
    privacy?:Partial<UserPrivacy>;
    wishlist?: Wishlist[];
    createdAt?: string;
    updatedAt?: string;
}

export interface UserPrivacy {
    _id: string;
    userId?: string;
    showEmail: boolean;
    showWhatsapp: boolean;
    showAddress: boolean;
    showDepartment: boolean;
    showLevel: boolean;
}

export interface Product {
    _id: string;
    title: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    category?: string;
    location?: string;
    availability?: number;
    seller: {
         connect: { id: string },  // Prisma relation connect
         fullName?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface Report {
    _id: string;
    reporter: { _id: string; fullName: string; email: string };
    reportedUser: { _id: string; fullName: string; email: string };
    reason: string;
    createdAt: string;
}

export interface Wishlist {
    _id: string;
    userId: string;
    productId: string;
    product?: Product;
}

export interface RegisterDTO {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface OTPVerifyDTO {
    email: string;
    otp: string;
    purpose?: string;
}

export interface ResetPasswordDTO {
    token?: string;
    email: string;
    otp: string;
    newPassword: string;
}



export const authAPI = {
    register: (data: RegisterDTO) => API.post('/auth/register', data),
    verifyOTP: (data: OTPVerifyDTO) => API.post('/auth/verify-otp', data),
    resendOTP: (email: string) => API.post('/auth/resend-otp', { email }),
    login: (data: LoginDTO) => API.post('/auth/login', data),
    forgotPassword: (email: string) => API.post('/auth/forgot-password', { email }),
    resetPassword: (data: ResetPasswordDTO) => API.post('/auth/reset-password', data),
};

export const userAPI = {
    getMe: () => API.get('/users/me'),
    updateMe: (data: Partial<User>) => API.put('/users/me', data),
    updateProfilePic: (profileUrl: string) => API.put('/users/profile-pic', { profileUrl }),
    changePassword: (data: { currentPassword: string; newPassword: string }) => API.put('/users/change-password', data),
    getById: (id: string) => API.get(`/users/${id}`),
    getWishlist: () => API.get('/users/wishlists'),
    addWishlist: (productId: string) => API.post('/users/add-wishlist', { productId }),
    removeWishlist: (productId: string) => API.delete(`/users/remove-wishlist/${productId}`),
    sendMessage: (data: { toUserId: string; content: string }) => API.post('/users/message/send', data),
    getMyMessages: () => API.get('/users/messages/me'),
    getWithUser: (userId: string) => API.get(`/users/messages/with/${userId}`),
    getUnreadCount: () => API.get("/users/messages/unread-count"),
    markMessageAsRead: (messageId: string) => API.patch(`/users/messages/${messageId}/read`),
};

export const productAPI = {
    getAll: () => API.get('/products'),
    getById: (id: string) => API.get(`/products/${id}`),
    create: (data: Partial<Product>) => API.post('/products', data),
    update: (id: string, data: Partial<Product>) => API.put(`/products/${id}`, data),
    remove: (id: string) => API.delete(`/products/${id}`),
};

export const reportAPI = {
    reportUser: (reportedUserId: string, reason: string) =>
        API.post('/reports', { reportedUserId, reason }),
};

export default API;