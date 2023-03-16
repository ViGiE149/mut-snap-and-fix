import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage implements OnInit {

  constructor(  private alertController: AlertController,  private router:Router, private toastController: ToastController) { }

  ngOnInit() {
  }

logOut(){
  this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to SIGN OUT?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
         cssClass: 'my-custom-alert',
          handler: () => {
            console.log('Confirmation canceled');
          }
        }, {
          text: 'Confirm',
          handler: () => {
           
            
          
              this.router.navigateByUrl("/login");
              this.presentToast()
        
        
           


          }
        }
      ]
    });
    await alert.present();
  }




async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED OUT!',
      duration: 1500,
      position: 'top',
    
    });

    await toast.present();
  }



}
