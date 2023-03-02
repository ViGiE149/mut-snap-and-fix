import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {
  completedData:any;
  constructor(private db: AngularFirestore) {
    this.getCompletedData()
   }

  ngOnInit() {
  }


  getCompletedData() {

    this.db.collection('damageData', ref => ref.where('status', '==', 'completed'))
      .valueChanges()
      .subscribe(data =>{
        
      this.completedData=data;  
      console.log(data);

  }); 

}



}
