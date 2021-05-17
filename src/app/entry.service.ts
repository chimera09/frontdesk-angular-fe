import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from './models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private entryUrl = 'http://localhost:9000/entries'

  constructor(private http: HttpClient) { }

  newEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.entryUrl, { entry })
  }

  getEntries(query?: string): Observable<[Entry[], number]> {
    if(query)
      return this.http.get<[Entry[], number]>(this.entryUrl + query)
    else
      return this.http.get<[Entry[], number]>(this.entryUrl)
  }
}
