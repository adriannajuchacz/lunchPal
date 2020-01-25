import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../providers/user-provider/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string
  private password: string
  private warningMsg: string = ''


  constructor(private userSrv: UserService, private router: Router) { }

  ngOnInit() { 

    if(this.userSrv.isLogIn())
    {
      this.router.navigate(['/home']);
    }

  }

  async login() {
    //this.user.changeUserState(this.email)
    this.warningMsg = ''
    try{
      let info = await this.userSrv.login(this.email, this.password);
      if (info) {
        this.router.navigate(['/home']);
      }
    }catch(e){
      this.warningMsg = e
  }
}

}
