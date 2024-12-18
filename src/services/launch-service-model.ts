export interface LaunchServiceApiResponse {
  docs: LaunchDoc[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export interface GetLaunchesResponse {
  launches: {
    flightNumber: number;
    launchYear: number;
    rocketName: string;
    details: string;
    mediaLinks: {
      presskit: string | null;
      webcast: string | null;
      article: string | null;
      wikipedia: string | null;
    };
  }[];
  total: number;
}

interface Links {
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

interface LaunchDoc {
  links: Links;
  rocket: string;
  details: string | null;
  flight_number: number;
  name: string;
  date_utc: string;
  id: string;
}
