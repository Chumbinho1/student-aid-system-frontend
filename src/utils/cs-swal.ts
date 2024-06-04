import "sweetalert2/src/sweetalert2.scss";

import Swal from "sweetalert2";

const csSwal = {
     fireLoading: (title = "Processando...", text = "Por favor, aguarde...") =>
          Swal.mixin({
               title,
               text,
               allowOutsideClick: false,
               allowEscapeKey: false,
               didOpen: () => {
                    Swal.showLoading();
               },
          }).fire(),
     fireSuccess: (
          title = "Sucesso!",
          text = "Operação concluída com sucesso!",
          timer = 3000,
     ) =>
          Swal.mixin({
               title,
               text,
               timer,
               icon: "success",
               showConfirmButton: false,
               didOpen: () => {
                    Swal.hideLoading();
               },
          }).fire(),

     fireError: (
          title = "Erro!",
          text = "Ocorreu um erro durante a operação!",
          timer = 3000,
     ) =>
          Swal.mixin({
               title,
               text,
               timer,
               icon: "error",
               showConfirmButton: false,
               didOpen: () => {
                    Swal.hideLoading();
               },
          }).fire(),
     close: () => Swal.close(),
};

export default csSwal;
