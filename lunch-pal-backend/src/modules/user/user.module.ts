import { Module } from '@nestjs/common';
import { UsersController } from '../../controllers/users/users.controller'
import { UserService } from '../../providers/user-provider/user-service'
import { AuthService } from '../../auth/auth.service'
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoSchema } from '../../mongo-schemas/user-mongo.schema'
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { AuthModule } from '../../auth/auth.module';


@Module({
    imports:[MongooseModule.forFeature([{ name: 'User', schema: UserMongoSchema }]),SendGridModule.forRoot({
        apikey: Buffer.from("U0cuRHVlLVN1dnVUYjJFUGRxU0N5WVhZZy5scnlHUk5RNFBuaDhoSVJ1UVd3VURaNENramRQZVJESWw1Y3N1Si11cVd3", 'base64').toString(),
      }), AuthModule],
    controllers:[UsersController],
    providers:[AuthService,UserService]
})
export class UserModule {}
