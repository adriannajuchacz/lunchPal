import { Component, OnInit } from '@angular/core';
import { UserService } from '../providers/user-provider/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  public firstname: string =''
  public lastname: string
  public email: string
  public password: string
  public warningMsg: string ='' 
  public successMsg:string = '' 
  constructor(private userSrv: UserService, private router:Router) { 
  }

  public async updateUser() {
    this.warningMsg=''
    this.successMsg=''
    let user = this.updateUserObject()
    let response = await this.userSrv.updateUser(user)
    response.subscribe((resp) => this.handleRegister(resp), (error) => this.handleErrorRegister(error))
  }


  private updateUserObject() {
    let ls = this.userSrv.getUserLogged();
    ls.first_name = this.firstname;
    ls.last_name = this.lastname;
    ls.email = this.email;
    ls.password  = this.password;
    this.userSrv.setPass(this.password);
    
    return ls;

  }
  private handleRegister(response) {
    console.log(response)
    if (response.success == true) {
      console.log(response.message)
      this.successMsg=response.message
      setTimeout(()=>{ 
      this.router.navigate(['/login'])
      },4000)

      //here to use the response.operation_description for the success description!
    }
  }

  private handleErrorRegister(error) {
    let errorObject = error.error


    if (errorObject.statusCode == 400) {
      console.log(errorObject.message)
      this.warningMsg=errorObject.message
      
    }
    else if (errorObject.statusCode == 500) {
      //Server had an internal error
      //Use error_description to know why
      console.log(errorObject.message)
      this.warningMsg=errorObject.message
    }
  }


  ngOnInit() {
      if(!this.userSrv.isLogIn())
    {
      this.router.navigate(['/login']);
    }
    console.log(this.userSrv.getUserLogged());
    console.log("--------");
    this.firstname = this.userSrv.getUserLogged().first_name
    this.lastname = this.userSrv.getUserLogged().last_name
    this.email = this.userSrv.getUserLogged().email
    this.password = this.userSrv.getPass()
  }

}
