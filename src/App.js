import React from 'react';
import ListItem from './ListItem';
import axios from 'axios'
import logo from './todosLogo.png';
import loadGif from './spinnwheel.gif'
import './App.css';

class App extends React.Component {
      constructor(){
        super();
        this.state = {
          newTodo: "",
          editing: false,
          editingIndex: null,
          notification: null,
          todos:[],
          loading: true
        }
        this.apiUrl = "http://5d46224972adf500143e1a7c.mockapi.io"
        this.handleChange = this.handleChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.editTodo= this.editTodo.bind(this)
        this.deleteTodo= this.deleteTodo.bind(this) 
        this.updateTodo = this.updateTodo.bind(this)
        this.alert = this.alert.bind(this)
      }
    
    async componentDidMount(){
      const response = await axios.get(`${this.apiUrl}/todos`)

      setTimeout(()=>{
        this.setState({
        todos: response.data,
        loading: false
      })
      },1000)
     
    }
    componentWillMount(){
      // console.log('wil mount')
    }
    
    handleChange(event){
      // console.log(event.target.name, event.target.value)
      this.setState({
        newTodo: event.target.value
      })
    }

    async addTodo(){
      //DEBUG
      // const newTodo ={
      //   name: this.state.newTodo,
      //   id: this.generateTodoId()
      // }
      const response = await axios.post(`${this.apiUrl}/todos`,{
        name: this.state.newTodo
      });

      console.log(response)

      const todos = this.state.todos;
      todos.push(response.data);
      
      this.setState({
        todos: todos,
        newTodo:""
      })
      this.alert('ToDo added successful')
    }

    
    editTodo(index){
      const todo = this.state.todos[index];
      this.setState({
        editing: true,
        newTodo: todo.name,
        editingIndex: index
      })
    }
    async updateTodo(){
      const todo = this.state.todos[this.state.editingIndex];

      const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`,{
        name: this.state.newTodo
      });

      // todo.name = this.state.newTodo; // set new title

      const todos = this.state.todos;  //get state

      todos[this.state.editingIndex] = response.data //update state

      this.setState({
        todos,
        editing: false, 
        editingIndex: null,
        newTodo: ''
      })
      this.alert('ToDo updated successful')
    }

    async deleteTodo(index){
      const todos = this.state.todos;
      const todo = todos[index];
      const response = await axios.delete(`${this.apiUrl}/todos/${todo.id}`)
      
      delete todos[index];

      this.setState({ todos });
      this.alert('ToDo delete successful')
    }

    alert(notification){
      this.setState({
        notification
      });
      setTimeout(()=>{
        this.setState({
          notification: null
        })
      },2000)
    }
   
    render(){
      // console.log(this.state.newTodo)
      return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo animated 2s bounce " alt="logo" />
            </header>
          <div className="container">
            {
              this.state.notification &&
              <div className="alert alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
            }
            <input type="text" 
            name="todos"
            value = {this.state.newTodo}
            className="my-4 form-control"
            placeholder="Add a new todo"
            onChange={this.handleChange}
            />
            <button 
              onClick={this.state.editing ? this.updateTodo : this.addTodo}
              disabled={this.state.newTodo.length < 5} //check for characters
              className="btn-success mb-3 form-control">
              {this.state.editing ? 'Update todo': 'Add Todo'} 
              
            </button>
            {
              this.state.loading &&
              <img className="loader" src={loadGif} alt='' />
            }
            {
              (!this.state.editing || this.state.loading) &&
              <ul className="list-group">
              {this.state.todos.map((item, index)=>{
                return <ListItem 
                  key={item.id}
                  item={item}
                  editTodo={()=> {this.editTodo(index)}}
                  deleteTodo ={() => {this.deleteTodo(index)}}
                />
              })}
              </ul>
            }
           
              
            </div>
          </div>
    )
    }
  
}

export default App;
