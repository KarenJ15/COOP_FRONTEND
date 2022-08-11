import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ITravelModel from "../../models/Travel";
import TravelService from "../../services/TravelService";

export const TravelCard = () => {
  const { id , idTaxiR }= useParams();

  const [travel, setTravel] = useState<ITravelModel>();

  useEffect(() => {
    if (id)
      getTravel(id);
  }, [id]);

  const getTravel = (id: any) => {
    TravelService.retrieve(id, idTaxiR)
      .then((response: any) => {
        setTravel(response.data.travel); //Víncula el resultado del servicio con la función del Hook useState
        console.log("si")
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 };

    return (
      <div>
      { 
        travel ? (
          <div>          
          <h2>{travel.destination}</h2>
          <p>{travel.origin}</p>
          <ul>
            <li> <strong>Costo del viaje: </strong>  {travel.cost}</li>
          </ul>
          <br />
              <div className="btn-group" role="group">                
                <Link to={"/travels"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
                <button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
              </div>
          </div>

        ) : 
        ( 
          <h1>No hay un viaje activo</h1>
        )
      }
      </div>
    );
}