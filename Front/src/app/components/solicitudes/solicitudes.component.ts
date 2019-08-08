import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud.model';
import { UserService } from 'src/app/services/user.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

import { Router } from '@angular/router'



@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
  providers: [ UserService,SolicitudService ]
})
export class SolicitudesComponent implements OnInit {

  public solicitud : Solicitud;
  public solicitudAceptar: Solicitud;
  public token;
  public status;

  constructor(private _userService:UserService, private _solicitudService:SolicitudService, private _router:Router) {

    this.token = this._userService.getToken();
    
   }

  ngOnInit() {
    this.solicitudes();
  }

  //---------------------------------------------------------------------------

  solicitudes(){
    this._solicitudService.solicitudes(this.token).subscribe(
      response=>{

        if(response.Solicitud){
          this.solicitud = response.Solicitud;

        }

       /* else if (response.message = "No hay solicitudes de amistad") {
          this.solicitud = null;
        }*/
        
        console.log(response);

      },
      error=>{
        
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.solicitud = null;
        }
      }
    )
  }

  //---------------------------------------------------------------------------

  aceptarSolicitud(idSolicitud){
    this._solicitudService.aceptarSolicitud(idSolicitud, this.solicitudAceptar,this.token).subscribe(
      response=>{
        console.log(response);
        if(response.message === 'amigo agregado correctamente'){
          this.status = 'oks'
          this.solicitudes();
          setTimeout(() => {
            this.status = 'ok';
        }, 3000);
        }
        

      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){

        }
      }
    )
  }

  //---------------------------------------------------------------------------
  eliminarSolicitud(idSolicitud){
    this._solicitudService.eliminarSolicitud(idSolicitud).subscribe(
      response=>{
        console.log(response);
        if(response = 'Solicitud eliminada correctamente'){
          this.solicitudes();
          this.status = 'oke' 
          console.log(this.status); 
          setTimeout(() => {
            this.status = 'ok';
        }, 3000);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){

        }
      }
    )
  }

}
