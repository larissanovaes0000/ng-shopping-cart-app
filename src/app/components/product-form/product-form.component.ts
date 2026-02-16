import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  form = this.fb.group({
    name: ["", Validators.required],
    description: [""],
    price: [null, [Validators.required, Validators.min(0)]],
    imgUrl: [""],
  });

  onSubmit() {
    if (this.form.invalid) return;

    console.log("Product:", this.form.value);

    // aqui você pode chamar um service
    // this.productService.create(this.form.value);
  }

  onReset() {
    this.form.reset();
  }
}
