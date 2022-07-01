import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/common/constants';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted: boolean = false;
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toaster: NotificationService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(constants.EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  //Login function
  onSubmit() {
    if (this.loginForm.invalid) {
      this.toaster.notifyError('Enter valid details');
      return this.loginForm.controls;
      
    }
    this.toaster.notifySucess('Login Successful');
    this.router.navigateByUrl('/users');

  }
}
