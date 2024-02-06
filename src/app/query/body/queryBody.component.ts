import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent, JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor';
import { ElasticService } from 'src/app/elastic/elastic.service';

@Component({
  selector: 'elastic-profile-query-body',
  standalone: true,
  imports: [CommonModule, NgJsonEditorModule],
  templateUrl: './queryBody.component.html',
  styleUrl: './queryBody.component.sass',
})
export class QueryBodyComponent implements AfterViewInit {

  @ViewChild("editor") queryEditor : JsonEditorComponent | undefined;

  protected editorOptions: JsonEditorOptions = new JsonEditorOptions();

  constructor(public elastic : ElasticService) {
    this.editorOptions.modes = ['code', 'tree'];
    this.editorOptions.mode = 'code';
    this.editorOptions.expandAll = true;
    this.editorOptions.mainMenuBar = true;
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
    this.editorOptions.statusBar = true;
  }

  ngAfterViewInit() {
    this.elastic.queryEditor = this.queryEditor;
  }

}
