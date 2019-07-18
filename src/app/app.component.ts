import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {IUser} from './model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'caglar-chat';
  currentUser: IUser;

  constructor(private authService: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getAuthenticatedUser();
  }

  isAuthenticatedAndNot404() {
    return this.authService.isAuthenticated() && this.router.url.indexOf('404') < 0;
  }

  logout() {
    this.authService.logout();
  }
}
