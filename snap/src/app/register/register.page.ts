import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email="";
  password="";

  constructor( private loadingController: LoadingController,private router:Router, private auth:AngularFireAuth,private toastController: ToastController) { }

  ngOnInit() {
  }

 async Reg(){
    
    this.email= ((document.getElementById("email")as HTMLInputElement).value);
    this.password= ((document.getElementById("password")as HTMLInputElement).value);
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
    window.alert(errorMessage);
   
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

