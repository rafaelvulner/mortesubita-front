import { OnInit, Component } from '@angular/core';
import { Campeonato } from '../domain/icampeonato';
import { LigasService } from './ligas.service';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';


@Component({
    selector: 'app-ligas',
    templateUrl: './ligas.component.html',
    styleUrls: ['./ligas.component.css']
  })
export class LigasComponent implements OnInit {

    displayDialog: boolean;

    camp: Campeonato = {};

    selectedCamp: Campeonato;

    newCamp: boolean;
  
    camps: Campeonato[];
  
    cols: any[];

    /**Teste */
    cars: SelectItem[];
    groupedCars: SelectItemGroup[];
    selectedCar2 = 'BMW';
    items: SelectItem[];

    item: string;
  
    constructor(
        private ligaService: LigasService) { }
  
    ngOnInit() {

        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }

        this.cars = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
  
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
          
          this.ligaService.buscarLigas().then(camps => this.camps = camps);
    }
  
    save() {
        this.ligaService.salvar(this.camp).then(resp => {
          const cars = [...this.camps];
        if (this.newCamp) {
            cars.push(this.camp);
        } else {
            cars[this.camps.indexOf(this.selectedCamp)] = this.camp;
        }
  
        this.camps = cars;
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

}
