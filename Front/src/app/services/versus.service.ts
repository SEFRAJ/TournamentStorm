import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Versus } from '../models/versus.model';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
@Injectable()
export class VersusService {
  public url: String;
  public identity;
  public token;

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  //--------------------------------------
  addVersus(token,versus: Versus):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(versus);
    return this._http.post(this.url+'crear-versus',params,{headers:headers});
   }

  //--------------------------------------
  addRetador1Pago(token,id,versus:Versus):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(versus);
    return this._http.post(this.url+'add-retador1-paga/'+id,params,{headers:headers});
  }

  //--------------------------------------
  addRetador2Pago(token,id,versus:Versus):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(versus);
    return this._http.post(this.url+'add-retador2-paga/'+id,params,{headers:headers});
  }

  //--------------------------------------
  addRetador2Libre(token,id,versus:Versus):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(versus);
    return this._http.post(this.url+'add-retador2-libre/'+id,params,{headers:headers});
  }
  

  //--------------------------------------
  addResultadoPaga(token,id,versus: Versus):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(versus);
    return this._http.post(this.url+'add-resultado-paga/'+id,params,{headers:headers});
   }
  
  //--------------------------------------
  addResultadoLibre(token,id,versus: Versus):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    let params = JSON.stringify(versus);
    return this._http.post(this.url+'add-resultado-libre/'+id,params,{headers:headers});
   }


  //--------------------------------------
  getVersus(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);;
    return this._http.get(this.url+'versus', {headers:headers})
  }



  //--------------------------------------
  getTusVersus(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    return this._http.get(this.url+'versus-Creadror',{headers:headers})
  }

  //--------------------------------------

  getUnVersus(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'un-versus/'+id,{headers:headers})
  }

  //--------------------------------------

  getVersusParticipando(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);
    return this._http.get(this.url+'versus-participando',{headers:headers})
  }
  //--------------------------------------

  getVersusLibre(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'versus-libre',{headers:headers})
  }

  //--------------------------------------

  getVersusPaga(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'versus-paga',{headers:headers})
  }


  //--------------------------------------

  delVersus(token,id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization',token);

    return this._http.delete(this.url+'del-versus/'+id,{headers:headers})
   }

}
