

import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async login(email, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            console.log(response)
            return response.data;

        }catch(err){
            throw err;
        }
    }


    static async verifylogin(email, otp){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/verify-otp`, {email, otp})
            return response.data;

        }catch(err){
            throw err;
        }
    }


    static async logout(email, transactionId) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/logout`, { email, transactionId });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    


    static async register(user, token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, user, config);
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else {
                throw error;
            }
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getUserByempId(userempId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users-by-empid/${userempId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }




    /**AUTHENTICATION CHECKER */
    // static logout(){
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('role')
    // }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return UserService.isAuthenticated() && UserService.isAdmin();
    }

}

export default UserService;
