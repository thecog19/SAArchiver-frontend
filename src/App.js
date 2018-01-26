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
import Avatar from 'material-ui/Avatar';
import RightArrow from 'material-ui-icons/KeyboardArrowRight';
import LeftArrow from 'material-ui-icons/KeyboardArrowLeft';
import FirstPage from 'material-ui-icons/FirstPage';
import LastPage from 'material-ui-icons/LastPage';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';


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

class Pagination extends React.Component{
  constructor(props){
    super(props)
    const elementArr = []
    for(var i = 1; i <= this.props.total; i++){
      elementArr.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)
    }
    this.state = {dropdown: elementArr}
  }

  componentWillReceiveProps(nextProps){
    const elementArr = []
    var max = parseInt(nextProps.page) + 100
    var min = 1
    if(nextProps.page > 101){
      min = nextProps.page - 100
    }

    if(max >= nextProps.total){
      max = nextProps.total
    }

    for(var i = min; i <= nextProps.page; i++){
      elementArr.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)
    }
    for(var i = nextProps.page + 1; i <= max; i++){
      elementArr.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)
    }

    this.setState({dropdown: elementArr})
  }

  populateAutocomplete(){
      const dataSourceConfigThread = {
      text: 'text',
      value: 'value',
    };
    return (<DropDownMenu maxHeight={300} value={this.props.page} onChange={this.changePage.bind(this)}>
        {this.state.dropdown}
      </DropDownMenu>)
    
  }
  
  changePage(event, index, value){
    this.props.changePage(value)
  }

  firstPage(){
    this.props.changePage(1)
  }

  previousPage(){
    this.props.changePage(this.props.page - 1)
  }

  nextPage(){
    this.props.changePage(this.props.page + 1)
  }

  lastPage(){
    console.log(this.props.last)
    this.props.changePage(this.props.total)
  }


  render(){
    return(
     <Toolbar>
        <ToolbarGroup firstChild={true}>
          <RaisedButton
            onClick={this.firstPage.bind(this)}
            icon={<FirstPage />}
            disabled={this.props.page == 1}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            onClick={this.previousPage.bind(this)}
            icon={<LeftArrow />}
            disabled={this.props.page == 1}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          {this.populateAutocomplete()}
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            onClick={this.nextPage.bind(this)}
            icon={<RightArrow />}
            disabled={this.props.page == this.props.total}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RaisedButton
            onClick={this.lastPage.bind(this)}
            icon={<LastPage />}
            disabled={this.props.page == this.props.total}

          />
        </ToolbarGroup>
    </Toolbar>)
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

class AppContents extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 1, total: 30}
  }

  setPageStatus(page){
    this.setState({page: page.page, total: page.total});
  }

  changePage(page){
    this.setState({nextPage: page})
  }

  clearNextPage(){
    this.setState({nextPage: false})
  }

   render(){ 

     return (
      <Card>
        <CardText>
          <Navigation/>
          <br/>  
          <Search/>
          <br/>  
          <Pagination page={parseInt(this.state.page)} total={this.state.total} changePage={this.changePage.bind(this)}/>
          <br/>
          <PostArray setPageStatus={this.setPageStatus.bind(this)} 
                     nextPage={this.state.nextPage} 
                     clearNextPage={this.clearNextPage.bind(this)}/>
          <br/>
          <Pagination page={parseInt(this.state.page)} total={this.state.total} changePage={this.changePage.bind(this)}/>
        </CardText>
      </Card>
    )
   }
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
          avatar={<Avatar src={this.props.avatar} style={{ borderRadius: 0 }} size={70}></Avatar>}
          actAsExpander={true}
          showExpandableButton={true}
          style={{borderBottom: "1px solid"}}
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
      page: 1
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.nextPage){
      const nextPage = nextProps.nextPage
      this.props.clearNextPage()
      this.goToPage(nextPage, "/posts")
    }
  }

  mapPosts(posts){

    return (this.state.posts.map((post)=>{
     const user = this.state.users[post.user_id] || {name: undefined, image: undefined, post: undefined}
     return (<div key={post.id}>
     <Post poster={user["name"]}  avatar={user["image"]} subtitle={user["quote"]} text={post.body} url={post.url}/>
     <br/>
     </div>)}))
  }

  render(){
    return (<div> {this.mapPosts(this.state.posts, this.state.users)} </div>
    );
  }

  goToPage(page, url){
    const instance = axios.create({baseURL: 'http://localhost:3001'})

    instance.get(url + "?page=" + page).then((res)=>{
      console.log(res.request)
      const posts = res.data["posts"]
      const pages = res.data["meta"]
      this.setState({ posts });
      this.props.setPageStatus(pages)
      return posts
    }).then((posts) => {
      const users = {}
      const promiseArr = []
      for(var post of posts){
        var p = instance.get("/users/internal_id/" + post.user_id).then((res)=>{
          const result = res.data[0] 
          if(result.image){
              result.image = result.image.split(" ")[1].split("=")[1].replace(/"/g,"").replace(/>/g,"")
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

  componentDidMount() {
    // const instance = axios.create({baseURL: 'http://10.0.0.194:3000'})
    this.goToPage(1, "/posts")
  }
}

export default App;
