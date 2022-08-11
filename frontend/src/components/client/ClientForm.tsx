import React, { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IClientModel from "../../models/Client";
import ClientService from "../../services/ClientService";

export const ClientForm = () => {
  
  const { id }= useParams();
  let navigate = useNavigate();

    //Model vacío
    const initialClientModel : IClientModel = {
        id: null,
        name:"",
        cellphone:"",
        direction:""
    };

    //Hooks para gestionar el modelo
    const [client, setClient] = useState<IClientModel>(initialClientModel);
    
    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    };

    const saveClient = () => {        
      if(client.id !== null)
      {
        ClientService.update(client)
        .then((response: any) => {
          navigate("/clients");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      {
        ClientService.create(client)
          .then((response: any) => {    
            navigate("/clients");
            console.log(client);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };

    useEffect(() => {
      if(id){
        getClient(id);
        console.log(id);
      }
    }, [id]);

    const getClient = (id: any) => {
      ClientService.retrieve(id)
        .then((response: any) => {
          setClient(response.data); //Víncula el resultado del servicio con la función del Hook useState
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
   };

    return ( //JSX
      <div className="submit-form">       
          <div>
            { client.id !== null ? (<h1>Cliente actualizado en {client.name}</h1>) : (<h1>Registro de nuevo cliente</h1>) }            
            <div className="form-group">
            <label htmlFor="name">Nombre del cliente</label>
            <input            
              type="string"
              className="form-control"
              placeholder="Ingrese el nombre del cliente"
              id="name"
              required
              value={client.name}
              onChange={handleInputChange}
              name="name"
            />

            <label htmlFor="cellphone">Telefono</label>
            <input            
              type="string"
              className="form-control"
              placeholder="Ingrese el telefono del cliente"
              id="cellphone"
              required
              value={client.cellphone}
              onChange={handleInputChange}
              name="cellphone"
            />

            <label htmlFor="direction">Direccion</label>
            <input            
              type="text"
              className="form-control"
              placeholder="Ingrese la direccion del cliente"
              id="direction"
              required
              onChange={handleInputChange}
              value={client.direction}
              name="direction"
            />
            <br />
              <div className="btn-group" role="group">                
                <Link to={"/clients"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
                <button type="button" onClick={saveClient} className="btn btn-success">
                  <FaSave />Guardar
                </button>
              </div>
            </div>
          </div>        
      </div>        
    );

}