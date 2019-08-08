import { Component, OnInit } from '@angular/core';
import { TorneoService } from 'src/app/services/torneo.service';
import { Torneo } from 'src/app/models/torneo.model';
import { FaseTorneo } from 'src/app/models/faseTorneo.model';
import { Router } from '@angular/router';
import { ResponsiveNavControlMessage } from '@clr/angular/layout/nav/responsive-nav-control-message';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-torneoid',
  templateUrl: './torneoid.component.html',
  styleUrls: ['./torneoid.component.scss'],
  providers: [TorneoService]
})
export class TorneoidComponent implements OnInit {
  public token;
  public status = 'ok';
  public identity;

  public torneos: Torneo[];
  public torneo: Torneo;
  public torneoId: string;
  public j1: string;
  public j2: string;
  public n1: Number;
  public n2: Number;
  public p1: Number;
  public p2: Number;
  public fase1: FaseTorneo;
  public fase2: FaseTorneo;
  public fase3: FaseTorneo;
  public fase4: FaseTorneo;
  public ver= false;
  public id: string;
  public jugador: string;
  public validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public basic2= false;


  constructor(private _service: TorneoService, private _router: Router) {
    this.token = this._service.getToken(); 
    this.torneo = new Torneo("","","","","", false,0,null, "", 0,0,0,0,0,[{id:"",nombre:"", puntosA: 0, puntosE: 0, go:false}],false,false)
    this.torneoId = this._service.getId();
    this.identity = this._service.getIdentity();
  };

  ngOnInit() {
    this.getTorneo();
  }
  verifi(id){
    for (let x = 0; x < this.torneo.jugadores.length; x++) {
      const element = this.torneo.jugadores[x].id;
          if(id === element){
              this.ver= true;
          }       
    }
  }
  getTorneo(){
    this._service.getTorneo(this.token,this.torneoId).subscribe(
      response=>{
        if(Response){
          console.log(response.torneos)
          this.torneo = response.torneos;
          this.getFases();
          this.verifi(this.identity._id)
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
  addUser(){
    this._service.addUser(this.token,this.torneoId, this.identity._id, this.identity.nombre).subscribe(
      response=>{
        if(response.torneoS){
          this.status = 'ok';
          this.getTorneo();
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
  addJugador(){
    this.validateBtnState = ClrLoadingState.LOADING;
    this._service.addUser(this.token,this.torneoId, this.id, this.jugador).subscribe(
      response=>{
        if(response.torneoS){
          this.status = 'Jugador Añadido'
          setTimeout(() => 
          {
            this.status = 'ok'
          },
          3000);
          this.getTorneo();
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
     

        }
      }
    )
    this.validateBtnState = ClrLoadingState.SUCCESS;
    this.basic2 = false;
  }
  initTorneo(){
    this._service.initTorneo(this.token,this.torneoId).subscribe(
      response=>{
        if(response.message == 'Participantes incompletos'){
          this.status = response.message
          setTimeout(() => 
          {
            this.status = 'ok'
          },
          3000);
          this.getTorneo();
        }else{
          this.status = 'Torneo Iniciado'
          setTimeout(() => 
          {
            this.status = 'ok'
          },
          3000);
          this.getTorneo();
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
  getFases(){
    console.log(this.torneo.faseI)
    switch (this.torneo.faseI) {
      case 4:
        this.getFase(1);
        this.getFase(2);
        this.getFase(3);
        this.getFase(4);
        break;
        case 3:
          this.getFase(1);
          this.getFase(2);
          this.getFase(3);
        break;
        case 2:
          this.getFase(1);
          this.getFase(2);
        break;
        case 1:
          this.getFase(1);
        break;
    
      default:
        break;
    }
    console.log(this.fase1)
    console.log(this.fase2)
    console.log(this.fase3)
    console.log(this.fase4)
  }
  getFase(fase){
    this._service.getFase(this.token,this.torneoId, fase).subscribe(
      response=>{
        if(response.torneos){

          switch (fase) {
            case 1:
            this.fase1 = response.torneos;
        break;
        case 2:
          this.fase2 = response.torneos;
        break;
        case 3:
          this.fase3 = response.torneos;
        break;
        case 4:
          this.fase4 = response.torneos;
        break;
          
            default:
              break;
          }
        }
        console.log(response.torneos)
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
        
        }
      }
    )
  }
  avaTorneo(){
    if(this.fase1.ganadores !== null){}
    this._service.advTorneo(this.token,this.torneoId).subscribe(
      response=>{
        if(response.torneoS){
          console.log(response.torneoS)
          this.torneos = response.torneoS;
          this.getTorneo();
          this.status = 'Se avanzo a la siguiente fase'
          setTimeout(() => 
          {
            this.status = 'ok'
          },
          3000);
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
  endTorneo(){
    this._service.endTorneo(this.token,this.torneoId).subscribe(
      response=>{
        if(response.torneoS){
          console.log(response.torneoS)
          this.torneos = response.torneoS;
          this.status = 'Torneo Finalizado'
          setTimeout(() => 
          {
            this.status = 'ok'
          },
          3000);
          this.getTorneo();
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
  addResultado(){
    this._service.addResultado(this.token,this.p1,this.p2,this.j1,this.j2,this.n1, this.n2, this.torneoId).subscribe(
      response=>{
        if(response.fase){
          this.status = 'Resultado Agregado'
          setTimeout(() => 
          {
            this.status = 'ok'
          },
          3000);
          this.getTorneo();
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
