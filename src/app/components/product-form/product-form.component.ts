import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
