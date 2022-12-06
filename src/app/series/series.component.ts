import { Component, OnInit } from '@angular/core';

import { Serie } from '../model/serie.model';
import { AuthService } from '../services/auth.service';
import { SerieService } from '../services/serie.service';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html'
})
export class SeriesComponent implements OnInit {

    series? : Serie[]; //un tableau de produits

  constructor(private serieService: SerieService,
              public authService: AuthService) {
   //this.produits=[];
     }

  ngOnInit(): void {

    this.chargerSeries();
  }

  chargerSeries(){
    this.serieService.listeSerie().subscribe(sers => {
      console.log(sers);
      this.series = sers;
      });
  }

supprimerSerie(s: Serie)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
  this.serieService.supprimerSerie(s.idSerie).subscribe(() => {
        console.log("serie supprimée");
        this.chargerSeries();     
      
});
}
 
 

}