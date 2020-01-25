import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportDto } from '../../dto/report.dto'

@Injectable()
export class ReportService {

    constructor(@InjectModel('report') private readonly reportModel: Model<ReportDto>) { }

    async createReportOnDB(report: ReportDto) {
        const newReport = new this.reportModel(report)
        let savedReport = await newReport.save()
        return savedReport;
    }

    //returns a report by it's id
    async getById(id: string) {
      let reports = await this.reportModel.findById(id)
      return reports
    }

    async getByUserId(id: string){
      let reports = await this.reportModel.find({
        // "user_id" : id
        "reportee" : id
      })
      return reports
    }

    async getAll(){
      let reports = await this.reportModel.find()
      return reports
    }
}
