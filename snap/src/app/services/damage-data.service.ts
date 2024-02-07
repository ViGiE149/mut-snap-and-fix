import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DamageDataService {

  constructor(private db: AngularFirestore) {}

  getDamageDataByStatus(status: string): Observable<any[]> {
    return this.db
      .collection('damageData', (ref) => ref.where('status', '==', status))
      .valueChanges();
  }

  updateDamageDataStatus(id: any, newStatus: string): void {
    this.db
      .collection('damageData', (ref) => ref.where('id', '==', id))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ status: newStatus });
        });
      });
  }



  ////student
  getReportsByEmail(status: string, email: string): Observable<any[]> {
    return this.db
      .collection('damageData', (ref) =>
        ref.where('status', '==', status).where('email', '==', email)
      )
      .valueChanges();
  }





}
