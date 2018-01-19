import React from 'react';
import axios from 'axios'
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';



class Navigation extends React.Component {

  render() {
    const styles = {
      title: {
        cursor: 'default',
      },
    };
    return(<AppBar showMenuIconButton={false} title={<span style={styles.title}>Something Awful CYOA Archiver</span>} />)
  }
}

class App extends React.Component {

  muiTheme() {return (getMuiTheme({
    palette: {
      borderColor: cyan500,
    },
    appBar: {
      height: 50,
    },
  }))}

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme()}>
        <AppContents />
      </MuiThemeProvider>
    );
  }
}

const AppContents = () => {
   return (
    <Card>
      <CardText>
        <Navigation/>
        <br/>  
        <Search/>
        <br/>  
        <PostArray/>
      </CardText>
    </Card>
    )
}


class Search extends React.Component{
  constructor(props) {
    super(props);
    this.dataSourceConfigThread = {
      text: 'title',
      value: 'id',
    };
    this.dataSourceConfigUser = {
      text: 'title',
      value: 'id',
    };

    this.state = {value: "all", thread: 1, user: 1, threadList: [{id: 1, title: "this is a thread"}], userList: [{id: 4, name: "Diogenes"}]};
  }

  handleDropdownChange = (name,event, index, value) => {
    if(name == "value"){
      this.setState({value: value});
    }
  }

  handleAutocompleteChange = (name, value) =>{
    if(name == "thread"){
      this.setState({thread: value});
    }
    if(name == "user"){
      this.setState({user: value});
    }
  }

  secondDropDown(){
    const threadDropdown = (<AutoComplete 
      hintText="Thread"
      filter={AutoComplete.caseInsensitiveFilter}
      maxSearchResults={10}
      openOnFocus={true}
      dataSource={this.state.threadList}
      dataSourceConfig={this.dataSourceConfigThread}
      onNewRequest= {this.handleAutocompleteChange.bind(this, "thread")}
    />)

    const userDropdown = (<AutoComplete 
      hintText="User"
      filter={AutoComplete.caseInsensitiveFilter}
      maxSearchResults={10}
      openOnFocus={true}
      dataSource={this.state.userList}
      dataSourceConfig={this.dataSourceConfigUser}
      onNewRequest= {this.handleAutocompleteChange.bind(this, "thread")}
    />)

    if(this.state.value == "all"){
      return <div> </div>
    }else if(this.state.value == "user"){
      return  <ToolbarGroup> {userDropdown}  </ToolbarGroup>
    }else if(this.state.value == "thread"){
      return  <ToolbarGroup> {threadDropdown}  </ToolbarGroup>
    }else if(this.state.value == "both"){
      return  (<ToolbarGroup> {userDropdown} <ToolbarSeparator style={{backgroundColor:"none"}}/> {threadDropdown}</ToolbarGroup>)
    }
  }

  render(){
    const style = {
      margin: 12,
    };

    return(
      <Toolbar >
        <ToolbarGroup firstChild={true}>
          <TextField hintText="Search Posts" style={style}/>
          <DropDownMenu value={this.state.value} onChange={this.handleDropdownChange.bind(this, "value")}>
            <MenuItem value={"all"} primaryText="All Posts" />
            <MenuItem value={"user"} primaryText="By User" />
            <MenuItem value={"thread"} primaryText="By Thread" />
            <MenuItem value={"both"} primaryText="By Thread and User" />
          </DropDownMenu>
        </ToolbarGroup>
        {this.secondDropDown()}
        <ToolbarGroup lastChild={true}>
          <RaisedButton label="Search" primary={true} style={style} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

class Post extends React.Component{

  goToPost(){
    window.open(this.props.url, "_blank")
  }

  render(){
    return(
       <Card>
        <CardHeader
          title={this.props.poster}
          subtitle={this.props.subtitle}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions expandable={true}>
          <FlatButton label="To Post" onClick={this.goToPost.bind(this)}/>
          <FlatButton label="Posts By User" />
        </CardActions>
        <CardText dangerouslySetInnerHTML={{ __html: this.props.text }} >
        </CardText>
      </Card>
      )
  }

  
}

class PostArray extends React.Component{
  //TO DO: avatars are broken
  constructor(props) {
    super(props);

    this.state = {
      posts: [{id: "1", body: "this is some text, there are many like it, but this one is the best objectively. Proven by a committie", user_id: "1", url: "https://forums.somethingawful.com/showthread.php?threadid=3550307&userid=0&perpage=40&pagenumber=4744"}],
      users: {"1": {name: "TheCog", quote: "The best things in life suck"}},
    };
  }

  mapPosts(posts){
    return (this.state.posts.map((post)=>{
     const user = this.state.users[post.user_id] || {name: undefined, image: undefined, post: undefined}
     
     return (<div key={post.id}>
     <Post poster={user["name"]}  subtitle={user["quote"]} text={post.body} url={post.url}/>
     <br/>
     </div>)}))
  }

  render(){
    return (<div> {this.mapPosts(this.state.posts, this.state.users)} </div>
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
