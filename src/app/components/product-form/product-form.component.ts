import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "@services/alert/alert.service";
import { ProductsService } from "@services/products/products.service";

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {}

  form = this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    price: [null, [Validators.required, Validators.min(0)]],
    imgUrl: ["", Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.productsService.createProduct(this.form.value).subscribe({
      next: () => {
        this.alertService.success("Produto criado com sucesso!");
        this.form.reset();
      },
      error: () => this.alertService.error("Erro ao criar produto"),
    });
  }

  onReset() {
    this.form.reset();
  }
}
