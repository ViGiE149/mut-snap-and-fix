import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.page.html',
  styleUrls: ['./in-progress.page.scss'],
})
export class InProgressPage implements OnInit {

  pendingData:any
  constructor(private db: AngularFirestore) {
    this.getPandingdData()
   }

  ngOnInit() {
  }



  getPandingdData() {
    var email=localStorage.getItem('email');
    
    this.db.collection('damageData', ref => 
    ref.where('status', '==', 'pending').where('email', '==', email))
    .valueChanges()
    .subscribe(data =>{
    this.pendingData = data;  
   
  });

}



}
