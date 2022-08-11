import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ITaxiModel from '../../models/Taxi';
import TaxiService from '../../services/TaxiServices';

import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import httpCommon from "../../http-common";

export const TaxiList = () => {
  
    //Hook: Define un atributo y la función que lo va a actualizar
    const [taxis, setTaxis] = useState<Array<ITaxiModel>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    //Hook para llamar a la Web API
    useEffect(() => {
      getItems();  
      listTaxis(0, itemsPerPage);           
      }, []);

    const handlePageClick = (event: any) => {        
      const numberPage = event.selected;                   
      listTaxis(numberPage, itemsPerPage);
    };

    //Función que llama al Service para listar los datos desde la Web API
    const listTaxis = (page: number, size: number) => {
       TaxiService.list(page, size)
         .then((response: any) => {
           setTaxis(response.data); //Víncula el resultado del servicio con la función del Hook useState
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });
    };

    const getItems = () => {
      TaxiService.count().then((response: any) =>{
        var itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
        setItemsPerPage(5);
        console.log(response);
      }).catch((e : Error)=>{
        console.log(e);
      });
    }

    const removeTaxi = (id: number) => {
        Swal.fire({
            title: '¿Desea eliminar el taxi?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {            
            if (result.isConfirmed) {
                TaxiService.remove(id)
                .then((response: any) => {
                  listTaxis(0,itemsPerPage);
                  console.log(response.data);
                })
                .catch((e: Error) => {
                  console.log(e);
                });      

            }
          });        
     };
   
    return ( 
        <div className='list row'>
            <h1>Hay {itemsCount} taxis</h1>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Placa de licencia</th>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Registration</th>
                        
                            <th>
                              <Link to={"/taxis/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxis && taxis.map((Taxi, index) => (                          
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{Taxi.licensePlate}</td>
                                <td>{Taxi.model}</td>
                                <td>{Taxi.tradeMark}</td>
                                <td>{Taxi.registration}</td>
                        
                                <td>
                        
                                <div className="btn-group" role="group">
                                <Link to={"/taxis/retrieve/" + Taxi.id} className="btn btn-warning">
                                    <FaEye /> Ver
                                  </Link>                                  
                                  <Link to={"/taxis/update/" + Taxi.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link>

                                  <button className="btn btn-danger" onClick={() => removeTaxi(Taxi.id!)}>
                                    <FaTrash /> Eliminar
                                  </button>

                                  
                                </div>
                                    
                                </td>
                            </tr>                        
                        ))}
                    </tbody>
                </table>

                <ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  nextLabel="siguiente >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< anterior"/>

            </div>            
        </div>
     );
}