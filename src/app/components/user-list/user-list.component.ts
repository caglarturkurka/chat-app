import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {IUser} from '../../model/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: IUser[] = [];
  selectedUser: IUser;
  currentUser: IUser;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.currentUser = this.authService.getAuthenticatedUser();
    this.userList = this.userService.getUserList().filter(value => value.id !== this.currentUser.id);
  }

  selectUser(user: IUser) {
    this.selectedUser = user;
  }
}
