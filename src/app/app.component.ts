import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SizeTableComponent } from './size-table/size-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SizeTableComponent ],
})
export class AppComponent {
  title = 'testApp';
}
