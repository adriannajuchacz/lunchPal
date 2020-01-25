import { Controller, Post, Put, Param, Body, Get, UsePipes ,Response, Delete , Res ,HttpException , HttpStatus, UseGuards, Req,Request} from '@nestjs/common';
import { LunchPartyDto } from "../../dto/LunchParty.dto";
import { LunchPartyService } from '../../providers/LunchParty/LunchPartyService';

@Controller('lunchparty')
export class LunchPartyController {

  constructor(private partyserv : LunchPartyService){}




  @Post('input')
  async match(@Body() input: LunchPartyDto){
    let party = await this.partyserv.match(input)
    console.log("Party to be sent back:")
    console.log(party);
    return party
  }
  //requires userid
  @Get("/getallparties/:id")
  async get(@Param('id') userid: string){
    console.log(userid)
    let party = await this.partyserv.getAllById(userid)
    return party
  }

  @Get("/getall/")
  async getAll(){
    let party = await this.partyserv.getAll();
    return party
  }
  @Get("/removeAll/")
  async removeAll(){
    await this.partyserv.removeAll();
    return "removed";
  }






  //requires PartyID
  @Get("/getparty/:id")
  async getPartyById(@Param('id') id: string){
    console.log(id)
    let party = await this.partyserv.getPartyById(id)
    return party
  }
}
