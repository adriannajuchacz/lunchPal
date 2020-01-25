import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export enum LunchPalStatus {
  EXPIRED = 'expired',
  WAITING = 'waiting',
  MATCHED = 'matched'
}

export interface LunchPal {
  day: Date;
  numberOfPeople: number;
  starttime: string; // in format "13:00"
  endtime: string; // in format "13:00"
  mensa: string; // eg Hauptgebäude
  status: LunchPalStatus;
}

@Injectable({
  providedIn: 'root'
})
export class LunchPalService {
  private _myLunchPals: LunchPal[] = [];

  constructor(private http: HttpClient) {}
  // For later we will use backend data, an observable with the persitent data

  addLunchPal(lunchpal: LunchPal) {
    //console.log("Here is lunchpal")
    //console.log(lunchpal)
    //this._myLunchPals.push(lunchpal);
    console.log("Sending info!!")
    console.log(lunchpal)
    let petition = this.http.post("http://127.0.0.1:3000/lunchparty/input",lunchpal)

    return petition

  }

  myLunchPals(userid) {
    let petition = this.http.get<any[]>("http://127.0.0.1:3000/lunchparty/getallparties/" + userid)
    return petition
  }

  unsub(partyid: string, userid: string){
    let petition = this.http.post<any[]>("http://127.0.0.1:3000/lunchparty/unsubscribe/", {partyid, userid})
    return petition
  }

}
