import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart-service/cart.service';
import { Subject } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let ServiceMock: CartService;

  beforeEach(async(() => {
    ServiceMock = jasmine.createSpyObj('CartServiceMock',{
      getCartUpdates: new Subject(),
      getTotalUpdates: new Subject(),
      getStoredCartItems: void 0
    });

    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [
        { provide: CartService, useValue: ServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
