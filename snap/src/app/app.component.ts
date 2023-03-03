import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {

    this.sideMenu();
  }






  
  navigate:any

sideMenu()
  {
    this.navigate =
    [
      {
        title : "Reports",
        url   : "/my-reports",
        icon  : "newspaper-outline"
      },
      {
        title : "Pending",
        url   : "/in-progress",
        icon  : "ellipsis-horizontal-outline"
      },
      {
        title : "Attended Reports",
        url   : "/attended",
        icon  : "checkmark-done-outline"
      },
    ]
  }
}
