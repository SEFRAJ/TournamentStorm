import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss'],
  providers: [ UserService ]
})
export class CreditosComponent implements OnInit {
  public token;
  public status;

  public userModel: User;

  constructor(private _userService: UserService) { 
    this.token = this._userService.getToken(); 
    this.userModel = new User("","","","","",[],"",null);
  }

  ngOnInit() {
  }


  addMoneda(cantidad){
    this.userModel.moneda = cantidad;
    this._userService.addMonedas(this.token,this.userModel).subscribe(
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
