import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LaunchServiceService } from '../../services/launch-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../loading/loading.service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
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
  expandedElement: any | null = null;

  currentPage = 1;
  pageSize = 10;
  totalLaunches = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _launchService: LaunchServiceService,
    private _loadingService: LoadingService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.loadLaunches(this.currentPage, this.pageSize);
  }

  handleRowExpand(row: any) {
    this.expandedElement = this.expandedElement === row ? null : row;
    console.log(this.expandedElement);
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadLaunches(this.currentPage, this.pageSize);
      });
    } else {
      return;
    }

    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        this.loadLaunches(
          this.currentPage,
          this.pageSize,
          sort.active,
          sort.direction
        );
      });
    } else {
      return;
    }
  }

  loadLaunches(
    page: number,
    pageSize: number,
    sortField?: string,
    sortOrder?: string
  ) {
    this._loadingService.loadingOn();
    this._launchService
      .getLaunches(page, pageSize, sortField, sortOrder)
      .subscribe((data) => {
        console.log('Launches Data:', data.launches);
        this.dataSource = new MatTableDataSource(data.launches);
        this.totalLaunches = data.total;
        this._loadingService.loadingOff();
      });
  }

  onKeydown(event: KeyboardEvent, row: any) {
    const validKeys = ['Enter', ' '];
    if (validKeys.includes(event.key)) {
      event.preventDefault();
      this.handleRowExpand(row);
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
