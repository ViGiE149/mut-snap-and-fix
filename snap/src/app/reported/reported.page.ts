import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';




@Component({
  selector: 'app-reported',
  templateUrl: './reported.page.html',
  styleUrls: ['./reported.page.scss'],
})
export class ReportedPage implements OnInit {

 
 damageData:any;
  constructor(private afs: AngularFirestore,    private storage: AngularFireStorage,private db: AngularFirestore,) { 
   this. getDamageData();
  }

  ngOnInit() {
  
  }

  getDamageData() {
    this.db.collection('damageData', ref => ref.where('status', '==', 'damaged'))
      .valueChanges()
      .subscribe(data =>{
        
      this.damageData=data;  
      console.log(data);

  }); 

      
  }


  makeInProgress(id:any){

    this.db.collection('damageData', ref => ref.where('id', '==', id))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({ status: 'pending' });
        this.getDamageData()
      });
    });
  
  
  
  }

viewDescription(description:any){





}
  

}
 



