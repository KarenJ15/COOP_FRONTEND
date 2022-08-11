import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import ITaxiModel from "../../models/Taxi";
import TaxiService from "../../services/TaxiServices";

export const TaxiForm = () => {
	
  const { id }= useParams();
  let navigate = useNavigate();

    //Model vacío
    const initialTaxiModel : ITaxiModel = {
        id: 0 ,
        licensePlate: "", 
        model: " ",
        tradeMark: " ", 
        registration: ""
    };

    //Hooks para gestionar el modelo
    const [taxi, setTaxi] = useState<ITaxiModel>(initialTaxiModel);
    
    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTaxi({ ...taxi, [name]: value });
    };

	// 	const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
	// 		const { name, value } = event.target;
	// 		setTaxi({ ...taxi, [name]: value });
	// };

    const saveTaxi = () => {        
      if(taxi.id !== 0)
      {
        TaxiService.update(taxi)
        .then((response: any) => {
          navigate("/taxis");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      {
			  TaxiService.create(taxi)
          .then((response: any) => {    
            navigate("/taxis");
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };

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


		return ( //JSX
			<div className="submit-form">				
					<div>
						{ taxi.id !== 0 ? (<h1>Actualizado Taxi {taxi.licensePlate}</h1>) : (<h1>Registro de nuevo taxi</h1>) }            
						<div className="form-group">
						<label htmlFor="licensePlate">Placa de matricula</label>
            <input
              type="string"
							placeholder="Ingrese la placa del taxi"
              className="form-control"
              id="licensePlate"
              required
              value={taxi.licensePlate}
              onChange={handleInputChange}
              name="licensePlate"
            />
						<label htmlFor="model">Modelo</label>
            <input						
              type="string"
              className="form-control"
							placeholder="Ingrese el modelo del taxi"
              id="model"
              required
              value={taxi.model}
              onChange={handleInputChange}
              name="model"
            />
						<label htmlFor="registration">Registro</label>
            <input						
              type="string"
              className="form-control"
              id="registration"

              required
              value={taxi.registration}
              onChange={handleInputChange}
              name="registration"
            />
						<label htmlFor="tradeMark">Marca:</label>
            <input						
              type="string"
              className="form-control"
              id="tradeMark"
              required
              value={taxi.tradeMark}
              onChange={handleInputChange}
              name="tradeMark"
            />
						
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/taxis"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" onClick={saveTaxi} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );

}
