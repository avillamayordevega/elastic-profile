import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElasticService } from '../elastic/elastic.service';
import { JsonEditorComponent, JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor';

@Component({
  selector: 'elastic-profiler-query',
  standalone: true,
  imports: [CommonModule, FormsModule, NgJsonEditorModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.sass'
})
export class QueryComponent {

  protected url = 'http://localhost:9200/test_index/_search';
  protected query = {
    "query": {
      "match_all": {}
    },
    "aggs": {
      "myagg": {
        "terms": {
          "field": "deleted"
        }
      }
    },
    "profile": true
  };

  public editorOptions: JsonEditorOptions = new JsonEditorOptions();

  @ViewChild('queryeditor') queryeditor: JsonEditorComponent | null = null;

  constructor(public elastic : ElasticService) {
    this.editorOptions.modes = ['code', 'tree'];
    this.editorOptions.mode = 'code';
    this.editorOptions.expandAll = true;
    this.editorOptions.mainMenuBar = true;
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
    this.editorOptions.statusBar = true;
  }

  onSend() {
    if (this.elastic.subscription) {
      this.elastic.cancelRequest();
    } else {
      this.elastic.request(this.url, JSON.stringify(this.queryeditor?.get()));
    }
  }

}
