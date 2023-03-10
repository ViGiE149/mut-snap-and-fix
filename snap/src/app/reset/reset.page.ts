import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  email = "";

  constructor(private router:Router, private auth:AngularFireAuth) { }

  ngOnInit() {
  }


  reset(){
   
   
    this.auth.sendPasswordResetEmail(this.email)
    .then(userCredential => {
  
      window.alert("Email sent with link to reset your password");
      this.router.navigateByUrl("/login");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(errorMessage);
      // ..
    });
  }
}
