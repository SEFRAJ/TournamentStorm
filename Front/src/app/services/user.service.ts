import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user.model';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public url: String;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //---------------------------------------------------------------------------

   getIdentity(){
    var identity2 = JSON.parse(sessionStorage.getItem('identity'))
    if(identity2 != 'undefined'){
      this.identity = identity2;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  //---------------------------------------------------------------------------

  getDatosVersus(){
    var identity2 = JSON.parse(sessionStorage.getItem('versus'))
    if(identity2 != 'undefined'){
      this.identity = identity2;
    }else{
      this.identity = null;
    }
    return this.identity;
  }
 //--------------------------------------------------------------------------------------------------------
  getForoId(){
    var identity2 = JSON.parse(sessionStorage.getItem('foroId'))
    if(identity2 != 'undefined'){
      this.identity = identity2;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  //--------------------------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------

  getToken(){
    var token2 = sessionStorage.getItem('token')
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }

  //---------------------------------------------------------------------------

   registro(usuario: User):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = JSON.stringify(usuario);

    return this._http.post(this.url+'registrar-usuario',params,{headers:headers});
   }

   //---------------------------------------------------------------------------

   login(user, gettoken = null): Observable<any>{
    if(gettoken != null){
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json'); 

    return this._http.post(this.url+'login',params,{headers: headers})
  }

  //---------------------------------------------------------------------------

  amigos(token):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization',token);

    return this._http.get(this.url+'amigos',{headers:headers});
  }

  //---------------------------------------------------------------------------

  eliminarAmigo(amigoId,token):Observable<any>{

    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization',token);


    return this._http.delete(this.url+'eliminar-amigo/'+amigoId,{headers:headers});
  }

  //---------------------------------------------------------------------------
  usuariosDisponibles(token):Observable<any>{

    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization',token);

    return this._http.get(this.url+'usuarios-disponibles',{headers:headers});
  }

  //---------------------------------------------------------------------------
  addMonedas(token,usuario: User):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);

    let params = JSON.stringify(usuario);

    return this._http.post(this.url+'add-monedas',params,{headers:headers});
   }
  //---------------------------------------------------------------------------
  restarMonedas(token,usuario: User):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);

    let params = JSON.stringify(usuario);

    return this._http.post(this.url+'restar-monedas',params,{headers:headers});
   }
}
