import { Component, OnInit } from '@angular/core';
import { Report, ReportService } from '../report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  reports: Report[];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getReports();
  }

  getReports(): void {
    this.reportService.getReports().subscribe(reports => this.reports = reports);
    // TODO: Das spaeter wegmachen!
    /*this.reports = [{reporter: 'Alice', reportee: 'Bob', date: new Date('2018-03-16'), comment: 'War langweilig', id_reportee: 'abc', blocked: false},
                    {reporter: 'Mahmoud', reportee: 'Alice', date: new Date('2019-03-16'), comment: 'Stinkt nach Maggie', id_reportee: 'cde', blocked: false}];*/
  }
  blockUser(report: Report): void {
    this.reportService.blockUser(report).subscribe();
    report.blocked = true;
    // this.reports = this.reports.filter(r => r.id_reportee !== report.id_reportee);
  }
}
