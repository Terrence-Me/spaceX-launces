import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LaunchServiceResponse } from './launch-service-model';
import { map, pluck } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaunchServiceService {
  apiUrl = 'https://api.spacexdata.com/v5/launches/query';

  constructor(private _http: HttpClient) {}

  getLaunches(page: number, limit: number) {
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
      },
    };

    return this._http.post<any>(this.apiUrl, requestBody).pipe(
      map((response) => ({
        launches: response.docs.map((launch: any) => ({
          flightNumber: launch.flight_number,
          launchYear: new Date(launch.date_utc).getFullYear(),
          rocketName: launch.name,
          details: launch.details ? launch.details : 'No details available',
        })),
        total: response.totalPages,
      }))
    );
  }
}
