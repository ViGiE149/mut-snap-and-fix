import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';
import { DamageDataService } from 'src/app/services/damage-data.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {
  pendingData:any;
  constructor(private damageDataService: DamageDataService) {
    this.getInProgressData()
   }

  ngOnInit() {
  }


  getInProgressData() {
    this.damageDataService.getDamageDataByStatus('pending').subscribe((data) => {
      this.pendingData = data;
      console.log(data);
    });
  }

  makeItComplete(id: any) {
    this.damageDataService.updateDamageDataStatus(id, 'completed');
  }





}
