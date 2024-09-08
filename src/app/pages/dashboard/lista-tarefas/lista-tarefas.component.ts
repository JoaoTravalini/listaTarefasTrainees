import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../shared/auth.service';
import { Task } from '../../../model/task';
import { DataService } from '../../../shared/data.service';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.scss']
})
export class ListaTarefasComponent implements AfterViewInit, OnInit {

  visualizarLista: boolean = false;
  taskObj: Task = {
    id: '',
    titulo: '',
    descricao: '',
    dificuldade: 'fácil', // Definir um valor padrão
    concluida: false,
  };
  titulo: string = '';
  descricao: string = '';
  dificuldade: string = 'fácil';
  concluida: boolean = false;
  tarefas: Task[] = [];
  tarefaEditada: Task | null = null;
  tituloPagina: string = 'Lista de tarefas'; // Título da página

  constructor(private data: DataService, private auth: AuthService) {}

  ngOnInit() {
    // Carregar as tarefas do Firestore quando o componente for inicializado
    this.data.getAllTasks().subscribe((res: any) => {
      this.tarefas = res.map((e: any) => {
        const data = e.payload.doc.data();
        return {
          id: e.payload.doc.id,
          ...data
        } as Task;
      });
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  // Adiciona ou atualiza tarefa
  onSubmit(): void {
    if (this.tarefaEditada) {
      this.atualizarTarefa();
    } else {
      const newTask: Task = {
        id: '', 
        titulo: this.titulo,
        descricao: this.descricao,
        dificuldade: this.dificuldade,
        concluida: false,
      };

      this.data.addTask(newTask).then(() => {
        alert('Tarefa adicionada!');
        this.limparFormulario();
      });
    }
  }

  ativarLista(): void {
    this.visualizarLista = true;
    this.tituloPagina = 'Lista de tarefas';
  }

  concluirTarefa(task: Task): void {
    task.concluida = true;
    this.data.updateTask(task);
  }

  excluirTarefa(task: Task): void {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.data.deleteTask(task);
    }
  }

  editarTarefa(task: Task): void {
    this.titulo = task.titulo;
    this.descricao = task.descricao;
    this.dificuldade = task.dificuldade;
    this.tarefaEditada = task;
    this.visualizarLista = true;
    this.tituloPagina = 'Editando tarefa';
    window.scrollTo(0, 0);
  }

  atualizarTarefa(): void {
    if (this.tarefaEditada) {
      this.tarefaEditada.titulo = this.titulo;
      this.tarefaEditada.descricao = this.descricao;
      this.tarefaEditada.dificuldade = this.dificuldade;
      this.data.updateTask(this.tarefaEditada).then(() => {
        alert('Tarefa atualizada!');
        this.limparFormulario();
      });
    }
  }

  limparFormulario() {
    this.titulo = '';
    this.descricao = '';
    this.dificuldade = 'fácil';
    this.tarefaEditada = null;
  }

  logout(): void {
    this.auth.logout();
  }
}
