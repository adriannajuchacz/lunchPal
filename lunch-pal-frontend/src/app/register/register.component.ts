import { Component, OnInit } from '@angular/core';
import { UserService } from '../providers/user-provider/user.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public firstname: string
  public lastname: string
  public email: string
  public password: string
  public warningMsg: string ='' 
  public successMsg:string = '' 
  constructor(private userSrv: UserService, private router:Router) { }

  public async registerUser() {
    this.warningMsg=''
    this.successMsg=''
    let user = this.createUserObject()
    let response = await this.userSrv.registerUser(user)
    response.subscribe((resp) => this.handleRegister(resp), (error) => this.handleErrorRegister(error))
  }


  private createUserObject() {
    return {
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      password: this.password,
      blocked: false
    }

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

    if(this.userSrv.isLogIn())
    {
      this.router.navigate(['/home']);
    }
  }

}
