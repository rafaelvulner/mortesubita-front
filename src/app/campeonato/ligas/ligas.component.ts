import { OnInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Campeonato } from '../domain/icampeonato';
import { LigasService } from './ligas.service';
import { Clube } from '../domain/clube';
import { ClubeService } from '../clube/clube.service';
import {SelectItem} from 'primeng/api';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'app-ligas',
    templateUrl: './ligas.component.html',
    styleUrls: ['./ligas.component.css'],
    styles: [`
        :host ::ng-deep .ui-multiselect {
            min-width: 15em;
        }

        :host ::ng-deep .ui-multiselected-item-token,
        :host ::ng-deep .ui-multiselected-empty-token {
            padding: 2px 4px;
            margin: 0 0.286em 0 0;
            display: inline-block;
            vertical-align:middle;
            height: 1.857em;
        }

        :host ::ng-deep .ui-multiselected-item-token {
            background: #007ad9;
            color: #ffffff;
        }

        :host ::ng-deep .ui-multiselected-empty-token {
            background: #d95f00;
            color: #ffffff;
        }
    `]
  })
export class LigasComponent implements OnInit {

    displayDialog: boolean;

    camp: Campeonato = {};

    selectedCamp: Campeonato;

    newCamp: boolean;
  
    camps: Campeonato[];

    clubsCamp: Clube[];
  
    cols: any[];
  
    /**teste */
    
    displayBasic: boolean;
    selectedClubs: Clube[];
    clubs: Clube[];


    constructor(
        private ligaService: LigasService,
        private clubeService: ClubeService
        ) { }
  
    ngOnInit() {
        
       
      this.listarCampeonatos();
        
        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'ano', header: 'Ano' },
            { field: 'nacionalidade', header: 'Nacionalidade' }
          ];
      }
      
      showDialogToAdd() {
          this.newCamp = true;
          this.camp = {};
          this.displayDialog = true;
      }
      
      listarCampeonatos(){
          
          this.ligaService.buscarLigas().then(camps => {
            this.camps = camps;
          });
    }
  
    save() {
        this.ligaService.salvar(this.camp).then(resp => {
          const camps = [...this.camps];
        if (this.newCamp) {
            camps.push(this.camp);
        } else {
            camps[this.camps.indexOf(this.selectedCamp)] = this.camp;
        }
  
        this.camps = camps;
        this.camp = null;
        this.displayDialog = false;
        this.listarCampeonatos();
        },
        err => {
  
        });
    }
  
    delete(id: number) {
        const index = this.camps.indexOf(this.selectedCamp);
        this.camps = this.camps.filter((val, i) => i !== index);
        this.camp = null;
        this.displayDialog = false;
        this.ligaService.delete(id).then(resp => {
            this.listarCampeonatos();

        });
    }
  
    onRowSelect(event) {
        this.newCamp = false;
        this.camp = this.cloneCamp(event.data);
        this.displayDialog = true;
}
  
    cloneCamp(c: Campeonato): Campeonato {
        const camp = {};
        // tslint:disable-next-line:forin
        for (const prop in c) {
            camp[prop] = c[prop];
        }
        return camp;
    }

    /**teste */
    showBasicDialog() {
        this.displayBasic = true;
    }

    excluirTimesDoCampeonato() {
        
        this.ligaService.excluirClubes(this.camp.id, this.selectedClubs);
        this.carregarClubes(this.camp.id);
        const index = this.camp.clubes.indexOf(this.selectedClubs);
        this.camp.clubes = this.camp.clubes.filter(old => old === this.selectedClubs);
      }
    
      mostrar(){
        this.carregarClubes(this.camp.id);
      }
    
      carregarClubes(id: number) {
        this.clubeService.buscarClubesDeUmCampeonato(id).then(club => {
          this.clubs = club;
        });

    }

}
