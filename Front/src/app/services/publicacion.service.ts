import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Publicacion } from '../models/publicacion.model';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()
export class PublicacionService {
  public url: String;
  public identity;
  public foroId;
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

   addPublicacion(token,publicacion: Publicacion, id):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    let params = JSON.stringify(publicacion);

    return this._http.post(this.url+'registrar-publicacion/'+id,params,{headers:headers});
   }

   //---------------------------------------------------------------------------


/*   deleteForo(foroId,token):Observable<any>{

    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization',token);


    return this._http.delete(this.url+'eliminar-foro/'+foroId,{headers:headers});
  }
 */
  //---------------------------------------------------------------------------

 /*  editForo(foroId,foro:Foro,token):Observable<any>{

    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(foro);

    return this._http.put(this.url+'editar-foro'+foroId,params,{headers:headers});
  }
  getForo(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url+'foro/'+id, {headers:headers})
   }
 */
   getPublicaciones(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url+'publicaciones/'+id,{headers:headers})
  }

}
