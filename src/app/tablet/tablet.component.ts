import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entry } from '../models/entry';
import { EntryService } from '../entry.service';

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

  constructor(private fb: FormBuilder, private entryService: EntryService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Entry form: ", this.entryForm)
    this.entryService.newEntry(<Entry>this.entryForm.value).subscribe((newEntry: Entry) => {
      console.log(newEntry)
    }, (error: Error) => {
      console.error(error)
    })
  }

}
