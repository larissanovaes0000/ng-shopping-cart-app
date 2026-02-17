import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type AlertType = "success" | "danger" | "warning" | "info";

@Injectable({ providedIn: "root" })
export class AlertService {
  private alertSubject = new BehaviorSubject<{
    message: string;
    type: AlertType;
  } | null>(null);

  alert$ = this.alertSubject.asObservable();

  success(message: string) {
    this.emit(message, "success");
  }

  error(message: string) {
    this.emit(message, "danger");
  }

  warning(message: string) {
    this.emit(message, "warning");
  }

  info(message: string) {
    this.emit(message, "info");
  }

  clear() {
    this.alertSubject.next(null);
  }

  private emit(message: string, type: AlertType) {
    this.alertSubject.next({ message, type });
   // setTimeout(() => this.clear(), 3000);
  }
}
