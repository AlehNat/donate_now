import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css'],
})
export class LoginSuccessComponent implements OnInit {

  public username: string;
  public redirectTimeoutAmount: number = 6;

  private timeout$: Observable<number>;
  private activeTimeoutSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.processAuth();
    this.startRedirectTimeout();
  }

  private processAuth() {
    let username = this.route.snapshot.params.username;
    this.username = username;
    if (username === '') {
      this.router.navigate(['/login']);
    } else {
      this.authService.authorizeUser({username});
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  private startRedirectTimeout() {
    this.timeout$ = timer(0, 1000);
    this.activeTimeoutSubscription = this.timeout$.subscribe( () => {
      this.redirectTimeoutAmount--;
      if (this.redirectTimeoutAmount < 0) {
        this.goToDashboard();
        this.activeTimeoutSubscription.unsubscribe();
      }
    });
  }
}
