import { Component, computed, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { products } from './data2';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CdkTableModule } from '@angular/cdk/table';
import { ProductVM } from './data2.interface';

@Component({
  selector: 'app-size-table2',
  standalone: true,
  templateUrl: './size-table2.component.html',
  styleUrl: './size-table2.component.css',
  imports: [CdkTableModule, CommonModule],
})
export class SizeTable2Component {
  products = signal<ProductVM[]>([]);
  descriptionColumn = 'Rozmiary';
  descriptionRow = 'Kolory';

  readonly vmChildren = toSignal(of(products));

  readonly colorSizeMap = new Map<string, Map<string, ProductVM>>();

  readonly rows = toSignal(
    of([
      ...new Set(
        this.vmChildren()
          ?.filter((vm) => vm.childsProducts.length === 0)
          .map((vm) => {
            const parent = this.vmChildren()?.find((parentVm) =>
              parentVm.childsProducts.includes(vm.id),
            );
            return parent ? parent.product.color : undefined;
          })
          .filter(Boolean),
      ),
    ]) ?? [],
  );

  readonly columns = toSignal(
    of([
      ...new Set(
        this.vmChildren()
          ?.filter((vm) => vm.childsProducts.length === 0)
          .map((vm) => vm.product.size),
      ),
    ]) ?? [],
  );

  readonly orderBaseItem = true;

  readonly displayedColumns = computed(() => {
    this.colorSizeMap.clear();

    const parentColorMap = new Map<number, string>();
    this.vmChildren()?.forEach((vm) => {
      if (vm.childsProducts.length > 0) {
        parentColorMap.set(vm.id, vm.product.color);
      }
    });

    this.vmChildren()?.forEach((vm) => {
      if (vm.childsProducts.length === 0) {
        const parent = this.vmChildren()?.find((parentVm) =>
          parentVm.childsProducts.includes(vm.id),
        );
        const color = parent ? parentColorMap.get(parent.id) : undefined;

        if (!color) return;

        if (!this.colorSizeMap.has(color)) {
          this.colorSizeMap.set(color, new Map<string, ProductVM>());
        }

        const colorMap = this.colorSizeMap.get(color)!;
        colorMap.set(vm.product.size, vm);
      }
    });

    return ['color', ...(this.columns() ?? [])];
  });

  getProductAmount(color: string, size: string): ProductVM | undefined {
    const colorMap =
      this.colorSizeMap.get(color) ?? new Map<string, ProductVM>();
    return colorMap.get(size);
  }
}
