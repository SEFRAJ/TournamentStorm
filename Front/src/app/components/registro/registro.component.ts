import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [ UserService ]
})
export class RegistroComponent implements OnInit {

  public status;

  public userModel: User;

  constructor(private _userService: UserService, private _router: Router) {

    this.userModel = new User("","","","","",[],"",null);
   }

  ngOnInit() {
  }

  registro(){
    this._userService.registro(this.userModel).subscribe(
      response=>{
        if(response){
          this.status = 'ok'
          console.log(response);
        }
        this._router.navigate(['/login']);

      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

}
