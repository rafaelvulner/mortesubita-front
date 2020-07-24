import { Component, OnInit } from '@angular/core';
import { ClubeService } from './clube.service';
import { Clube } from '../domain/clube';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-clube',
  templateUrl: './clube.component.html',
  styleUrls: ['./clube.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ClubeComponent implements OnInit {

  displayDialog: boolean;

    club: Clube = {};

    selectedClub: Clube;

    newClub: boolean;
  
    clubs: Clube[];
  
    cols: any[];

  
    constructor(
        private clubeService: ClubeService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
        ) { }
  
    ngOnInit() {
  
      this.listarClubes();
        
        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'estado', header: 'Estado' },
            { field: 'serie', header: 'Serie' }
          ];
      }
      
      showDialogToAdd() {
          this.newClub = true;
          this.club = {};
          this.displayDialog = true;
      }
      
      listarClubes() {
          
          this.clubeService.buscarClubes().then(campss => this.clubs = campss);
    }
  
    save() {
        this.clubeService.salvar(this.club).then(resp => {
          const cars = [...this.clubs];
        if (this.newClub) {
            cars.push(this.club);
        } else {
            cars[this.clubs.indexOf(this.selectedClub)] = this.club;
        }
  
        this.clubs = cars;
        this.club = null;
        this.displayDialog = false;
        this.listarClubes();
        },
        err => {
  
        });
    }
  
    delete(id: number) {

        this.confirmationService.confirm({
            message: 'Deseja mesmo excluir?',
            header: 'Atençao!',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {                
                this.clubeService.delete(id).then(resp => {
                    this.listarClubes();
                    const index = this.clubs.indexOf(this.selectedClub);
                    this.clubs = this.clubs.filter((val, i) => i !== index);
                    this.club = null;
                    this.displayDialog = false;
                }, 
                err => this.showError(err));
            },
            reject: () => {
                
            }
        });
    }

    showError(err) {
        this.messageService.add({severity:'error', summary: 'Erro!', detail: 'Clube não pode ser deletado!'});
    }

    onRowSelect(event) {
        this.newClub = false;
        this.club = this.cloneClubs(event.data);
        this.displayDialog = true;
    }
  
    cloneClubs(c: Clube): Clube {
        const club = {};
        // tslint:disable-next-line:forin
        for (const prop in c) {
            club[prop] = c[prop];
        }
        return club;
    }

}
