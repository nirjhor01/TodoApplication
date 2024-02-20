import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { log, warn } from 'node:console';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit{
  todos: Todo[]= [];
  newTodo: Todo = {
    id: 0,
    title: '',
    descriptions:'',
    isComplete: 0,
    dueDate:new Date(),
    currentDate:new Date()
    
  };
  newTodo2: Todo = {
    id: 0,
    title: '',
    descriptions:'',
    isComplete: 0,
    dueDate:new Date(),
    currentDate:new Date()
    
  };

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(){
    this.todoService.getAllTodos()
    .subscribe({
      next: (todos) => {
        this.todos = todos;
       
        
      }
    });
  }

  addTodo(){
   this.todoService.addTodo(this.newTodo)
   .subscribe({
    next: (todo) => {
       this.getAllTodos();
    }
   });
  }


    deleteTodo(id: number) {
      this.todoService.deleteTodo(id)
      .subscribe({
          next: (response) => {
              this.getAllTodos(); 
          }
      });      
    }

    f(i: number, curTodo: Todo){
      this.newTodo2.id=curTodo.id;
      this.newTodo2.title = curTodo.title;
      this.newTodo2.descriptions = curTodo.descriptions;
      this.newTodo2.dueDate = curTodo.dueDate;
      
    }

    updateTodo(){
      console.log("Update is working.....");

     // console.log(this.newTodo2)
      this.todoService.updateTodo(this.newTodo2)
      .subscribe({
       next: (todo) => {
          this.getAllTodos();
          console.log("Update is working....");
       }
      });
    }

}
