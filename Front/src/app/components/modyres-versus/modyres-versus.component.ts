import { Component, OnInit } from '@angular/core';
import { Versus } from 'src/app/models/versus.model';

import { UserService } from 'src/app/services/user.service';
import { VersusService } from 'src/app/services/versus.service';
@Component({
  selector: 'app-modyres-versus',
  templateUrl: './modyres-versus.component.html',
  styleUrls: ['./modyres-versus.component.scss'],
  providers:[UserService, VersusService]
})
export class ModyresVersusComponent implements OnInit {
  public token;
  public status;
  public Dota;
  public Fornite;
  public lol;
  public fifa;
  public minecraft;
  public counter;
  public mortal;
  public resultado;
  public jugadores;
  public idV;

  //VERSUS
  public versus: Versus;
  public versusModel: Versus;

  constructor(private _userService: UserService,private _versusService: VersusService) {
    this.token = this._userService.getToken(); 
    this.versusModel = new Versus("","","","","","","","","","",0,0,0,"","","")
    this.Dota = "Dota"
    this.Fornite = "Fornite"
    this.lol = "League of Legends"
    this.fifa = "Fifa"
    this.minecraft= "Minecraft"
    this.counter = "Counter Strike"
    this.mortal = "Mortal Combat"
    this.jugadores = "VACANTE"
    this.resultado = "Aun sin decidir"
   }

  ngOnInit() {
  this.getTusVersus();
  }

   getTusVersus(){
    this._versusService.getTusVersus(this.token).subscribe(
      response=>{
        if(response.lista){
          console.log(response.lista)
          this.versus = response.lista;
        }else if(response.message = "No ha creado ningu versus"){
        this.versus = null;
        }
      },
      error=>{
        var errorMessage = <any>error; 
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
        }
      }
    )
  }


delVersus(id){            
  this._versusService.delVersus(this.token,id).subscribe(
    response=>{
      if(response){
        console.log(response)
        this.getTusVersus()
        this.status = 'OK'
      }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'ERROR'
        }
      }
    )
  }
  

 

}
