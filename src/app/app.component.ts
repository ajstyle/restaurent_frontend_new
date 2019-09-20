import { Component , AfterViewInit , OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute , Router , NavigationEnd } from '@angular/router';
import {ApiService} from './services/api.service' ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  localStorage: any;
  token: any ;


  constructor(public afAuth: AngularFireAuth , public http: HttpClient, public route: ActivatedRoute ,
              public apiService: ApiService , public _router: Router) {




    }
ngOnInit() {

  this._router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
 
  this.route.queryParams.subscribe(params => {
  if ( params.uid) {
        this.apiService.getCustomToken(params.uid).subscribe(customToken => {

          this.token = customToken;

          console.log(this.token);
          this.afAuth.auth.signInWithCustomToken(this.token.customToken).then(user => {
            console.log(user);

            this.afAuth.auth.onAuthStateChanged(user => {
              if (user) {
               console.log(user);

              } else {
             // window.location.href = 'https://restaurants-user-profile.herokuapp.com/#/authentication/signin?order=true';

              }
            });

           }).catch((error) => {
             // Handle Errors here.
             const errorCode = error.code;
             const errorMessage = error.message;
             console.log(errorCode);
             console.log(errorMessage);

           });
         });
      } else {
       window.location.href = 'https://restaurants-user-profile.herokuapp.com/#/authentication/signin?order=true';
    
  // window.location.href = 'http://localhost:4201/#/authentication/signin?order=true';
    }
  });

}
  });
}}



