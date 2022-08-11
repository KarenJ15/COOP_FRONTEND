import Swal from "sweetalert2";
import http from "../http-common";
import IClientData from "../models/Client";

const create = async (data: IClientData) => {    
  try {
    console.log(data);
    const response = await http.post<IClientData>("/clients", data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El cliente ha sido creado correctamente',
        confirmButtonText: 'Aceptar'    
      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
};

const retrieve = async (id: number) => {
    return http.get<IClientData>(`/clients/${id}`);
};

const update = async (data: IClientData) => {
  try {    
    const response = await http.put<IClientData>(`/clients/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El cliente ha sido actualizada',
        confirmButtonText: 'Aceptar'    
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
    console.log(error);
  }
    
};

const remove = async (id: number) => {
    try {
      const response = await  http.delete<string>(`/clients/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El cliente ha sido eliminado',
          confirmButtonText: 'Aceptar'    
        });
      }
    } catch (error) {
      Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
    }

};

const list = (page: number, size: number, sort? : String) => {
  const urlRequest : string = "/clients/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IClientData>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/clients/count");
  return response.data;
};

const ClientService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count
};
export default ClientService;