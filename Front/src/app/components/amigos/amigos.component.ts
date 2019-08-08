import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';

import { UserService } from 'src/app/services/user.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud.model';


@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss'],
  providers:[UserService, SolicitudService]
})
export class AmigosComponent implements OnInit {
 
  //public identity;
  public token;
  public status: string;
  public receptor: String;

  public amigos: User;
  public allUsuarios: User;
  public solicitud: Solicitud;

  public aray = new Array();
  public aray2 = new Array();
  constructor(private _userService: UserService, private _solicitudService:SolicitudService) {
    //this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken(); 
   }

  ngOnInit() {
    this.misAmigos();
    this.usuariosDisponibles();
  }


  onKey({target:{value}}) {
    this.aray = this.aray2.filter(v => v.nombre.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  }

  /*onKey(event: any) { // without type info
    this.aray.filter((usuario)=>)
    console.log(event.target.value);}*/

  //---------------------------------------------------------------------------

  usuariosDisponibles() {
    this._userService.usuariosDisponibles(this.token).subscribe(
      response=>{
        if(response.usuariosDisponibles){
          this.allUsuarios = response.usuariosDisponibles;
          this.status = 'ok'
          this.aray2 = response.usuariosDisponibles;
          this.aray = this.aray2;
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

  //---------------------------------------------------------------------------

  misAmigos(){
    this._userService.amigos(this.token).subscribe(
      response=>{
        if(response.Amigos){
          this.amigos= response.Amigos;
          console.log(response);
        }

      },
      error=>{
        var errorMessage = <any>error; 
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'error'
          this.amigos = null;
        }
      }
    )

  }

  //---------------------------------------------------------------------------
  enviarSolicitud(receptorId,nombreR){
    this.receptor = nombreR;
    this._solicitudService.enviarSolicitud(this.solicitud,receptorId,this.token).subscribe(
      response=>{
        if(response.message === 'solicitud enviada - creada CORRECTAMENTE'){
          this.status = 'solicitud enviada'
          console.log(response);
        }

        else if(response.message == 'Ya se ha enviado una solicitud'){
          console.log(response);
          this.status = 'solicitud reenviada'
        }

        
        setTimeout(() => {
          this.status = 'ok';
      }, 4000);


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

  //---------------------------------------------------------------------------
  eliminarAmigo(amigoId){
    this._userService.eliminarAmigo(amigoId,this.token).subscribe(
      response=>{
        if(response.message === 'Amigo eliminado CORRECTAMENTE'){
          this.misAmigos();
          this.status = 'ok';
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
