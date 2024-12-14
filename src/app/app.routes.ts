import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LaunchListViewComponent } from '../components/list-view/launch-list-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  { path: 'list-view', component: LaunchListViewComponent },
];
