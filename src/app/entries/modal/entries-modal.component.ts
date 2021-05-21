import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EntryService } from 'src/app/entry.service';
import { ToastrService } from 'ngx-toastr';
import { Entry } from '../../models/entry';

@Component({
  selector: 'app-entries-modal',
  templateUrl: './entries-modal.component.html',
  styleUrls: ['./entries-modal.component.css']
})
export class EntriesModalComponent {
  entryForm = this.fb.group({
    name: [this.data.name, Validators.required],
    surname: [this.data.surname, Validators.required],
    email: [this.data.email, Validators.required],
    phone: [this.data.phone, Validators.required],
    company: [this.data.company, Validators.required],
    date: new Date()
  })

  constructor(public dialogRef: MatDialogRef<EntriesModalComponent>, 
              private fb: FormBuilder, 
              private entryService: EntryService,
              private toastrService: ToastrService,
              @Inject(MAT_DIALOG_DATA) private data: Entry) { }

  onSubmit(): void {
    if (this.entryForm.status === 'VALID') {
      console.log("Entryform: ", this.entryForm.value)
      this.entryService.updateEntry(<Entry>this.entryForm.value, this.data._id as string).subscribe(() => {
        this.dialogRef.close()
      })
    } else {
      console.log("Data: ", this.data)
      this.toastrService.error("Invalid fields")
    }
  }
}