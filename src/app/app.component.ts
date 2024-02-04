import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QueryComponent } from './query/query.component';
import { ResponseComponent } from './response/response.component';

@Component({
  selector: 'elastic-profiler-root',
  standalone: true,
  imports: [RouterOutlet, QueryComponent, ResponseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Elasticsearch profiler';
}
