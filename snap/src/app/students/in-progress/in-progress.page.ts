import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DamageDataService } from 'src/app/services/damage-data.service';


@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.page.html',
  styleUrls: ['./in-progress.page.scss'],
})
export class InProgressPage implements OnInit {

  pendingData:any
  constructor(private damageDataService: DamageDataService) {
    this.getPandingData()
   }

  ngOnInit() {
  }



  getPandingData() {
    const email = localStorage.getItem('email')  || "";

    this.damageDataService.getReportsByEmail('pending', email).subscribe((data) => {
      this.pendingData = data;
    });
  }
}



