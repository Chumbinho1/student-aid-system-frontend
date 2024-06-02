import "sweetalert2/src/sweetalert2.scss";

import Swal from "sweetalert2";

const csSwal = {
     fireLoading: (title = "Processando...", text = "Por favor, aguarde...") =>
          Swal.mixin({
               title,
               text,
               didOpen: () => {
                    Swal.showLoading();
               },
          }).fire(),
     fireSuccess: (
          title = "Sucesso!",
          text = "Operação concluída com sucesso!",
     ) =>
          Swal.mixin({
               title,
               text,
               icon: "success",
               didOpen: () => {
                    Swal.hideLoading();
               },
               showConfirmButton: false,
          }).fire(),

     fireError: (
          title = "Erro!",
          text = "Ocorreu um erro durante a operação!",
     ) =>
          Swal.mixin({
               title,
               text,
               icon: "error",
               showConfirmButton: false,
               didOpen: () => {
                    Swal.hideLoading();
               },
          }).fire(),
};

export default csSwal;
