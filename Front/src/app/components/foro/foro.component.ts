import { Component, OnInit } from '@angular/core';

import { Foro } from 'src/app/models/foro.model';

import { ForoService } from 'src/app/services/foro.service';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  providers: [ForoService, UserService]
})
export class ForoComponent implements OnInit {
 
    //public identity;
    public token;
    public status: string;
  
    public foros: Foro;
    public foroModel: Foro;
    public foroId;
    
    constructor(private _foroService: ForoService, private _userService: UserService, private _router: Router) {
      //this.identity = this._userService.getIdentity(); 
      this.token = this._userService.getToken(); 
      this.foroModel = new Foro("","","","")
      this.foroId = this.foroId
     }

  ngOnInit() {
    this.getForos()
  }

  addForo(){
    this._foroService.addForo(this.token,this.foroModel).subscribe(
      response=>{
        if(response){
          this.status = 'ok'
          this.foroModel = new Foro("","","","")
          this.getForos();
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

  misForos(){
    this._foroService.misForos(this.token).subscribe(
      response=>{
        if(response.foro){
          console.log(response.foro)
          this.foros = response.foro;

        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
          this.foros = null;
        }
      }
    )

  }

  getForos(){
    this._foroService.getForos().subscribe(
      response=>{
        if(response.foros){
          console.log(response.foros)
          this.foros = response.foros;

        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
          this.foros = null;
        }
      }
    )

  }

  datosForo(id,titulo,descripcion,idCreador){
    console.log(id)
    this.foroModel = new Foro(
      id,
      titulo,
      descripcion,
      idCreador
    )
    sessionStorage.setItem('foroId', JSON.stringify(this.foroModel));
    this.status = 'OK';
    this._router.navigate(['/foroid'])
    this.foroModel = new Foro("","","","")
  }

}
