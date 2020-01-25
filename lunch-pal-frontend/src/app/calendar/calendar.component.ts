import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LunchPalService, LunchPal, LunchPalStatus } from './../services/lunch-pal.service';
import { UserService } from '../providers/user-provider/user.service';
import { ReportService } from '../report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public comment: string;
  public reportSuccMsg: string;
  public reportErrMsg: string;
  public reportedUsers: string[] = [];
  lunchPals = []
  joinedPeopleMock = ['Mark', 'Marie', 'Lisa']
  constructor(private router: Router, private lunchPalService: LunchPalService, private userSrv : UserService, private reportService: ReportService) { }

  ngOnInit() {
    console.log("oninit home")
    console.log(this.userSrv.checkIfBlocked())
    if(this.userSrv.checkIfBlocked()){
      this.router.navigate(["/blocked"])
    }

    if(!this.userSrv.isLogIn()){
      this.router.navigate(["/login"])
    }

    this.getMyLunchPals()
  }

  getMyLunchPals() {
    let user = this.userSrv.getUserLogged()
    let pals = this.lunchPalService.myLunchPals(user["first_name"]);
    pals.subscribe((palsinfo) =>{
      this.lunchPals = palsinfo
      // TODO: mocked state for now, we'll need an 'edit lunchPal'
      for (var i in this.lunchPals) {
        this.lunchPals[i].status = LunchPalStatus.WAITING
      }
    })
  }

  toDayString(day: Date): string {
    var current_date = moment(day);
    var now = moment(new Date()); //todays date
    var diffInDays = moment.duration(now.diff(current_date)).asDays();
    
    if (diffInDays > 0 && diffInDays < 1) {
      return "today"
    } else if(diffInDays > 1 && diffInDays < 2) {
      return "yesterday"
    } else if(diffInDays > -1 && diffInDays < 0) {
      return "tommorow";
    }
    else {
      return current_date.format('L');
    }
  }
  async report(name) {
    this.reportedUsers.push(name);
    let response = await this.reportService.reportUser(this.userSrv.user.first_name, name, this.comment);
    response.subscribe((resp) => this.handleReport(resp, name), (error) => this.handleErrorRegister(error))
  }
  handleErrorRegister(error: any): void {
    this.reportErrMsg = "Comment mustn't be empty!"
  }
  handleReport(resp: any, name: string): void {
    // this.reportSuccMsg = this.userSrv.user.first_name + " was reported!"
    this.reportSuccMsg = name + " was reported!"
  }

  unsub(partyid: string){
    this.lunchPalService.unsub(partyid, this.userSrv.user._id).subscribe(data => console.log(data));
    window.location.reload();

  }
}
