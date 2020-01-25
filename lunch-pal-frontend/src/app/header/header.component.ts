import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../providers/user-provider/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string
  menuClosed: boolean = true
  constructor(private userSrv: UserService,private router: Router ) {
  }

  ngOnInit() {
  }

  openMenu(e) {
    this.menuClosed = false
  }
  closeMenu(e) {
    this.menuClosed = true
  }


  logout() {
    this.userSrv.logout();
    this.router.navigate(["/"])
  }

  public getLoginStatus() {
    return this.userSrv.isLogIn()
  }

  public getUserFirstName(){
    let userTemp = this.userSrv.getUserLogged()
    if("first_name" in userTemp){
      return userTemp["first_name"]
    }
    return ""
  }

  public userIsAdmin(){
    return this.userSrv.checkIfAdmin()
  }

  public userIsBlocked(){
    return  this.userSrv.checkIfBlocked()
  }

}
