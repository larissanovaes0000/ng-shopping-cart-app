import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from "@services/alert/alert.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.alertService.error(this.getErrorMessage(error));
        return throwError(error);
      }),
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }

    if (error.status === 0) {
      return "Falha de conexão com o servidor.";
    }

    if (error.status >= 500) {
      return "Erro interno do servidor. Tente novamente mais tarde.";
    }

    if (error.status >= 400) {
      return "Não foi possível processar a solicitação.";
    }

    return "Ocorreu um erro inesperado.";
  }
}
