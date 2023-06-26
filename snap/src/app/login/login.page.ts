import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = "";
  password = "";

  constructor(private loadingController: LoadingController, public navCtrl: NavController,
     private router: Router, private auth: AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  goToDestinationPage(data: any) {
    this.navCtrl.navigateForward('/home', { queryParams: { data: data } });
  }

  async log() {
    this.email = ((document.getElementById("email") as HTMLInputElement).value);
    this.password = ((document.getElementById("password") as HTMLInputElement).value);

    if (this.email == "Admin" && this.password == "Admin123") {

      this.navCtrl.navigateForward('/dashboard-admin');

    } else {
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
 
          if(errorMessage=="Firebase: Error (auth/missing-email)."){

          }else if(errorMessage=="Firebase: The email address is badly formatted. (auth/invalid-email)."){
            alert("badly formatted e email");
          }else if(errorMessage=="Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
               alert("invalid email");
          }else if(errorMessage=="Firebase: Password should be at least 6 characters (auth/weak-password)."){
            alert("Password should be at least 6 characters");
          }else if(errorMessage=="Firebase: The email address is already in use by another account. (auth/email-already-in-use)."){
            alert("invalid email or password");
          }
          else{
            window.alert(errorMessage);
          }
  

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

