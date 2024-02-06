import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticService } from 'src/app/elastic/elastic.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'elastic-profile-query-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './queryAuth.component.html',
  styleUrl: './queryAuth.component.sass',
})
export class QueryAuthComponent {

  constructor(protected elastic : ElasticService) {}

}
