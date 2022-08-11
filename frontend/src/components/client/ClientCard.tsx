import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import IClientModel from "../../models/Client";
import ClientService from "../../services/ClientService";

export const ClientCard = () => {
  const { id }= useParams();

  const [client, setClient] = useState<IClientModel>();

  useEffect(() => {
    if (id)
      getClient(id);
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

    return (
      <div>
      { 
        client ? (
          <div>          
          <h2>{client.name}</h2>
          <ul>
            <li> <strong>Telefono: </strong>  {client.cellphone}</li>
            <li> <strong>Direccion: </strong>  {client.direction}</li>
          </ul>
          <br />
              <div className="btn-group" role="group">                
                <Link to={"/clients"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
                <button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
              </div>
          </div>

        ) : 
        ( 
          <h1>No hay un cliente activo</h1>
        )
      }
      </div>
    );
}