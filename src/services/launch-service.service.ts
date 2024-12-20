import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LaunchServiceApiResponse,
  GetLaunchesResponse,
} from './launch-service-model';
import { map, Observable, pluck } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaunchServiceService {
  apiUrl = 'https://api.spacexdata.com/v5/launches/query';

  constructor(private _http: HttpClient) {}

  getLaunches(
    page: number,
    limit: number,
    sortField?: string,
    sortOrder?: string
  ): Observable<GetLaunchesResponse> {
    const mappedSortField = sortField
      ? this.sortFieldMapping[sortField]
      : undefined;
    const requestBody = {
      query: {},
      options: {
        select: [
          'flight_number',
          'name',
          'details',
          'date_utc',
          'rocket',
          'links',
        ],
        pagination: true,
        page,
        limit,
        sort: mappedSortField
          ? { [mappedSortField]: sortOrder === 'asc' ? 1 : -1 }
          : undefined,
      },
    };

    return this._http
      .post<LaunchServiceApiResponse>(this.apiUrl, requestBody)
      .pipe(
        map((response) => ({
          launches: response.docs.map((launch: any) => ({
            flightNumber: launch.flight_number,
            launchYear: new Date(launch.date_utc).getFullYear(),
            rocketName: launch.name,
            details: launch.details ? launch.details : 'No details available',
            mediaLinks: {
              presskit: launch.links.presskit ? launch.links.presskit : null,
              webcast: launch.links.webcast ? launch.links.webcast : null,
              article: launch.links.article ? launch.links.article : null,
              wikipedia: launch.links.wikipedia ? launch.links.wikipedia : null,
            },
          })),
          total: response.totalDocs,
        }))
      );
  }

  private sortFieldMapping: { [key: string]: string } = {
    flightNumber: 'flight_number',
    launchYear: 'date_utc',
    rocketName: 'name',
    details: 'details',
  } as const;
}
