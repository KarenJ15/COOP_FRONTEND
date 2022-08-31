import Swal from "sweetalert2";

export const showAlert = (title: string, message : string) => {   
        Swal.fire({
          icon: 'success',
          title: title,
          text: message,
          confirmButtonText: 'Aceptar'      
        });   
}

export const showErrorAlert = (title: string, message : string) => {
    Swal.fire({
       icon: 'error',
       title: title,
       text: message,
       confirmButtonText: 'Aceptar'      
    });    
}