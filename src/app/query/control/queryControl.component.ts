import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticService } from 'src/app/elastic/elastic.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'elastic-profile-query-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './queryControl.component.html',
  styleUrl: './queryControl.component.sass',
})
export class QueryControlComponent {

  constructor(protected elastic : ElasticService) {}

}
