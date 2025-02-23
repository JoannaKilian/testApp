import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SizeTableComponent } from './size-table/size-table.component';
import { SizeTable2Component } from './size-table2/size-table2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SizeTableComponent, SizeTable2Component ],
})
export class AppComponent {
  title = 'testApp';
}
