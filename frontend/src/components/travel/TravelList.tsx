import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ITravelModel from '../../models/Travel';
import TravelService from '../../services/TravelService';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";


// type AppProps = {
//   idTaxi : number;
// }

export const TravelList = (/*props: AppProps*/) => {

    //Hook: Define un atributo y la función que lo va a actualizar
    const [travels, setTravels] = useState<Array<ITravelModel>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [idTaxi,setIdTaxi] = useState(0);


    //Hook para llamar a la Web API
    useEffect(() => {
      getItems();  
      listTravels(0, itemsPerPage);           
      }, [idTaxi]);

    const handlePageClick = (event: any) => {        
      const numberPage = event.selected;                   
      listTravels(numberPage, itemsPerPage);
    };

    const handleIdTaxi = (event: ChangeEvent<HTMLInputElement>) => {
      setIdTaxi(~~event.target.value);
    };

    //Función que llama al Service para listar los datos desde la Web API
    const listTravels = (page: number, size: number) => {
       TravelService.list(idTaxi,page, size)
         .then((response: any) => {
           setTravels(response.data); //Víncula el resultado del servicio con la función del Hook useState
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });
    };

    const getItems = () => {
      TravelService.count(idTaxi).then((response: any) =>{
        let itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
        setItemsPerPage(5)
        console.log(response);
      }).catch((e : Error)=> {
        console.log(e);
      });
    }

    const removeTravel = (id: number) => {
        Swal.fire({
            title: '¿Desea eliminar el viaje?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {    
            setLoading(true)

            if (result.isConfirmed) {
                TravelService.remove(id, idTaxi)
                .then((response: any) => {
                  listTravels(0,itemsPerPage);
                  console.log(response.data);
                })
                .catch((e: Error) => {
                  console.log(e);
                });      

            }
          });
          
        setLoading(false)
     };
   
    return ( 
        <div className='list row'>
            <h1>Hay {itemsCount} viaje(s)</h1>
            <div className='col-md-12'>
            <label htmlFor="idTaxi">Taxi a Realizar los Viajes</label>
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
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Origen del viaje</th>
                            <th>Destino del viaje</th>
                            <th>Costo</th>
                            <th>
                              <Link to={"/travels/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {travels && travels.map((Travel, index) => (                          
                            <tr key={index}>
                                <td>{++index}</td>
                                
                                <td>{Travel.origin}</td>                                
                                <td>{Travel.destination}</td>                                
                                <td>{Travel.cost}</td>
                                <td>
                        
                                <div className="btn-group" role="group">
                                <Link to={"/travels/retrieve/"+idTaxi+"/"+Travel.id} className="btn btn-warning">
                                    <FaEye /> Ver
                                  </Link>                                  
                                  <Link to={"/travels/update/"+idTaxi+"/"+Travel.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link>

                                  <button className="btn btn-danger" onClick={() => removeTravel(Travel.id!)}>
                                    <FaTrash /> Eliminar
                                  </button>

                                  
                                </div>
                                    
                                </td>
                            </tr>                        
                        ))}
                    </tbody>
                </table>

                <ReactPaginate
                  activeClassName="page-item active"                
                  pageLinkClassName="page-link"
                  containerClassName="pagination"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  breakLabel="..."
                  nextLabel=">>"
                  pageClassName="page-item"
                  onPageChange={handlePageClick}                  
                  pageCount={pageCount}
                  previousLabel="<<"/>

            </div>            
        </div>
     );
}
