import { Component, OnInit, Input } from '@angular/core';
import { MomentModule } from 'angular2-moment'

import { Publicacion } from 'src/app/models/publicacion.model';
import { Foro} from 'src/app/models/foro.model'

import { PublicacionService } from 'src/app/services/publicacion.service';
import { ForoService } from 'src/app/services/foro.service'
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-foroid',
  templateUrl: './foroid.component.html',
  styleUrls: ['./foroid.component.scss'],
  providers: [ PublicacionService, UserService, ForoService ]
})
export class ForoidComponent implements OnInit {

  public token;
  public status: string;

  public publicaciones: Publicacion;
  public publicacionModel: Publicacion;
  public dato;
  public dato2: String
  public foros: Foro[]
  public foro: Foro
  public id;
  
  constructor(private _publicacionService: PublicacionService, private _userService: UserService, private _foroService: ForoService) {
    //this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken(); 
    this.publicacionModel = new Publicacion("","","","","")
    this.dato = this._userService.getForoId()
    this.id = this.dato._id
    this.foro = this.foro

   // this.dato = this._foroIdService.getForoId()
    //this.dato = sessionStorage.getItem("idForo")   
   }

  ngOnInit() {
    this.getPublicaciones(this.id)
    this.getForos()
    this.getForo(this.id)
  // this._foroIdService.getForoId()  
  // this.dato = sessionStorage.getItem("idForo") 
   //this._foroService.getForoId()  
  //this.dato = this._foroService.getForoId()
   //this.dato = sessionStorage.getItem("idForo")
    //this.dato2 = this.dato.substr()
  }

  
  addPublicacion(id){
    this._publicacionService.addPublicacion(this.token,this.publicacionModel,id).subscribe(
      response=>{
        if(response){
          this.status = 'ok'
         this.publicacionModel = new Publicacion("","","","","")
          this.getPublicaciones(this.id);
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

  getPublicaciones(id){
    this._publicacionService.getPublicaciones(id).subscribe(
      response=>{
        if(response.publicaciones){
          console.log(response.publicaciones)
          this.publicaciones = response.publicaciones;
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
          this.publicaciones = null;
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

  getForo(id){
    this._foroService.getForo(id).subscribe(
      response=>{
        if(response.foro){
            console.log(response.foro)
          this.foro = response.foro;
          
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
          this.foro = null;
        }
      }
    )

  }

  
}
