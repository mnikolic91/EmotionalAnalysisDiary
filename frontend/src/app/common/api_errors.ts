import Swal from 'sweetalert2';
import {throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export function handleErrors(error: HttpErrorResponse) {
  if (error.status == 500 || error.status == 501 || error.status == 502 || error.status == 503 || error.status === 504) {
    let html = '<h4><strong>Dogodila se neočekivana pogreška:</strong></h4>';
    html += "<ul class='list-none'>";
    html += '<li>Provjerite Internet vezu</li>';
    html += '<li>Provjerite podatke koje ste unijeli</li>';
    html += '</ul>';
    Swal.fire({
      html: html,
      icon: 'error',
      allowOutsideClick: false
    }).then();
  } else {
    Swal.fire({
      html: prettyPrintJSON(error.error),
      icon: 'error',
      allowOutsideClick: false
    }).then();
  }
  return throwError(() => error);
}

function prettyPrintJSON(errors: any): string {
  let html = ''
  if (errors instanceof ArrayBuffer) {
    errors = JSON.parse(new TextDecoder().decode(errors));
  }
  Object.entries(errors).forEach(([k, v]) => {
    html += `<h4><strong>${k}:</strong></h4><ul>`
    if (typeof v === 'string') {
      html += `<li>${v}</li>`
    } else if (v instanceof Array) {
      v.forEach(item => {
        if (typeof item === 'string') {
          html += `<li>${item}</li><br>`
        } else {
          html += `<li>${k} ${v.indexOf(item) + 1}: ${JSON.stringify(item, null, 2)}</li><br>`
        }
      });
    }
  });
  return html;
}
