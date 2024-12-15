import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LaunchServiceService } from '../../services/launch-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './launch-list-view.component.html',
  styleUrl: './launch-list-view.component.css',
})
export class LaunchListViewComponent implements OnInit {
  displayColumns = [
    { header: 'Flight Number', key: 'flightNumber' },
    { header: 'Launch Year', key: 'launchYear' },
    { header: 'Rocket Name', key: 'rocketName' },
    { header: 'Details', key: 'details' },
  ];
  displayedColumnKeys = this.displayColumns.map((c) => c.key);
  dataSource = new MatTableDataSource<any>([]);
  vm$: any;

  currentPage = 1;
  pageSize = 10;
  totalLaunches = 0;

  constructor(private _launchService: LaunchServiceService) {}
  ngOnInit(): void {
    this.vm$ = this._launchService
      .getLaunches(this.currentPage, this.pageSize)
      .subscribe((data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data.launches);
        this.totalLaunches = data.total;
      });
  }
}
