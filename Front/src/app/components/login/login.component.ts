import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  public userModel: User;
  public identity; 
  public token;
  public status;

  constructor( private _userService :UserService , private _router: Router ) { 

    this.userModel = new User("","","","","",[],"",null);
 
  }

  ngOnInit() {
  }

  getToken(){
    this._userService.login(this.userModel, 'true').subscribe(
      response=>{
        console.log(response)
        this.token = response.token;
        if(this.token.length <= 0){
          this.status = 'error'
        }else{
          sessionStorage.setItem('token',this.token)
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }
  
  login(){
    this._userService.login(this.userModel).subscribe(
      response=>{
        this.identity = response.user;
        console.log(this.identity);
        if(!this.identity){
          this.status = 'error'
        }else{
          sessionStorage.setItem('identity', JSON.stringify(this.identity));
          this.getToken();
          this.status = 'OK';
          this._router.navigate(['/home'])
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

}
