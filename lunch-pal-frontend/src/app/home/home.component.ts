import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../providers/user-provider/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router, private userSrv : UserService) {}

  ngOnInit() {
    console.log("oninit home")
    console.log(this.userSrv.checkIfBlocked())
    if(this.userSrv.checkIfBlocked()){
      this.router.navigate(["/blocked"])
    }

    if(!this.userSrv.isLogIn()){
      this.router.navigate(["/login"])
    }
  }

  findLunchPal() {
    this.router.navigate(['/find-lunch-pal']);
  }

  openCalendar() {
    this.router.navigate(['/calendar']);
  }
}