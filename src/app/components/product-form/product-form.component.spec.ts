import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertService } from "@services/alert/alert.service";
import { ProductsService } from "@services/products/products.service";
import { of, throwError } from "rxjs";

import { ProductFormComponent } from "./product-form.component";

describe("ProductFormComponent", () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async(() => {
    productsService = jasmine.createSpyObj("ProductsService", ["createProduct"]);
    alertService = jasmine.createSpyObj("AlertService", ["success", "error"]);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductFormComponent],
      providers: [
        { provide: ProductsService, useValue: productsService },
        { provide: AlertService, useValue: alertService },
      ],
    })
      .overrideComponent(ProductFormComponent, { set: { template: "" } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("does not submit invalid form", () => {
    component.onSubmit();
    expect(productsService.createProduct).not.toHaveBeenCalled();
    expect(component.form.get("name")?.touched).toBe(true);
  });

  it("submits valid form and converts price", () => {
    productsService.createProduct.and.returnValue(of({ id: 1 } as any));

    component.form.patchValue({
      name: "Produto",
      description: "Descricao",
      price: "R$ 1.234,56",
      imgUrl: "https://img",
    });

    component.onSubmit();

    expect(productsService.createProduct).toHaveBeenCalledWith(
      jasmine.objectContaining({
        name: "Produto",
        description: "Descricao",
        imgUrl: "https://img",
        price: 1234.56,
      }),
    );
    expect(alertService.success).toHaveBeenCalled();
  });

  it("shows error when create fails", () => {
    productsService.createProduct.and.returnValue(throwError("err"));

    component.form.patchValue({
      name: "Produto",
      description: "Descricao",
      price: "R$ 10,00",
      imgUrl: "https://img",
    });

    component.onSubmit();

    expect(alertService.error).toHaveBeenCalledWith("Erro ao criar produto");
  });

  it("resets form", () => {
    component.form.patchValue({ name: "Produto" });
    component.onReset();
    expect(component.form.get("name")?.value).toBeNull();
  });
});
