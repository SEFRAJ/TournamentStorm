import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  providers: [ UserService ]
})
export class TiendaComponent implements OnInit {
  public token;
  public status;

  public userModel: User;

  constructor(private _userService: UserService) { 
    this.token = this._userService.getToken(); 
    this.userModel = new User("","","","","",[],"",null);
  }

  ngOnInit() {
  }


    //-----------------------------------------------------------

    restarMoneda(cantidad){
      this.userModel.moneda = cantidad;
      this._userService.restarMonedas(this.token,this.userModel).subscribe(
        response=>{
          if(response){
            this.status = 'ok'
            this.userModel = new User("","","","","",[],"",null);
            console.log(response);
          }
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
