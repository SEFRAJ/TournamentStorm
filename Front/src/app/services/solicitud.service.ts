import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './global.service';
import { Solicitud } from '../models/solicitud.model';
import { Observable } from 'rxjs';

@Injectable()
export class SolicitudService {
  public url:String;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //---------------------------------------------------------------------------
   enviarSolicitud(solicitud:Solicitud,receptorId,token):Observable<any>{

    let params = JSON.stringify(solicitud)

    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
    
    return this._http.post(this.url+'solicitud/'+receptorId,params,{headers:headers})
   }
   //---------------------------------------------------------------------------
   solicitudes(token):Observable<any>{
     let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

    return this._http.get(this.url+'solicitudes',{headers:headers})
   }

   //---------------------------------------------------------------------------
   aceptarSolicitud(idSolicitud, solicitud: Solicitud,token):Observable<any>{
    let params = JSON.stringify(solicitud)
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);

     return this._http.post(this.url+'agregar-amigo/'+idSolicitud,params,{headers:headers});
   }

   //---------------------------------------------------------------------------
   eliminarSolicitud(idSolicitud):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');

     return this._http.delete(this.url+'eliminar-solicitud/'+idSolicitud,{headers:headers});
   }
}
