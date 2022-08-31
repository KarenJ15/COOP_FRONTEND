import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import IClientModel from '../../models/Client';
import ClientService from '../../services/ClientService';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

export const ClientList = () => {

    //Hook: Define un atributo y la función que lo va a actualizar
    const [clients, setClients] = useState<Array<IClientModel>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    //Hook para llamar a la Web API
    useEffect(() => {
      getItems();  
      listClients(0, itemsPerPage);           
      }, []);

    const handlePageClick = (event: any) => {        
      const numberPage = event.selected;                   
      listClients(numberPage, itemsPerPage);
    };

    //Función que llama al Service para listar los datos desde la Web API
    const listClients = (page: number, size: number) => {
       ClientService.list(page, size)
         .then((response: any) => {
           setClients(response.data); //Víncula el resultado del servicio con la función del Hook useState
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });
    };

    const getItems = () => {
      ClientService.count().then((response: any) =>{
        let itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
        setItemsPerPage(5)
        console.log(response);
      }).catch((e : Error)=> {
        console.log(e);
      });
    }

    const removeClient = (id: number) => {
        Swal.fire({
            title: '¿Desea eliminar el cliente?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {    
            setLoading(true)

            if (result.isConfirmed) {
                ClientService.remove(id)
                .then((response: any) => {
                  listClients(0,itemsPerPage);
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
            <h1>Hay {itemsCount} cliente(s)</h1>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre del cliente</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            <th>
                              <Link to={"/clients/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients && clients.map((Client, index) => (                          
                            <tr key={index}>
                                <td>{++index}</td>
                                
                                <td>{Client.name}</td>                                
                                <td>{Client.cellphone}</td>                                
                                <td>{Client.direction}</td>
                                <td>
                        
                                <div className="btn-group" role="group">
                                {/* <Link to={"/clients/retrieve/" + Client.id} className="btn btn-warning">
                                    <FaEye /> Ver
                                  </Link>                                   */}
                                  {/* <Link to={"/clients/update/" + Client.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link> */}

                                  <button className="btn btn-danger" onClick={() => removeClient(Client.id!)}>
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
