import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'author', 'author_id', 'published'];
  dataSource: any;
  value: any
  check: boolean = false;
  private subscription$ = true;
  private readonly subscriptions: Subscription[] = [];
  showSlider: boolean = true;

  constructor(
    private userService: UserService,
    private toaster: NotificationService,
    private router: Router,
  ) {
    this.getUserDetails();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription$ = false;
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  //get details from API
  getUserDetails() {
    const getUserSubscriber: Subscription = this.userService.getUsersList().pipe(takeWhile(() => this.subscription$))
      .subscribe(
        (res: any) => {
          if (res?.data) this.dataSource = res.data.items;
        },
        (err) => {
          this.toaster.notifyError('Error on fetching the user details');
        }
      );
    this.subscriptions.push(getUserSubscriber);
  }

  // silder controller
  getdetail(event) {
    this.value = event;
    this.showSlider = true;
    this.check = true;
  }


  //log out 
  logoutHandler() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
