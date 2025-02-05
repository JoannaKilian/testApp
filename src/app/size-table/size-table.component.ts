import { Component } from '@angular/core';
import { Product } from './data.interface';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { products } from './data';

@Component({
  selector: 'app-size-table',
  standalone: true,
  templateUrl: './size-table.component.html',
  styleUrl: './size-table.component.css',
  imports: [MatTableModule, CommonModule],
})
export class SizeTableComponent {
  products: Product[] = [];
  uniqueColors: string[] = [];
  uniqueSizes: string[] = [];
  displayedColumns: string[] = [];
  colorSizeMap = new Map<string, Map<string, Product>>();

  constructor() {
    this.products = products;
    this.uniqueColors = Array.from(new Set(this.products.map(p => p.color)));
    this.uniqueSizes = Array.from(new Set(this.products.map(p => p.size)));
    this.products.forEach(product => {
      if (!this.colorSizeMap.has(product.color)) {
        this.colorSizeMap.set(product.color, new Map());
      }
      this.colorSizeMap.get(product.color)!.set(product.size, product);
    });
    this.displayedColumns = ['color', ...this.uniqueSizes];

  }

  onCellClick(product: Product): void {
    if (product.id !== -1) {
      console.log(`ID ${product.id}, Color: ${product.color}, Size: ${product.size}`);
    }
  }
}
