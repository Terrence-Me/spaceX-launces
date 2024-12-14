import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LaunchServiceResponse } from './launch-service-model';

@Injectable({
  providedIn: 'root',
})
export class LaunchServiceService {
  apiUrl = 'https://api.spacexdata.com/v5/launches/query';

  constructor(private _http: HttpClient) {}

  requestBody = {
    query: {},
    options: {
      pagination: true,
      select: [
        'flight_number',
        'name',
        'details',
        'date_utc',
        'rocket',
        'links',
      ],
    },
  };

  getLaunches() {
    return this._http.post<LaunchServiceResponse>(
      this.apiUrl,
      this.requestBody
    );
  }
}
