import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertService } from '@services/alert/alert.service';
import { of } from 'rxjs';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async(() => {
    alertService = jasmine.createSpyObj('AlertService', ['clear'], {
      alert$: of(null),
    });

    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [{ provide: AlertService, useValue: alertService }],
    })
    .overrideComponent(AlertComponent, { set: { template: '' } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closes alert', () => {
    component.close();
    expect(alertService.clear).toHaveBeenCalled();
  });
});
