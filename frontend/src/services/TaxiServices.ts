import Swal from "sweetalert2";
import http from "../http-common";
import ITaxiData from "../models/Taxi";

const create = async (data: ITaxiData) => {    
  try {
    const response = await http.post<ITaxiData>("/taxis", data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El taxi ha sido creado correctamente',
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
    return http.get<ITaxiData>(`/taxis/${id}`);
};

const update = async (data: ITaxiData) => {
  try {    
    const response = await http.put<ITaxiData>(`/taxis/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El taxi ha sido actualizado',
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
      const response = await  http.delete<string>(`/taxis/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El taxi ha sido eliminado',
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
  const urlRequest : string = "/taxis/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<ITaxiData>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/taxis/count");
  return response.data;
};

const TaxiService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count
};
export default TaxiService;
