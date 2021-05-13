import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry';
import { EntryService } from '../entry.service'

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entryArray: Entry[] = []
  length: number = 0
  displayColumns = ['name', 'surname', 'email', 'phone', 'company', 'date']

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.getEntries()
  }

  getEntries(): void {
    this.entryService.getEntries().subscribe(result => {
      this.entryArray = result[0]
      this.length = result[1]
    })
  }

}
