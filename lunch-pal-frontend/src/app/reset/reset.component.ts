import { Component, OnInit } from '@angular/core';
import { UserService } from '../providers/user-provider/user.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  
  public email: string
  public warningMsg: string =''
  public successMsg:string = ''
  constructor(private userSrv: UserService, private router:Router) { }
  
  public async resetPassword() {
    this.warningMsg=''
    this.successMsg=''
    let response = await this.userSrv.resetPassword({email: this.email})
    response.subscribe((resp) => this.handleReset(resp), (error) => this.handleErrorReset(error))
  }
  
  private handleReset(response) {
    console.log('Hi')
    console.log(response)
    if (response == null ) {
      // console.log(response.message)
      // this.successMsg = response.message
      console.log('Reset request was sucessfull')
      this.successMsg = 'Success, please check your E-Mail inbox'
      setTimeout(()=>{ 
      this.router.navigate(['/'])
      },4000)
      //here to use the response.operation_description for the success description!
    }
  }
  
  private handleErrorReset(error) {
    console.log(error)

    let errorObject = error.error

    if (errorObject.status == 400) {
      console.log(errorObject.message)
      this.warningMsg = errorObject.message      
    }
    else if (errorObject.status == 500) {
      //Server had an internal error
      //Use error_description to know why
      console.log(errorObject.message)
      this.warningMsg = errorObject.message
    }
  }

  ngOnInit() {
  }

}
