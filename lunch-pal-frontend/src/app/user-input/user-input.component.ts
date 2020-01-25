import { LunchPalStatus } from './../services/lunch-pal.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { DAYS_OF_WEEK } from 'calendar-utils';
import { LunchPalService, LunchPal } from '../services/lunch-pal.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../providers/user-provider/user.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  // min variables
  minDay = startOfDay(new Date());
  // minTime = new Date().getHours().toString() + ':00'; //doesnt make sense, cause I might want to create a meetup for another day
  // selected variables
  selectedTopics = []
  selectedMensa = '';
  selectedDay = startOfDay(new Date());
  selectedStartTime = (new Date().getHours() + 1).toString() + ':00'; // in ngModel
  selectedEndTime = (new Date().getHours() + 1).toString() + ':00'; // in ngModel
  selectedNumberOfPeople = -1;
  // to choose
  mensas = ['Hauptgebäude', 'Architekturgebäude', 'Mathe kantine'];
  numberOfPeople = [2, 4]; //[1, 2, 3, 4, 5, 6];
  interests = ["Soccer", "Sports", "Table top games", "Computer games", "Artificial Intelligence", "Webdesing", "Programming", "Hardware", "Cyber Security", "Traveling", "Photography", "Child Care", "Art", "Pets", "Music", "Cooking", "Reading"];
  constructor(
    private lunchPalService: LunchPalService,
    private router: Router,
    private location: Location,
    private usrSrv : UserService
  ) {}

  ngOnInit() {}

  cancel(): void {
    this.location.back();
  }

  createLunchPal() {
    if (!this.selectedMensa) {
      alert('Please select a mensa');
      return;
    }
    if (this.selectedNumberOfPeople === -1) {
      alert('Please select the number of people');
      return;
    } 

    let user = this.usrSrv.getUserLogged()
    console.log(user)

    const lunchPal = {
      day: this.selectedDay,
      numberOfPeople: this.selectedNumberOfPeople,
      starttime: this.selectedStartTime,
      endtime: this.selectedEndTime,
      mensa: this.selectedMensa,
      interests: this.selectedTopics,
      status: LunchPalStatus.WAITING,
      users: [user["first_name"]],
      maxpals : this.selectedNumberOfPeople
    } as LunchPal;
    let request = this.lunchPalService.addLunchPal(lunchPal);
    request.subscribe(() =>{
      this.router.navigate(['/home']);
    })
    
  }

  selectMensa($event) {
    this.selectedMensa = $event.value;
  }
  selectNumberOfPeople($event) {
    this.selectedNumberOfPeople = $event.value;
  }
  selectInteresReader($event) {
    console.log($event)
    this.selectedTopics = $event.value
  }
}
