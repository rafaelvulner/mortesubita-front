import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
   this.usuario.email = 'rafaell.elias@hotmail.com';
  }

}
