import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";

import { HomePageComponent } from "./home.component";
import { ProductsService } from "@services/products/products.service";
import { ViewportService } from "@services/viewport/viewport.service";

describe("HomePageComponent", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let productsService: Partial<ProductsService>;
  let viewportService: Partial<ViewportService>;

  beforeEach(async(() => {
    productsService = { products$: of([]) };
    viewportService = { isMobile$: of(false) };

    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        { provide: ProductsService, useValue: productsService },
        { provide: ViewportService, useValue: viewportService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(HomePageComponent, { set: { template: "" } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("loads products stream from service", () => {
    expect(component.products$).toBeTruthy();
  });

  it("toggles sort options", () => {
    expect(component.showSortOptions).toBe(false);
    component.toggleSortOptions();
    expect(component.showSortOptions).toBe(true);
  });
});
