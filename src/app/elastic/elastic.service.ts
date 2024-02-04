import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ElasticService {

  version = ''
  private versions = new Map<string, string>();

  subscription : Subscription | null = null;
  response : any | null = null;
  responseStatus = 200;
  responseStatusText = '';

  readonly health_url_regex = new RegExp('^((?:https?://)?[^/]+).*$');
  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http : HttpClient) {}

  getElasticVersion(url : string) {
    const health_url = url.match(this.health_url_regex)?.[1];
    if (!health_url) {
      return;
    }
    if (this.versions.has(health_url)) {
      this.version = this.versions.get(health_url) ?? '';
    } else {
      this.version = '';
      this.http.get<any>(health_url).subscribe(data => {
        this.version = data.version.number;
        this.versions.set(health_url, this.version);
      });
    }
  }

  request(url : string, query : string) {
    this.response = null;
    this.subscription = this.http.post<object>(url, query, { headers: this.headers }).subscribe({
      next: (response) => {
        this.response = response;
        this.responseStatus = 200;
        this.responseStatusText = '200 - OK';
        this.subscription = null;
      },
      error: (error) => {
        this.response = error;
        this.responseStatus = error.status;
        this.responseStatusText = error.status + ' - ' + error.statusText;
        this.subscription = null;
      }
    });
  }

  cancelRequest() {
    if (!this.subscription) {
      return;
    }
    this.subscription.unsubscribe();
    this.subscription = null;
    this.response = null;
  }

  responseHasProfile() {
    return this.response && 'profile' in this.response;
  }

}

/*
interface ElasticResponse {
  profile ?: Profile;
}

interface Profile {
  shards : Shard[];
}

interface Shard {
  id : string;
}
*/
