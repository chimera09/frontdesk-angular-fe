import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry';
import { EntryService } from '../services/entries/entry.service';
import { DEFAULT_ROWS_PER_PAGE_VALUE } from '../../utils/constants';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { EntriesModalComponent } from './modal/entries-modal.component';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {
  entryArray: Entry[] = []
  length: number = 0
  pageIndex: number = 0
  lastPage: number = 0
  rowsPerPage: string = DEFAULT_ROWS_PER_PAGE_VALUE
  displayColumns = ['index', 'name', 'surname', 'email', 'phone', 'company', 'date', 'actions']

  constructor(private entryService: EntryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEntries(0)
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(EntriesModalComponent, {
      width: '20%',
      height: '45%',
      data: { ...this.entryArray[index] }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getEntries(this.pageIndex)
    })
  }

  onChangePage(event: any): void {
    this.pageIndex = event.pageIndex
    this.getEntries(this.pageIndex)
  }

  getEntries(from: number, limit: number = Number(this.rowsPerPage)): void {
    this.entryService.getEntries(from, limit).subscribe(result => {
      this.entryArray = result[0]
      this.length = result[1]
    })
  }

  deleteEntry(index: number) {
    if (confirm("Are you sure?"))
      this.entryService.deleteEntry(this.entryArray[index]._id as string).subscribe(() => {
        this.getEntries(this.pageIndex)
      })
  }

}
