import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, Router, useNavigate, useParams } from "react-router-dom";
import App from "../../App";
import { showErrorAlert } from "../../common/alerts";
import IUserModel from "../../models/User";
import IUserTokenModel from "../../models/User";

import UserService from "../../services/UserService";

export const UserForm = () => {
  
    let navigate = useNavigate();

    //Hooks para gestionar el modelo
    const [user, setUser] = useState<IUserModel>({name: "", password: ""});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => {
        UserService.login(user)
        .then((response: any) =>{
          navigate("/");
          
        }).catch((e: Error) =>{
          console.log(e.message);
        })
    }

    /*const handleSubmit=(event: SubmitEvent<H>)=>{
        if(user!==undefined &&password!==undefined){
           UserService.login(user)
        }
    } */
        
        return (
          
          <div className="row justify-content-center">
            <div className="card p-4 col-4">
              <h2 className="text-center mb-3">Login</h2>
              <div className="mb-4">
                <label htmlFor="name" className="mb-3">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  id="name"
                  required
                  value={user.name}
                  onChange={handleInputChange}
                  name="name"
                ></input>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="mb-3">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  id="password"
                  required
                  value={user.password}
                  onChange={handleInputChange}
                  name="password"
                ></input>
              </div>
              <button type="submit" onClick={login} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
          
        );

}
export default UserForm;