import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
    


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;

  constructor( private loadingController: LoadingController,public navCtrl: NavController,private router:Router, private auth:AngularFireAuth,private toastController: ToastController) { }

  ngOnInit() {
  }


















  goToDestinationPage(data:any) {
    this.navCtrl.navigateForward('/home', { queryParams: { data: data } });
  }
  
  
  


  

  validate(){



  }

  async log(){
    this.email=((document.getElementById("email")as HTMLInputElement).value);
    this.password=((document.getElementById("password")as HTMLInputElement).value);

  if(this.email=="Admin"  && this.password=="Admin123")  {

    this.navCtrl.navigateForward('/dashboard-admin');
  
  }else{
    

    const loader = await this.loadingController.create({
      message: 'Signing in',
      cssClass: 'custom-loader-class'
    });
    await loader.present();
 
    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(userCredential => { 
      loader.dismiss();
      this.goToDestinationPage(this.email);
      this.presentToast()

    })
    .catch((error) => {
      loader.dismiss();
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(errorMessage);
     
    });
  



}


  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED IN!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

}
 
