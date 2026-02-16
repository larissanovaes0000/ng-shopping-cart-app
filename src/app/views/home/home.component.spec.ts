import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";

import { HomePageComponent } from "./home.component";
import { ProductsService } from "@services/products-service/products.service";

describe("HomePageComponent", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(
    waitForAsync(() => {
      productsService = jasmine.createSpyObj("ProductsService", ["fetchAll"]);
      productsService.fetchAll.and.returnValue(of([]));

      TestBed.configureTestingModule({
        declarations: [HomePageComponent],
        providers: [{ provide: ProductsService, useValue: productsService }],
      })
        .overrideComponent(HomePageComponent, { set: { template: "" } })
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("loads products stream from service", () => {
    expect(productsService.fetchAll).toHaveBeenCalled();
    expect(component.products$).toBeTruthy();
  });
});
