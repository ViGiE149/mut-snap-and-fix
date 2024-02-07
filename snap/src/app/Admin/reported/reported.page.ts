import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';
import { DamageDataService } from 'src/app/services/damage-data.service';




@Component({
  selector: 'app-reported',
  templateUrl: './reported.page.html',
  styleUrls: ['./reported.page.scss'],
})
export class ReportedPage implements OnInit {

 
 damageData:any;
  constructor(private damageDataService: DamageDataService,private afs: AngularFirestore,    private storage: AngularFireStorage,private db: AngularFirestore,) { 
   this. getDamageData();
  }

  ngOnInit() {
  
  }

  getDamageData() {
    this.damageDataService.getDamageDataByStatus('damaged').subscribe((data) => {
      this.damageData = data;
      console.log(data);
    });
  }

  makeInProgress(id: any) {
    this.damageDataService.updateDamageDataStatus(id, 'pending');
  }

  viewDescription(description: any) {
    // Handle logic for viewing description
  }
  




  

}
 



