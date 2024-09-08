import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {}

  // Adicionar tarefa no Firestore
  addTask(task: Task) {
    task.id = this.afs.createId();
    return this.afs.collection('/Tasks').doc(task.id).set(task);
  }

  // Obter todas as tarefas
  getAllTasks() {
    return this.afs.collection('/Tasks').snapshotChanges();
  }

  // Excluir tarefa
  deleteTask(task: Task) {
    return this.afs.doc('/Tasks/' + task.id).delete();
  }

  // Atualizar tarefa
  updateTask(task: Task) {
    return this.afs.doc('/Tasks/' + task.id).update(task);
  }
}
