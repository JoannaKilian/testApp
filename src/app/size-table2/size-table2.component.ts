import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { products } from './data2';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-size-table2',
  standalone: true,
  templateUrl: './size-table2.component.html',
  styleUrl: './size-table2.component.css',
  imports: [CdkTableModule , CommonModule ],
})
export class SizeTable2Component {
  products = signal<ProductVM[]>([]);

  readonly vmChildren = toSignal(of(products));

  readonly colorSizeMap = new Map<string, Map<string, ProductVM>>();
  readonly rows = toSignal(of(["Red", "Blue", "Green"]) ?? []);
  readonly columns = toSignal(of(["M", "L", "S", "XL"]) ?? []);

  readonly displayedColumns = computed(() => {
    this.colorSizeMap.clear();
    this.vmChildren()?.forEach(vm => {
      if (!vm.product.color) {
        return;
      }
      if (!this.colorSizeMap.has(vm.product.color)) {
        this.colorSizeMap.set(vm.product.color, new Map<string, ProductVM>());
      }
      const colorMap = this.colorSizeMap.get(vm.product.color) ?? new Map<string, ProductVM>();
      colorMap.set(vm.product.size, vm);
    });

    return ['color', ...this.columns() ?? []];
  });

  getProductAmount(color: string, size: string): ProductVM | undefined {
    const colorMap = this.colorSizeMap.get(color) ?? new Map<string, ProductVM>();
    return colorMap.get(size);
  }
}
