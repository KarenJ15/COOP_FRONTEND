import Swal from "sweetalert2";
import axios from 'axios';
import http from "../http-common";
import IUserData from "../models/User";
import IUserModel from "../models/User"
import IUserTokenModel from "../models/UserToken";
import { showErrorAlert } from "../common/alerts";
const retrieve = async (id: number) => {
    return http.get<IUserData>(`/users/${id}`);
};

const login = async (data: IUserModel)=>{
    const url:string = '/users/login';
    return await http.post<IUserTokenModel>(url, data)
    .then((response)=>{
        console.log(response);
        localStorage.setItem("token", response.data.token);
        console.log("Login Correcto");
    }).catch((error)=>{
        console.log(error);
        showErrorAlert('Error:', error.message);
    });
}

const UserService = {
    retrieve,
    login
};
export default UserService;