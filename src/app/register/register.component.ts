import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { Role } from '../models/role';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    phone: [null, Validators.required],
    role: [null, Validators.required],
  })

  roles = Role

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(<User>this.userForm.value).subscribe((createdUser: User) => {
        this.toastrService.success('User added successfully')
        this.userForm.reset()
      }, (error: Error) => {
        this.toastrService.error('Could not add user')
        console.error(error)
      })
    }
  }
}
