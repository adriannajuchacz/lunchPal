import { UserDto} from './user.dto'



export class LunchPartyDto {
    mensa: string
    day: Date
    maxpals: number
    starttime: string
    endtime: string
    currentpals: number
    users: [string]
    interests: [string]
}
