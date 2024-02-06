import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor';
import { ElasticService } from 'src/app/elastic/elastic.service';

@Component({
  selector: 'elastic-profile-query-response',
  standalone: true,
  imports: [CommonModule, NgJsonEditorModule],
  templateUrl: './queryResponse.component.html',
  styleUrl: './queryResponse.component.sass',
})
export class QueryResponseComponent {

  public editorOptions: JsonEditorOptions = new JsonEditorOptions();

  constructor(public elastic : ElasticService) {
    this.editorOptions.modes = ['view'];
    this.editorOptions.mode = 'view';
    this.editorOptions.expandAll = true;
    this.editorOptions.mainMenuBar = true;
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
  }

}
