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

  getEntries(from: number, limit: number): Observable<[Entry[], number]> {
    if(from !== -1)
      return this.http.get<[Entry[], number]>(`${this.entryUrl}?from=${from}&limit=${limit}`)
    else
      return this.http.get<[Entry[], number]>(this.entryUrl)
  }

  deleteEntry(id: string): Observable<Entry> {
    return this.http.delete<Entry>(`${this.entryUrl}/${id}`)
  }

  updateEntry(entry: Entry, id: string): Observable<Entry> {
    return this.http.put<Entry>(`${this.entryUrl}/${id}`, entry)
  }
}
