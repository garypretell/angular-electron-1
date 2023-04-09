import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MODAL_ALERT } from '../../core/constants/modal-title';
import { ModalService } from '../services/modal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  modalService = inject(ModalService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err && (err.status === 401 || err.status === 403)) {
          this.openModalError(err.error.error.description);
        }
        if (err.status === 412) {
          this.openModalError(err.error.mensaje);
        } else {
          this.openModalError(err.error.error_description);
        }
        const errorM = err.error || err.statusText;
        return throwError(() => errorM);
      })
    );
  }

  // Mostrar modal de alerta
  openModalError(msg: string): any {
    MODAL_ALERT.title = 'Alerta';
    MODAL_ALERT.message = msg ? msg : 'Hubo un problema al ejecutar su operación.';
    MODAL_ALERT.show = true;
    MODAL_ALERT.check = false;
    this.modalService.modalData = MODAL_ALERT;
  }
}
