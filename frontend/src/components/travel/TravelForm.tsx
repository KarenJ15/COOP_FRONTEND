
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ITravelModel from "../../models/Travel";
import TravelService from "../../services/TravelService";


export const TravelForm = () => {
  
  const { id , idTaxiR }= useParams();
 
  
  let navigate = useNavigate();

    //Model vacío
    const initialTravelModel : ITravelModel = {
        id : null,
        origin: "", 
        destination: "",
        cost:0.0,
    };
    
    //Hooks para gestionar el modelo
    const [travel, setTravel] = useState<ITravelModel>(initialTravelModel);
    const [idTaxi,setIdTaxi] = useState(0);
    
    
    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTravel({ ...travel, [name]: value });
    };
    const handleIdTaxi = (event: ChangeEvent<HTMLInputElement>) => {
        setIdTaxi(~~event.target.value);
    };

    const saveTravel = () => {        
      if(travel.id !== null)
      {
        TravelService.update(travel, idTaxiR)
        .then((response: any) => {
          navigate("/travels");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      {
        TravelService.create(travel, idTaxi)
          .then((response: any) => {    
            navigate("/travels");
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };

    useEffect(() => {
      if(id){
        getTravel(id);
        console.log(id);
      }
    }, [id]);

    useEffect(() => {
      if(idTaxiR !== undefined){setIdTaxi(~~idTaxiR);} else { setIdTaxi(0);}
      
    },[idTaxiR]);

    const getTravel = (id: any) => {
      TravelService.retrieve(id,idTaxiR)
        .then((response: any) => {
          setTravel(response.data.travel); //Víncula el resultado del servicio con la función del Hook useState
          console.log(response.data.travel);
        })
        .catch((e: Error) => {
          console.log(e);
        });
   };

    return ( //JSX
      <div className="submit-form">       
          <div>
            { travel.id !== null ? (<h1>Viaje actualizado en {travel.origin}</h1>) : (<h1>Registro de nuevo viaje</h1>) }          
            <div className="form-group">
            <label htmlFor="idTaxi">Taxi Asignado</label>
            <input            
              type="number"
              className="form-control"
              placeholder="Taxi"
              id="idTaxi"
              required
              value={idTaxi}
              onChange={handleIdTaxi}
              name="idTaxi"
            />
            <label htmlFor="origin">Origen del viaje</label>
            <input            
              type="string"
              className="form-control"
              placeholder="Origen"
              id="origin"
              required
              value={travel.origin}
              onChange={handleInputChange}
              name="origin"
            />

            <label htmlFor="destination">Destino del viaje</label>
            <input            
              type="string"
              className="form-control"
              placeholder="Destino"
              id="destination"
              required
              value={travel.destination}
              onChange={handleInputChange}
              name="destination"
            />

            <label htmlFor="cost">Costo</label>
            <input            
              type="text"
              className="form-control"
              placeholder="Costo"
              id="cost"
              required
              onChange={handleInputChange}
              value={travel.cost}
              name="cost"
            />
            <br />
              <div className="btn-group" role="group">                
                <Link to={"/exercises"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
                <button type="button" onClick={saveTravel} className="btn btn-success">
                  <FaSave />Guardar
                </button>
              </div>
            </div>
          </div>        
      </div>        
    );

}