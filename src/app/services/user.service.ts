import {Injectable} from '@angular/core';
import {User} from '../model/user';

const USER_LIST: User[] = [
  {
    id: 1,
    name: 'Çağlar Turkurka',
    username: 'caglar',
    password: '1234'
  },
  {
    id: 2,
    name: 'Serdar Türkmen',
    username: 'serdar',
    password: '1234'
  },
  {
    id: 3,
    name: 'Robin Turkurka',
    username: 'robin',
    password: '1234'
  },
  {
    id: 4,
    name: 'Ercan Demir',
    username: 'ercan',
    password: '1234'
  }
];


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: User[] = [];

  getUserInfo(id: number): User {
    const users: User[] = this.userList.filter(user => user.id === id);
    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }

  constructor() {
    this.populateUserList();
  }

  populateUserList() {
    this.userList = USER_LIST;
  }

  getUserList() {
    return this.userList;
  }

}
