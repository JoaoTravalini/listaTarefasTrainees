import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.scss']
})
export class ListaTarefasComponent implements AfterViewInit {

  visualizarLista: boolean = false;
  tarefaForm: FormGroup;
  tarefas: any[] = [];
  tarefaEditada: any = null;
  tituloPagina: string = 'Lista de tarefas'; // Nova variável para o título

  constructor(private fb: FormBuilder, private db: AngularFirestore, private auth: AuthService) { 
    this.tarefaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dificuldade: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // Esse método é chamado após a visualização ser inicializada
    window.scrollTo(0, 0);
  }

  onSubmit(): void {
    if (this.tarefaEditada) {
      this.atualizarTarefa();
    } else {
      let tarefa = this.tarefaForm.value;
      tarefa.concluida = false;
      this.tarefas.push(tarefa);
      this.tarefaForm.reset();
      alert('Tarefa adicionada!');
    }
  }

  ativarLista(): void {
    this.visualizarLista = true;
    this.tituloPagina = 'Lista de tarefas'; // Reseta o título quando ativar a lista
  }

  concluirTarefa(titulo: string): void {
    const index = this.tarefas.findIndex(t => t.titulo === titulo);
    if (index !== -1) {
      this.tarefas[index].concluida = true;
    }
  }

  excluirTarefa(titulo: string): void {
    const index = this.tarefas.findIndex(t => t.titulo === titulo);
    if (index !== -1) {
      this.tarefas.splice(index, 1);
    }
  }

  editarTarefa(titulo: string): void {
    const tarefa = this.tarefas.find(t => t.titulo === titulo);
    if (tarefa) {
      this.tarefaForm.setValue({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        dificuldade: tarefa.dificuldade
      });
      this.tarefaEditada = tarefa;
      this.visualizarLista = true;
      this.tituloPagina = 'Editando tarefa'; // Atualiza o título para "Editando tarefa"
      window.scrollTo(0, 0); // Rola para o topo da página
    } else {
      alert('Tarefa não encontrada!');
    }
  }

  atualizarTarefa(): void {
    if (this.tarefaEditada) {
      const index = this.tarefas.findIndex(t => t.titulo === this.tarefaEditada.titulo);
      if (index !== -1) {
        const tarefaAtualizada = this.tarefaForm.value;
        tarefaAtualizada.concluida = this.tarefaEditada.concluida;
        this.tarefas[index] = tarefaAtualizada;
        this.tarefaForm.reset();
        this.tarefaEditada = null;
        this.tituloPagina = 'Lista de tarefas'; // Reseta o título após atualizar a tarefa
        alert('Tarefa atualizada!');
      }
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
