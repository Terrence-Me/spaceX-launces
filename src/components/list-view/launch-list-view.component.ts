import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LaunchServiceService } from '../../services/launch-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, MatPaginatorModule],
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
  // vm$: any;

  currentPage = 1;
  pageSize = 10;
  totalLaunches = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _launchService: LaunchServiceService) {}

  ngOnInit(): void {
    this.loadLaunches(this.currentPage, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.currentPage = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.loadLaunches(this.currentPage, this.pageSize);
    });
  }

  loadLaunches(page: number, pageSize: number) {
    this._launchService.getLaunches(page, pageSize).subscribe((data) => {
      this.dataSource = data.launches;
      this.totalLaunches = data.total;
    });
  }

  // handlePageEvent(event: PageEvent) {
  //   this.currentPage = event.pageIndex + 1;
  //   this.pageSize = event.pageSize;
  //   this.loadLaunches(this.currentPage, this.pageSize);
  // }
}
