import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QueryControlComponent } from './query/control/queryControl.component';
import { QueryBodyComponent } from './query/body/queryBody.component';
import { QueryResponseComponent } from 'src/app/query/response/queryResponse.component';
import { ProfileComponent } from './profile/profile.component';
import { QueryAuthComponent } from './query/auth/queryAuth.component';

@Component({
  selector: 'elastic-profile-root',
  standalone: true,
  imports: [
    RouterOutlet,
    QueryControlComponent,
    QueryAuthComponent,
    QueryBodyComponent,
    QueryResponseComponent,
    ProfileComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Elasticsearch profiler';
}
