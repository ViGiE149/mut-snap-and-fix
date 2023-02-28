import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email="";
  password="";

  constructor(private router:Router, private auth:AngularFireAuth,private toastController: ToastController) { }

  ngOnInit() {
  }

  Reg(){
    
    this.email= ((document.getElementById("email")as HTMLInputElement).value);
    this.password= ((document.getElementById("password")as HTMLInputElement).value);

    
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
  .then(userCredential => { 
    
    const user = userCredential.user;
    this.router.navigateByUrl("/login");
    this.presentToast()
    // ...
  })
  .catch((error) => {
    
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

