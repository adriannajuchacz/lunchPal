import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportMongoSchema } from '../../mongo-schemas/report.schema'
import { ReportsController } from '../../controllers/reports/reports.controller'
import { ReportService } from '../../providers/report/report.service'

@Module({
    imports:[MongooseModule.forFeature([{ name: 'report', schema: ReportMongoSchema }])],
    controllers:[ReportsController],
    providers:[ReportService]
})
export class ReportModule {}
