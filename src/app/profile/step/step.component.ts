import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Something } from '../something';

@Component({
  selector: 'elastic-profiler-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.sass',
})
export class StepComponent {
  @Input() parent : StepComponent | undefined;
  @Input() data : Something | undefined;

  getLabel() {
    return this.data?.name ?? '?';
  }

  getTime() {
    return this.data?.time ?? 0;
  }

  getDescription() {
    return this.getLabel() + ' : ' + this.getTime() + 'ns';
  }

  getChildren() {
    return this.data?.children ?? [];
  }

  getChildrenSizes() {
    let rem = 1.0;
    let sizes = '';
    this.getChildren().forEach(child => {
      const size = child.time / this.getTime();
      sizes += size + 'fr ';
      rem -= size;
    });
    sizes += rem + 'fr';
    //console.log(this.getLabel() + ' -> ' + sizes);
    return sizes;
  }

  getLabelColumnSpan() {
    return 'span ' + this.getChildren().length + 1;
  }

}
