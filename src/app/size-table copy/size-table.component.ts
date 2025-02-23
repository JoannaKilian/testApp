import { Component, computed, signal } from '@angular/core';
import { Product } from './data.interface';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, JsonPipe } from '@angular/common';
import { products } from './data';

@Component({
  selector: 'app-size-table',
  standalone: true,
  templateUrl: './size-table.component.html',
  styleUrl: './size-table.component.css',
  imports: [MatTableModule, CommonModule],
})
export class SizeTableComponent {
  products = signal<Product[]>([]);
  colorSizeMap = <Map<string, Map<string, Product>>>(new Map());
  displayedColumns = signal<string[]>(['color']);

  uniqueColors = computed(() => Array.from(new Set(this.products().map(p => p.color))));
  uniqueSizes = computed(() => Array.from(new Set(this.products().map(p => p.size))));

  constructor() {
    this.products.set(products);
    this.products().forEach(product => {
      if (!this.colorSizeMap.has(product.color)) {
        this.colorSizeMap.set(product.color, new Map());
      }
      this.colorSizeMap.get(product.color)!.set(product.size, product);
    });

    this.displayedColumns.set(['color', ...this.uniqueSizes()]);

  }

  onCellClick(product: Product): void {
    if (product.id !== -1) {
      console.log(`ID ${product.id}, Color: ${product.color}, Size: ${product.size}`);
    }
  }
}
