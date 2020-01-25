import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LunchPartySchema } from '../../mongo-schemas/lunchparty.schema'
import { LunchPartyController} from '../../controllers/lunchparty/lunchparty-controller'
import { LunchPartyService} from '../../providers/LunchParty/LunchPartyService'

@Module({
    imports:[MongooseModule.forFeature([{ name: 'LunchParty', schema: LunchPartySchema }])],
    controllers:[LunchPartyController],
    providers:[LunchPartyService]
})
export class LunchPartyModule {}
