import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry';
import { EntryService } from '../entry.service';
import { DEFAULT_ROWS_PER_PAGE_VALUE } from '../../utils/constants';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entryArray: Entry[] = []
  length: number = 0
  pageIndex: number = 0
  rowsPerPage: string = DEFAULT_ROWS_PER_PAGE_VALUE
  displayColumns = ['name', 'surname', 'email', 'phone', 'company', 'date']
  // query = `?from=${this.pageIndex}&limit=${this.rowsPerPage}`

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.getEntries(0)
  }

  onChangePage(event: any): void {
    this.pageIndex = event.pageIndex
    this.getEntries(this.pageIndex)
  }

  getEntries(start: number, stop: number = Number(this.rowsPerPage)): void {
    this.entryService.getEntries(start, stop).subscribe(result => {
      this.entryArray = result[0]
      this.length = result[1]
    })
  }

}
