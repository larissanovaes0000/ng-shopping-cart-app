import { Component, OnInit } from '@angular/core';
import { AlertService } from '@services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alert$ = this.alertService.alert$;

  constructor(private alertService: AlertService) {}
  
  ngOnInit(): void {}

  close() {
    this.alertService.clear();
  }
}
