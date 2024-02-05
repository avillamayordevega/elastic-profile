import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ElasticService {

  user : string | undefined = 'elastic';
  pass : string | undefined = 'changeme';

  version = ''
  private versions = new Map<string, string>();

  subscription : Subscription | null = null;
  response : any;
  responseStatus = 200;
  responseStatusText = '';

  readonly health_url_regex = new RegExp('^((?:https?://)?[^/]+).*$');

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
    this.subscription = this.http.post<object>(url, query, { headers: this.getHeaders() }).subscribe({
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

  private getHeaders() : HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.user && this.pass) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.user + ':' + this.pass));
    }
    return headers;
  }

}
