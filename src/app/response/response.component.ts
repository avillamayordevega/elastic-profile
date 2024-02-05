import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticService } from '../elastic/elastic.service';
import { JsonEditorOptions, NgJsonEditorModule } from 'ang-jsoneditor';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'elastic-profile-response',
  standalone: true,
  imports: [CommonModule, NgJsonEditorModule, ProfileComponent],
  templateUrl: './response.component.html',
  styleUrl: './response.component.sass'
})
export class ResponseComponent {

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
