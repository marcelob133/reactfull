import './styles.css';
import { Component } from 'react'
import { Posts } from '../../components/Posts'
import { loadPosts } from '../../utils/load-posts'

class Home extends Component{

  state = {
    name: 'Marcelo',
    counter: 0,
    posts: []
  }

  timeoutUpdate = null

  async componentDidMount(){
    await this.loadPosts()
    this.handleTimeout()
  }
  
  loadPosts = async () => {
    const postsAndPhotos = await loadPosts()
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

    this.timeoutUpdate = setTimeout( () => {
      this.setState({
        counter: counter + 1
      })
    }, 8000)
  }

  handlePClick = () =>{
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
          <Posts posts={posts}/>
        </section>
      </div>
    );
  }
}

export default Home;
