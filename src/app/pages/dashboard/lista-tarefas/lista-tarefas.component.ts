import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrl: './lista-tarefas.component.scss'
})
export class ListaTarefasComponent {

  // variável para controlar se a lista de tarefas foi iniciada (true) ou não (false). Inicializada como false.
  visualizarLista: boolean = false;

  // formulário da tarefa
  tarefaForm: FormGroup;

  // vetor de tarefas
  tarefas: any[] = [];

  // o construtor do componente declara quais serão os campos do formulário (manipulados no HTML através da tag "formGroup"), 
  // como eles são inicializados e se eles são obrigatórios ou não.
  constructor(private fb: FormBuilder, private db: AngularFirestore, private auth : AuthService ) { 
    this.tarefaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dificuldade: ['', Validators.required]
    });
  }


  // cria uma variável e atribui o valor do formulário para ela. Além disso, adiciona o atributo concluída como false, para sempre começar como pendente. 
  // adiciona no vetor de tarefas e limpa os campos do formulário.
  onSubmit(): void {
    let tarefa = this.tarefaForm.value;
    tarefa.concluida = false;
    this.tarefas.push(tarefa);
    this.tarefaForm.reset();
    alert('Tarefa adicionada!');
  }

  ativarLista(){
    this.visualizarLista = true;
  }

  // procura a tarefa a partir de seu título e torna seu atributo "concluída" como true.
  concluirTarefa(titulo: string): void {
    const index = this.tarefas.findIndex(t => t.titulo === titulo);
    
    this.tarefas[index].concluida = true;
  }

  // procura a tarefa a partir de seu título e a exclui.
  excluirTarefa(titulo: string): void {
    const index = this.tarefas.findIndex(t => t.titulo === titulo);
    
    this.tarefas.splice(index, 1); 
  }

  editarTarefa(titulo: string): void {
    
  }

  logout(){
    this.auth.logout();
  }

}
