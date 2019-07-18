import {Component, OnInit} from '@angular/core';
import {IUser} from '../../model/user';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: IUser;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const userId = +params.get('id');
      this.user = this.userService.getUserInfo(userId);
    });
  }

  ngOnInit() {

  }

}
