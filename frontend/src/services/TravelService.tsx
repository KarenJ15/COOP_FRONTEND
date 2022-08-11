import Swal from "sweetalert2";
import http from "../http-common";
import ITravelData from "../models/Travel";

const create = async (data: ITravelData, idTaxi: number) => {
  try {
    const response = await http.post<ITravelData>(`/taxis/${idTaxi}/travels`, data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El viaje ha sido creado correctamente',
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

const retrieve = async (id: number, idTaxi : any) => {
    return http.get<ITravelData>(`/taxis/${idTaxi}/travels/${id}`);
};

const update = async (data: ITravelData, idTaxi : any) => {
  try {    
    const response = await http.put<ITravelData>(`/taxis/${idTaxi}/travels/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El viaje ha sido actualizado',
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

const remove = async (id: number, idTaxi : number) => {
    try {
      const response = await  http.delete<string>(`/taxis/${idTaxi}/travels/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El viaje ha sido eliminado',
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

const list = (idTaxi : number, page: number, size: number, sort? : String) => {
  const urlRequest : string = `/taxis/${idTaxi}/travels`;
  console.log(urlRequest);
  return http.get<Array<ITravelData>>(urlRequest);
};

const count = async (idTaxi : number) =>  {  
  const response = await http.get<number>(`/taxis/${idTaxi}/travels/count`);
  return response.data;
};

const TravelService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count
};
export default TravelService;
