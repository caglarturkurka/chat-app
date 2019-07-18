import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private localStorageService: LocalStorageService,
              private router: Router
  ) {

  }

  login(username: string, password: string) {
    const user = this.userService.getUserList().find(value => value.username === username && value.password === password);
    if (user) {
      this.localStorageService.store('auth', user);
      return user;
    } else {
      return null;
    }
  }

  isAuthenticated() {
    return this.localStorageService.retrieve('auth') ? true : false;
  }

  getAuthenticatedUser() {
    return this.localStorageService.retrieve('auth');
  }

  logout() {
    this.localStorageService.clear('auth');
    this.router.navigateByUrl('/');
  }


}
