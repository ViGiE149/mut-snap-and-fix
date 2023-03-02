import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {
  pendingData:any;
  constructor(private db: AngularFirestore) {
    this.getInProgressData()
   }

  ngOnInit() {
  }


  getInProgressData() {

    this.db.collection('damageData', ref => ref.where('status', '==', 'pending'))
      .valueChanges()
      .subscribe(data =>{
        
      this.pendingData=data;  
      console.log(data);

  }); 

}

makeItComplete(id:any){

  this.db.collection('damageData', ref => ref.where('id', '==', id))
  .get()
  .subscribe(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.ref.update({ status: 'completed' });
      this.getInProgressData()
    });
  });



}





}
