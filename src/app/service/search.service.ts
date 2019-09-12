import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchFlight(search) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post('https://www.ije-api.tcore.xyz/v1/flight/search-flight',JSON.stringify(search), { headers: headers })
  }
}
