import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email = "";
  password = "";
  comfirmPassword="";

  constructor(private alertController: AlertController, private loadingController: LoadingController,
     private router: Router, private auth: AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  async Reg() {
    if(this.email==""){
      alert("enter email");
      return
    }
    if(this.password==""){
      alert("enter password");
      return
    }
     if(this.comfirmPassword==""){
      alert("enter comfirm password");
      return
     }

     if( this.password !== this.comfirmPassword){
      alert("passwords do not match")
      return
     }
    
     

     
    const loader = await this.loadingController.create({
      message: 'Signing up',
      cssClass: 'custom-loader-class'
    });
    await loader.present();





    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        loader.dismiss();

        this.router.navigateByUrl("/login");
        this.presentToast()
        // ...
      })
      .catch((error) => {
        loader.dismiss();
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorMessage=="Firebase: Error (auth/missing-email)."){

        }else if(errorMessage=="Firebase: The email address is badly formatted. (auth/invalid-email)."){
          alert("badly formatted e email");
        }else if(errorMessage=="Firebase: The email address is already in use by another account. (auth/email-already-in-use)."){
          alert("invalid email or password");
        }
        else if(errorMessage=="Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
          alert("invalid email");
        }else{
          alert(errorMessage);
        }

      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'successfully registered!',
      duration: 1500,
      position: 'top'
    });

  }

}

