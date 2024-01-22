import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent {
  user!: User;

  constructor(userService:UserService) {
    //ogni volta che viene impostato l'utente nello UserService viene modifcato anche quello nell'header
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
}
