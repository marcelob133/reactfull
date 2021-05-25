import logo from './logo.svg';
import './App.css';
import { Component } from 'react'

class App extends Component{

  // constructor(props){
  //   super(props)
    
  //   // this.handlePClick = this.handlePClick.bind(this)

  //   this.state = {
  //     name: 'Marcelo',
  //     counter: 0
  //   }
  // }

  state = {
    name: 'Marcelo',
    counter: 0,
    // posts: [
    //   {
    //     id: 1,
    //     title: 'O título 1',
    //     body: 'O corpo 1'
    //   },
    //   {
    //     id: 2,
    //     title: 'O título 2',
    //     body: 'O corpo 2'
    //   },
    //   {
    //     id: 3,
    //     title: 'O título 3',
    //     body: 'O corpo 3'
    //   }
    // ]
    posts: []
  }

  timeoutUpdate = null

  componentDidMount(){
    // setTimeout( () => {
    //     console.log('Oi! Montei o componente!')
    //     this.setState({
    //       posts: [
    //         {
    //           id: 1,
    //           title: 'O título 1',
    //           body: 'O corpo 1'
    //         },
    //         {
    //           id: 2,
    //           title: 'O título 2',
    //           body: 'O corpo 2'
    //         },
    //         {
    //           id: 3,
    //           title: 'O título 3',
    //           body: 'O corpo 3'
    //         }
    //       ]
    //     })
    //   }, 2500
    // )

    this.loadPosts()
    
    this.handleTimeout()
  }
  
  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postsResponse, photosResponse])

    const postsJson = await posts.json()
    const photosJson = await photos.json()

    const postsAndPhotos = postsJson.map((post, index)=>{
      return {
        ...post,
        cover: photosJson[index].url
      }
    })

    this.setState({
      posts: postsAndPhotos
    })
  }

  componentDidUpdate(){
    this.handleTimeout()
  }
  
  componentWillUnmount(){
    clearTimeout(this.timeoutUpdate)
  }

  handleTimeout = () => {
    const {
      counter
    } = this.state
    // posts[0].title = 'O título mudou!'

    this.timeoutUpdate = setTimeout( () => {
      this.setState({
        counter: counter + 1
      })
    }, 2000)
  }

  handlePClick = () =>{
    // const {name} = this.state
    // console.log(`<p> clicado com ${name}`)

    this.setState({
      name: 'Donald'
    })
  }

  handleAClick = (event) => {
    event.preventDefault()
    const {counter} = this.state
    this.setState({
      counter: counter + 1
    })
  }

  render(){
    const {
      name, 
      counter,
      posts
    } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            Qualquer coisa para {name} {counter}.
          </p>
          <a
            onClick={this.handleAClick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Este é o link
          </a>
        </header>
        <section className="container"> 
          <div className="posts">
            {
              posts.map(post => (

              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

export default App;
