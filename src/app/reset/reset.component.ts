import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  loginUrl: string = 'http://localhost:4200/login'

  resetForm = this.fb.group({
    newPass: [null, Validators.required],
    confirmPass: [null, Validators.required]
  })

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let newPass = this.resetForm.get('newPass')?.value
    let confirmPass = this.resetForm.get('confirmPass')?.value
    let id = this.route.snapshot.paramMap.get('id')
    let token = this.route.snapshot.paramMap.get('token')

    if (newPass === confirmPass)
      this.loginService.resetPassword(newPass, token!, id!)
        .subscribe(() => {
          this.toastrService.success('Password successfully reset')
          this.router.navigate(['/login'])
        }, error => {
          if (error.status === 401)
            this.toastrService.error('Invalid/Expired token')
        })
    else
      this.toastrService.error('Passwords do not match')
  }
}
