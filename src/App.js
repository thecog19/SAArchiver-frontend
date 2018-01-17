import React from 'react';
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <PostArray/>
      </MuiThemeProvider>
    );
  }
}

const Button = () => (
  <RaisedButton label="Default" />
);



class Post extends React.Component{
  render(){
    return (
       <Card>
        <CardHeader
          title={this.props.poster}
          subtitle={this.props.subtitle}
          avatar={this.props.avatar}
        />
        <CardText dangerouslySetInnerHTML={{ __html: this.props.text }} >
        </CardText>
      </Card>
      )
  }

  
}

const avatar = "http://fi.somethingawful.com/safs/titles/16/a4/00129241.0008.jpg"
const subtitle = "your: belonging to a person you're: you are lose: opposite of win loose: your mom HTH Beaky the Tortoise says, click here to join our choose Your Own Adventure Game! Paradise Lost: Clash of the Heavens!"

class PostArray extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      posts: [{id: "1", body: "this is some text", user_id: "1"}],
      users: {},
    };
  }

  mapPosts(posts){
    return (this.state.posts.map((post)=>{
     const user = this.state.users[post.user_id] || {name: undefined, image: undefined, post: undefined}
     
     return (<div key={post.id}>
     <Post poster={user["name"]} avatar={user.image || "https://mechanico.in/wp-content/uploads/2016/05/blank-user.jpg"} subtitle={user["quote"]} text={post.body}/>
     <br/>
     </div>)}))
  }

  render(){
    return (
      <Card>
        <CardText>
          {this.mapPosts(this.state.posts, this.state.users)}
          <Button />
        </CardText>
      </Card>
    );
  }

  componentDidMount() {
    const instance = axios.create({baseURL: 'http://10.0.0.194:3000'})

    instance.get("/posts/bythread/3550307=").then((res)=>{
      const posts = res.data
      this.setState({ posts });
      return posts
    }).then((posts) => {
      const users = {}
      const promiseArr = []
      for(var post of posts){
        var p = instance.get("/users/internal_id/" + post.user_id).then((res)=>{
          const result = res.data[0] 
          if(result.image){
              result.image = result.image.split(" ")[1].split("=")[1]
              console.log(result.image)
           }
          users[result.id] = result
        })
        promiseArr.push(p)
      }
      Promise.all(promiseArr).then(()=>{        
        this.setState({ users });
        
      })
    })
  }
}

export default App;
