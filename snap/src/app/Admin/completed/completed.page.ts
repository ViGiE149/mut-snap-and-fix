import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DamageDataService } from 'src/app/services/damage-data.service';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {
  completedData:any;
  constructor(private damageDataService: DamageDataService) {
    this.getCompletedData()
   }

  ngOnInit() {
  }

  getCompletedData() {
    this.damageDataService.getDamageDataByStatus('completed').subscribe((data) => {
      this.completedData = data;
      console.log(data);
    });
  }
}
