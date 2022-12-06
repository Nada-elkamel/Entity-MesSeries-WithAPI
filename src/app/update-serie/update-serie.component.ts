/* 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SerieService } from '../services/serie.service';
import { Serie } from '../model/serie.model';


@Component({
  selector: 'app-update-serie',
  templateUrl: './update-serie.component.html',
  styles: []
})
export class UpdateSerieComponent implements OnInit {
  currentSerie = new Serie();
  types: import("c:/Users/Nada/Desktop/Angular_2020/MesSeries/src/app/model/type.model").Type[] | undefined;
    updatedTypeId: number | undefined;


  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private serieService: SerieService) { }

  ngOnInit(): void {
    this.serieService.listeTypes().
        subscribe(types => {console.log(types);
        this.types =types._embedded['types'];
        }
        );
        this.serieService.consulterSerie(this.activatedRoute.snapshot.params['id']).
        subscribe( ser =>{ this.currentSerie = ser;
        this.updatedTypeId = this.currentSerie.type.idType;
        } ) ;
}
updateSerie() {
  this.serieService.updateSerie(this.currentSerie).subscribe(() => {
  this.router.navigate(['series']);
  },(error) => { alert("Problème lors de la modification !"); }
  );
  }

 
 } */

 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from '../model/serie.model';
import { Type } from '../model/type.model';
import { SerieService } from '../services/serie.service';


@Component({
  selector: 'app-update-serie',
  templateUrl: './update-serie.component.html',
  styles: [
  ]
})
export class UpdateSerieComponent implements OnInit {

  currentSerie = new Serie();
  types! : Array<Type>;
  updatedTypeId! : number;
  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private serieService: SerieService) { }

  ngOnInit(): void {
    this.serieService.listeTypes().
    subscribe((typs: any) => {
    //this.types = typs._embedded.types;
    console.log(typs);
    this.types=typs;
    });


    this.serieService.consulterSerie(this.activatedRoute.snapshot.params['id']).
    subscribe( ser =>{ this.currentSerie = ser; 
      this.updatedTypeId =   this.currentSerie.type.idType;
    
    } ) ;
    }
    

  

  updateSerie() {
    this.currentSerie.type = this.types.find(typ => typ.idType == this.updatedTypeId)!;
         this.serieService.updateSerie(this.currentSerie).subscribe(ser => {
      this.router.navigate(['series']); }
      );
  }

}
