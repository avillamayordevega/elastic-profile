import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElasticService } from '../elastic/elastic.service';
import { StepComponent } from './step/step.component';
import { Something } from './something';

@Component({
  selector: 'elastic-profiler-profile',
  standalone: true,
  imports: [CommonModule, StepComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass',
})
export class ProfileComponent {

  constructor(public elastic : ElasticService) {}

  getProfileShards() {
    return this.elastic.response?.profile?.shards;
  }

  getProfileSteps(shardIdx : number) {
    // TODO show other shards

    const shardData = this.elastic.response.profile.shards[shardIdx];

    const rootChildren : Something[] = [];
    this.addSearches(shardData, rootChildren);
    this.addAggregations(shardData, rootChildren);
    this.addFetch(shardData, rootChildren);

    return {
      name: shardData.id,
      time: Math.max(this.getTotalChildrenTime(rootChildren), this.elastic.response.took * 1_000_000),
      children: rootChildren,
    };
  }

  private addSearches(shardData : any, rootChildren : Something[]) {
    if (!('searches' in shardData)) {
      return;
    }

    for (let i = 0; i < shardData.searches.length; ++i) {
      const search = shardData.searches[i];
      const children : Something[] = [];

      // query
      const queryChildren = this.getChildren(search.query);
      children.push({
        name:'query',
        time: this.getTotalChildrenTime(queryChildren),
        children: queryChildren
      });

      // rewrite_time
      children.push({
        name:'rewrite_time',
        time: search.rewrite_time,
        children: []
      });

      // collector
      const collectorChildren = this.getChildren(search.collector);
      children.push({
        name:'collector',
        time: this.getTotalChildrenTime(collectorChildren),
        children: collectorChildren
      });

      rootChildren.push({
        name: 'search[' + i + ']',
        time: this.getTotalChildrenTime(children),
        children: children
      });
    }
  }

  private getChildren(obj : any) : Something[] {
    const children : Something[] = [];
    if (Array.isArray(obj)) {
      obj.forEach(child => {
        children.push({
          name: child.type ?? child.name,
          time: child.time_in_nanos,
          children: this.getChildren(child)
        });
      });
    } else if ('children' in obj) {
      return this.getChildren(obj.children);
    }
    return children;
  }

  private addAggregations(shardData : any, rootChildren : Something[]) {
    if (!('aggregations' in shardData)) {
      return;
    }

    const children = this.getChildren(shardData.aggregations);
    rootChildren.push({
      name: 'aggregations',
      time: this.getTotalChildrenTime(children),
      children: children
    });
  }

  private addFetch(shardData : any, rootChildren : Something[]) {
    if (!('fetch' in shardData)) {
      return;
    }

    const fetchChildren = this.getChildren(shardData.fetch);
    rootChildren.push({
      name: 'fetch',
      time: shardData.fetch.time_in_nanos,
      children: fetchChildren
    });
  }

  private getTotalChildrenTime(children : Something[]) {
    let sum = 0;
    children.forEach(child => sum += child.time);
    return sum;
  }

}
