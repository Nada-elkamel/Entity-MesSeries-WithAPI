import { Type } from './../model/type.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from '../model/serie.model';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html'
})
export class AddSerieComponent implements OnInit {

  newSerie = new Serie();
  types! : Array<Type>;
  newIdType! : number;
  newTypes! : Type;
  
  constructor(private serieService: SerieService,
              private router : Router) { }

  ngOnInit(): void {

    this.serieService.listeTypes().
          subscribe((typs: any) => {
            //this.types = typs._embedded.types;
            console.log(typs);
            this.types=typs;
        });
 





        
  }

 
  addSerie(){
    this.newSerie.type = this.types.find(typ => typ.idType == this.newIdType)!;
    this.serieService.ajouterSerie(this.newSerie)
                      .subscribe(ser => {
                      console.log(ser);
                      this.router.navigate(['series']);
                      }); 
    }




}