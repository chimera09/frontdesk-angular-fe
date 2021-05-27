import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-modal',
  templateUrl: './reset-modal.component.html',
  styleUrls: ['./reset-modal.component.css']
})
export class ResetModalComponent {
  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  })

  constructor(public dialogRef: MatDialogRef<ResetModalComponent>, 
              private fb: FormBuilder, 
              private loginService: LoginService,
              private toastrService: ToastrService) { }

  onSubmit(): void {
    this.loginService.recover(this.form.value)
      .subscribe(() => {
        this.toastrService.success('An email will be sent to you shortly')
        this.dialogRef.close()
      }, err => {
        console.error(err)
        this.toastrService.error('Invalid email')
      })
  }
}