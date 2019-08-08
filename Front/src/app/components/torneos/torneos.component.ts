import { Component, OnInit } from '@angular/core';
import { TorneoService } from 'src/app/services/torneo.service';
import { Torneo } from 'src/app/models/torneo.model';
import { Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss'], 
  providers: [TorneoService]
})
export class TorneosComponent implements OnInit {
  public token;
  public identity;
  public status: string;
  public status2= 'ok';

  public torneos: Torneo[];
  public torneosme: Torneo[];
  public torneo: Torneo;
  public TorneoId;
  public tipo = false;
  public validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public basic= false;
  public basic2= false;
  public codigo = "";

  public privado= false;  

  constructor(private _service: TorneoService, private _router: Router) {
    this.token = this._service.getToken(); 
    this.torneo = new Torneo("","","","","", false,0,null, "", 0,0,0,0,0,[{id:"",nombre:"", puntosA: 0, puntosE: 0, go:false}],false,false)
    this.identity = this._service.getIdentity();
   }

  ngOnInit() {
    this.getTorneos();
    
  }
  addTorneo(){
    this.validateBtnState = ClrLoadingState.LOADING;
    this._service.addTorneo(this.token,this.torneo).subscribe(
      response=>{
        if(response){
          this.status = 'ok'
          this.torneo = new Torneo("","","","","", false,0,null, "", 0,0,0,0,0,[{id:"",nombre:"", puntosA: 0, puntosE: 0, go:false}],false,false)
          this.getTorneos();
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
    this.validateBtnState = ClrLoadingState.SUCCESS;
    this.basic = false;
  }
  getTorneos(){
    this._service.getTorneos(this.token).subscribe(
      response=>{
        if(response.torneos){
          console.log(response.torneos)
          this.torneos = response.torneos;
          this.getMeTorneos();
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
          this.torneos = null;
        }
      }
    )
  }
  getTorneosPrivados(){
    this._service.getTorneosPrivados(this.identity._id).subscribe(
      response=>{
        if(response.torneo){
          console.log(response.torneo)
          this.torneos = response.torneo;
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'Vacio'
          this.torneos = null;
        }
      }
    )
  }
  getMeTorneos(){
    this._service.getMeTorneos(this.identity._id).subscribe(
      response=>{
        if(response.torneos){
          console.log(response.torneos)
          this.torneosme = response.torneos;
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
          this.torneosme = null;
        }
      }
    )
  }
  getCodigo(){
    this.validateBtnState = ClrLoadingState.LOADING;
    this._service.getCodigo(this.codigo).subscribe(
      response=>{
        if(response.message == 'Codigo Invalido'){
          this.codigo = "";
        }
        if(response.torneos){

          this.redi(this.codigo);
          this.basic2 = false;
        }
      }
    )
    this.validateBtnState = ClrLoadingState.SUCCESS;

  }
  getTipo(){

    switch (this.privado) {
      case false:
          this.getTorneosPrivados();
          this.privado = true;
        break;
    
      case true:
        this.getTorneos();
        this.privado = false;
        break;
      default:
        break;
    }
  }
  redi(id){
    sessionStorage.setItem('torneoid', id);
    this.status = 'OK';
    this._router.navigate(['/torneoid'])
  }

}
