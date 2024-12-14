import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LaunchServiceService } from '../../services/launch-service.service';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './launch-list-view.component.html',
  styleUrl: './launch-list-view.component.css',
})
export class LaunchListViewComponent {
  constructor(private launchService: LaunchServiceService) {
    this.launchService.getLaunches().subscribe((data) => {
      console.log(data);
    });
  }
  // ngOnInit(): void {}
}
