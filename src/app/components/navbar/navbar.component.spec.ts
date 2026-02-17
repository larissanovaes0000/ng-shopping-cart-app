import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ASSETS } from 'app/core/constants/assets.constants';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .overrideComponent(NavbarComponent, { set: { template: '' } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose logo asset path', () => {
    expect(component.logo).toBe(ASSETS.LOGO);
  });
});
