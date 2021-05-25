import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entry } from '../models/entry';
import { EntryService } from '../services/entries/entry.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.css']
})
export class TabletComponent implements OnInit {
  entryForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    phone: [null, Validators.required],
    company: [null, Validators.required],
    date: new Date()
  })

  constructor(private fb: FormBuilder, 
              private entryService: EntryService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.entryForm.valid) {
      this.entryService.newEntry(<Entry>this.entryForm.value).subscribe((newEntry: Entry) => {
        this.toastr.success('Entry added successfully')
        this.entryForm.reset()
      }, (error: Error) => {
        this.toastr.error('Could not add entry')
        console.error(error)
      })
    }
  }

}
