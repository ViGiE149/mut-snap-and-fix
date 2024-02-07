import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DamageDataService } from 'src/app/services/damage-data.service';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage implements OnInit {
  damageData:any;
  constructor(private damageDataService: DamageDataService) {
    this. getDamageData();
    
   
   }
  
  ngOnInit() {
  }




  getDamageData() {
    const email = localStorage.getItem('email') || "";

    this.damageDataService.getReportsByEmail('damaged', email).subscribe((data) => {
      this.damageData = data;
    });
  }

}
