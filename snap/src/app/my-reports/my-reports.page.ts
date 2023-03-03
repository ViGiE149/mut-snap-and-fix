import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.page.html',
  styleUrls: ['./my-reports.page.scss'],
})
export class MyReportsPage implements OnInit {
  damageData:any;
  constructor(private db: AngularFirestore) {
    this. getDamageData();
    
   
   }
  
  ngOnInit() {
  }




  getDamageData() {

    var email=localStorage.getItem('email');

    this.db.collection('damageData', ref => 
    ref.where('status', '==', 'damaged').where('email', '==', email))
    .valueChanges()
    .subscribe(data =>{
    
  this.damageData = data;  
    
  });

      
  }

}
