import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@services/alert/alert.service";
import { ProductsService } from "@services/products/products.service";

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(30)]],
      description: ["", [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(1)]],
      imgUrl: ["", Validators.required],
    });
  }

  onSubmit() {
    if(this.form.valid){
      const rawPrice = this.form.value.price.replace("R$", "").replace(/\./g, "").replace(",", ".");
      const payload = {...this.form.value, price: Number(rawPrice)};
      this.productsService.createProduct(payload).subscribe({
        next: () => {
          this.alertService.success("Product created successfully");
          this.form.reset();
        },
        error: () => this.alertService.error("Something went wrong while creating the product"),
      });
    } else {
      this.form.markAllAsTouched();
      return;
    }
  }

  onReset() {
    this.form.reset();
  }

  hasError(controlName: string, error: string) {
    const control = this.form.get(controlName);
    return control?.touched && control?.hasError(error);
  }
}
