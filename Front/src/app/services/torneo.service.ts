import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './global.service';
import { Torneo } from '../models/torneo.model';
import { FaseTorneo } from '../models/faseTorneo.model';
import { Observable } from 'rxjs';

@Injectable()
export class TorneoService {
  public url:String;
  public identity;
  public token;
  public foroId;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }
   getIdentity(){
    var identity2 = JSON.parse(sessionStorage.getItem('identity'))
    if(identity2 != 'undefined'){
      this.identity = identity2;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  
  getId(){
    var identity2 = sessionStorage.getItem('torneoid')
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

   addTorneo(token,torneo: Torneo):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    let params = JSON.stringify(torneo);

    return this._http.post(this.url+'add-torneo',params,{headers:headers});
   }
   addUser(token, id, idj,jugador,):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.post(this.url+'add-user-torneo/'+id,{idj, jugador},{headers:headers});
   }
   addResultado(token, p1,p2,j1,j2,n1,n2, id):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.post(this.url+'add-resultado-torneo/'+id,{p1,p2,j1,j2,n1,n2},{headers:headers});
   }
   initTorneo(token, id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.get(this.url+'init-torneo/'+id,{headers:headers})
  }
  advTorneo(token, id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.get(this.url+'ava-torneo/'+id,{headers:headers})
  }
  endTorneo(token, id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.get(this.url+'end-torneo/'+id,{headers:headers})
  }
  getTorneo(token,id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.get(this.url+'torneo/'+id, {headers:headers})
   }
   getCodigo(id): Observable<any>{
    return this._http.get(this.url+'codigo/'+id)
   }
   getMeTorneos(id): Observable<any>{
    return this._http.get(this.url+'me-torneos/'+id)
   }
   getTorneosPrivados(id): Observable<any>{
    return this._http.get(this.url+'me-torneos-privados/'+id)
   }
   getFase(token,id,fase): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.post(this.url+'fase/'+id,{fase},{headers:headers});
   }

   getTorneos(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token)

    return this._http.get(this.url+'torneos',{headers:headers})
  }
}