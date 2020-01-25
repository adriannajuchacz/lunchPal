import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../../dto/user.dto'
import { SendGridService } from '@anchan828/nest-sendgrid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        private readonly sendgridsService: SendGridService) { }

    async createUserOnDB(user: UserDto) {
        let pw = user.password;
        user.password = await this.hashPassword(pw);
        const newUser = new this.userModel(user)
        let savedUser = await newUser.save()
        return savedUser;
    }

    async updateUserOnDB(id: string, user: UserDto) {
        let pw = user.password;
        user.password = await this.hashPassword(pw);
        return await this.userModel.findByIdAndUpdate(id, user);
    }

    async deleteUserOnDB(id: string) {
        return await this.userModel.findByIdAndDelete(id);
    }


    async getUserByEmail(email: string) {
        try {
            let user = await this.userModel.findOne({ email: { "$eq": email } })
            return user
        } catch (e) {
            return null
        }
    }

    async getUserByFirstName(first_name: string) {
        try {
            let user = await this.userModel.findOne({ first_name: { "$eq": first_name } })
            return user
        } catch (e) {
            return null
        }
    }

    async resetUserPassword(email: string) {
        let user = await this.getUserByEmail(email)

        if (user == null) {
            throw new Error("The user doesn't exist. We couldn't reset the password")
        }

        let newPassword = this.generateRandomString(15)
        let hashedPassword =  await this.hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save()

        this.sendgridsService.send({
            to: `${user.email}`,
            from: "support@lunchpad.tk",
            subject: "New password for LunchPal Service",
            text: `Hello, we see that you requested a new password: ${newPassword}`,
        })
    }

    async getUserById(id: string) {
        return await this.userModel.findById(id)
    }


    private generateRandomString(characters: number) {

        let outString: string = '';
        let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < characters; i++) {
            outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
        }
        return outString;
    }

    async hashPassword(password: string) {
        const saltRounds = 10; // CHANGE THIS NUMBER FOR FASTER/SLOWER HASHING
        let hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }

    async comparePassword(attempt: string, password: string): Promise<boolean> {
        return await bcrypt.compare(attempt, password);
      }
    
    async login(data: UserDto) {
        const { email, password } = data;
        const user = await this.getUserByEmail(email);
        const correct_Psw = await this.comparePassword(password, user.password);
        if (!user || !(correct_Psw)) {
            throw new Error();
        }
        return user;
      }
}
