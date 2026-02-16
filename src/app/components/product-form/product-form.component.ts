import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "@services/alert/alert.service";
import { ProductsService } from "@services/products-service/products.service";

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.alertService.success("Produto criado com sucesso!")
  }

  form = this.fb.group({
    name: ["", Validators.required],
    description: [""],
    price: [null, [Validators.required, Validators.min(0)]],
    imgUrl: [""],
  });

  onSubmit() {
    if (this.form.invalid) return;

    console.log("Product:", this.form.value);

    this.productService.createProduct(this.form.value).subscribe({
      next: () => this.alertService.success("Produto criado com sucesso!"),
      error: () => this.alertService.error("Erro ao criar produto"),
    });
  }

  onReset() {
    this.form.reset();
  }
}
