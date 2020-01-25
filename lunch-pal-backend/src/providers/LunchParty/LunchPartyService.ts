import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { LunchPartyDto } from '../../dto/LunchParty.dto'
import { UserDto } from 'src/dto/user.dto';
import { UserMongoSchema } from 'src/mongo-schemas/user-mongo.schema'

@Injectable()
export class LunchPartyService {


  constructor(@InjectModel('LunchParty') private readonly lunchPartyModel: Model<LunchPartyDto>) { }



  async removeAll(){
    await this.lunchPartyModel.remove({}).exec();
  }

  async match(input: LunchPartyDto) : mongoose.Schema {
    let newParty : mongoose.Schema   = new this.lunchPartyModel(input) // Create model to compare
    //let compParty = await this.lunchPartyModel.find({ "mensa": newParty.mensa, "starttime": newParty.starttime, "maxpals": newParty.maxpals, "interests": newParty.interests })

      const compParty = await this.lunchPartyModel.find({
      // gleiche ort
        "mensa": newParty.mensa,
      // gibt platz
      "currentpals" : { $lt : newParty.maxpals},
      // Uhrzeuit uberschneiden 1 minute überschneidung, ändern
      //"endtime" : {$gte : newParty.starttime  },
      // MInd 1 Interesse
      "interests": { "$in" : newParty.interests} ,
      // Datum gleich
      "day": newParty.day,
      // gleiche anzahl der personen
      "maxpals" : newParty.maxpals,
      // die nächste Zeile auskommentieren wenn man nur mit einem User testen will.
      // No lunch pal with myself
      "users": {"$nin" : newParty.users},
      }
    ).exec();
    //console.log("CompParty:  " + compParty)
    if(compParty.length === 0){
      newParty.currentpals = 1;
      newParty.save();
      //console.log("new party returned");
      //console.log(newParty);
      return newParty;
    }else{
      // we found at least one lunchpal, we filter out the best one.
      let bestIndex = -1;
      // Make sure bestIndex never -1
      let bestpoints = Number.NEGATIVE_INFINITY;

    for(var i = 0;i<compParty.length;i++){
      let points = 0;
      console.log("Test!")
      let foundParty = compParty[i]
      let endDate = this.timeToDate(foundParty.endtime).getTime()
      console.log(endDate)
      // add 30 mins to starttime of newParty
      let newStartDate= this.addMinutes(this.timeToDate(newParty.starttime).getTime(), 30)
      console.log(newStartDate)
      //only start costly rating of interests when times fit
      if(endDate >= newStartDate){

        points = 0;
        // rate the match of interests
        for(var j = 0;j<newParty.interests.length;j++){
          let interest = newParty.interests[j]
          console.log("interest: " + interest)
          console.log("foundparty.interests:  " + foundParty.interests)
          if(foundParty.interests.includes(interest)){
            points = points + 1;
          }
          else{
            points = points - 1;
          }

          }


          console.log("Points: "+ points )
          if(points >bestpoints){
            bestIndex = i;
            bestpoints = points;
        }

      }

    }
    // Parties with fitting interests, but not time found: => new party
    if(bestIndex == -1){
      newParty.currentpals = 1;
      newParty.save();
      //console.log("new party returned");
      //console.log(newParty);
      return newParty;
    }
    else{
    let bestParty =  compParty[bestIndex]
      bestParty.users.push(newParty.users[0])
      bestParty.currentpals = bestParty.currentpals +1
      bestParty.save()
      return bestParty
    }
    }
  }


  async getAllById(input: String) {
    console.log("Esto es input : ")
    console.log(input)
    let party = await this.lunchPartyModel.find({ "users": input })
    console.log("Esto es party")
    console.log(party)
    return party
  }

  // for test purposes
  async getAll(){
    let allLunchPals = await this.lunchPartyModel.find({});
    return allLunchPals;
  }

  async getPartyById(id: String) {
    let party = await this.lunchPartyModel.findById(id)
    return party
  }

  //Holy shit timepicker sucks. This function changes its output into a given Date
  //that one can actually work with.
  timeToDate(time: string){
    let splittime = time.split(":",2)
    let date = new Date(0, 0, 0, Number(splittime[0]), Number(splittime[1]))
    return date
  }

  dateToTime(date: Date){
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let time = String(hours) + ":" + String(minutes)
    return time
  }

  addMinutes(date: number, minutes: number){
    return date + minutes*60000
  }



}
