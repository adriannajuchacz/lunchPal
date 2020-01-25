import { Component, OnInit } from '@angular/core';
import { UserService } from '../providers/user-provider/user.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private userSrv : UserService,private router : Router) { }

  ngOnInit() {

    if(this.userSrv.isLogIn())
    {
      this.router.navigate(['/home']);
    }
  }

}
