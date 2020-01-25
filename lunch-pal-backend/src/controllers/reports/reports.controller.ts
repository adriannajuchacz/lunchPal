import { Controller,Get,  Post, UsePipes, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ReportService } from '../../providers/report/report.service';
import { ReportValidationPipe } from '../../pipes/report-validation.pipe';
import { ReportValidationSchema } from '../../validation-schemas/report-validation.schema';
import { ReportDto } from '../../dto/report.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportSrv : ReportService){}

    @Post("new")
    @UsePipes(new ReportValidationPipe(ReportValidationSchema))
    async create(@Body() report : ReportDto) {
      try{
        let reportDB = await this.reportSrv.createReportOnDB(report)
        console.log(reportDB)
        return {"success":true, "message":`Report was created successfully`}
      }catch(e){
        if(e.code === 11000){
          throw new HttpException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Report already exists',
          }, 500);
        }
      }
    }


    @Get("/getreports/report/:id")
    async getById(@Param('id') id: string){
      let report = await this.reportSrv.getById(id);
      return report
    }

    @Get("/getreports/user/:id")
    async getByUserId(@Param('id') id: string){
      let report = await this.reportSrv.getByUserId(id)
      return report
    }

    @Get("/getreports/all")
    async getAll(){
      let report = await this.reportSrv.getAll()
      return report
    }
}
