import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ITaxiModel from "../../models/Taxi";
import TaxiService from "../../services/TaxiServices";
export const TaxiCard = () => {

    const { id }= useParams();

  const [taxi, setTaxi] = useState<ITaxiModel>();

  useEffect(() => {
    if (id)
      getTaxi(id);
  }, [id]);


  const getTaxi = (id: any) => {
    TaxiService.retrieve(id)
      .then((response: any) => {
        setTaxi(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 };

    return (
      <div>
      { 
        taxi ? (
          <div>          
          <h2>{taxi.licensePlate}</h2>
          <p>{taxi.model}</p>
          <ul>
            <li> <strong>Registro :</strong>  {taxi.registration} </li>
            <li>Trade Mark: {taxi.tradeMark}</li>
          </ul>
          
          <br />
							<div className="btn-group" role="group">								
                <Link to={"/taxis"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>

								<button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
							</div>
          </div>

        ) : 
        ( 
          <h1>No hay un taxi activo</h1>
        )
      }
      </div>
    );
}