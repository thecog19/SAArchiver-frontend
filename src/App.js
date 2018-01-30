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
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
//TODO: loading bar

class Navigation extends React.Component {
  constructor(props){
    super(props)
    this.state = {open: false}
  }
  about(){
    this.setState({open:true})
  }

  handleClose(){
    this.setState({open: false})
  }

  render() {
    const styles = {
      title: {
        cursor: 'default',
      },
    };

     const actions = [
      <FlatButton
        label="Exit"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />
    ];
    return(
      <div>
      <AppBar iconElementRight={<FlatButton label="About"  onClick={this.about.bind(this)}/>} showMenuIconButton={false} title={<span style={styles.title}>Something Awful CYOA Archiver</span>} />
      <Dialog
          title="About SAArchiver"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          This is a project to archive select Choose Your Own Adventure threads on <a href="https://forums.somethingawful.com"> something awful</a>.
          <br/>
          This project is open source, and the repositories for it can be found on github

          <a href="https://github.com/thecog19/SAArchiver-frontend"> Frontend</a>,
          <a href="https://github.com/thecog19/SAArchiver"> Backend</a>
          <br/>
          <br/>
          Feedback, including archive requests can be sent to SArchiver@gmail.com 
          <br/>
          <br/>
          Only threads categorized as CYOA which exceed 100 pages in length or for which a legitimate argument of notability can be made will be archived. 
        </Dialog>      

      </div>)
  }
}

class Pagination extends React.Component{
  constructor(props){
    super(props)
    const elementArr = []
    for(var i = 1; i <= this.props.total; i++){
      elementArr.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)
    }
    this.state = {dropdown: elementArr, loading: true}
  }

  componentWillReceiveProps(nextProps){
    this.state.loading = nextProps.loading

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
    this.props.changePage(this.props.total)
  }


  render(){
    return(
     <Toolbar>
        <ToolbarGroup firstChild={true}>
          <RaisedButton
            onClick={this.firstPage.bind(this)}
            icon={<FirstPage />}
            disabled={this.props.page == 1 || this.props.loading}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            onClick={this.previousPage.bind(this)}
            icon={<LeftArrow />}
            disabled={this.props.page == 1 || this.props.loading}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          {this.populateAutocomplete()}
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            onClick={this.nextPage.bind(this)}
            icon={<RightArrow />}
            disabled={this.props.page == this.props.total || this.props.loading}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <RaisedButton
            onClick={this.lastPage.bind(this)}
            icon={<LastPage />}
            disabled={this.props.page == this.props.total || this.props.loading} 

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
    this.state = {page: 1, total: 30, url: "/posts", loading: true}
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

  setSearch(url, threadTitle, userName){
    this.setState({url: url, title: " : " + threadTitle + " : " + userName , nextPage: 1 })
  }

  setLoading(loading){
    this.setState({loading: loading})
  }

   render(){ 

     return (
      <Card>
        <CardText>
          <Navigation subtitle={this.state.title}/>
          <br/>  
          <Search setSearch={this.setSearch.bind(this)} loading={this.state.loading}/>
          <br/>

          <br/>
          <Pagination page={parseInt(this.state.page)} 
                      total={this.state.total} 
                      changePage={this.changePage.bind(this)}
                      loading={this.state.loading} 
                      />
          <br/>
          <PostArray setPageStatus={this.setPageStatus.bind(this)} 
                     nextPage={this.state.nextPage} 
                     clearNextPage={this.clearNextPage.bind(this)}
                     url={this.state.url}
                     setLoading={this.setLoading.bind(this)}
                     />
          <br/>
          <Pagination page={parseInt(this.state.page)} 
                      total={this.state.total} 
                      changePage={this.changePage.bind(this)}
                      loading={this.state.loading}
                      />
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
      text: 'name',
      value: 'id',
    };

    this.state = {loading: true,value: "all", threadList: [{id: 1, title: "this is a thread"}], userList: [{id: 4, name: "Diogenes"}]};
    this.loadUsers()
    this.loadThreads()
  }

  componentWillReceiveProps(nextProps){
    this.state.loading = nextProps.loading
  }

  loadUsers(){
    const instance = axios.create({baseURL: 'http://localhost:3001'})
    instance.get("/all_users").then((res)=>{
      var users = res.data
      this.setState({ userList: users });
      // console.log(this.state.userList)
    })
  }

  loadThreads(){
    const instance = axios.create({baseURL: 'http://localhost:3001'})
    instance.get("/all_threads").then((res)=>{
      var threads = res.data
      this.setState({ threadList: threads });
    })
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
      disabled={this.props.loading}
      filter={AutoComplete.caseInsensitiveFilter}
      maxSearchResults={10}
      openOnFocus={true}
      dataSource={this.state.threadList}
      dataSourceConfig={this.dataSourceConfigThread}
      onNewRequest= {this.handleAutocompleteChange.bind(this, "thread")}
    />)

    const userDropdown = (<AutoComplete 
      hintText="User"
      disabled={this.props.loading}
      filter={AutoComplete.caseInsensitiveFilter}
      maxSearchResults={10}
      openOnFocus={true}
      dataSource={this.state.userList}
      dataSourceConfig={this.dataSourceConfigUser}
      onNewRequest= {this.handleAutocompleteChange.bind(this, "user")}
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

  search(type){
    var url 

    if(this.state.searchText){
      //search cases
      if(this.state.thread && this.state.user){
        //search user inside thread
        if(type == "fuzzy"){
          url = "/thread/" + this.state.thread.thread_id + "/user/" + this.state.user.user_id + "/fuzzy/" + this.state.searchText
        }else{
          url = "/thread/" + this.state.thread.thread_id + "/user/" + this.state.user.user_id + "/strict/" + this.state.searchText
        }
      }else if(this.state.thread){
        //search inside a thread
        if(type == "fuzzy"){
          url = "/posts/thread/" + this.state.thread.thread_id + "/fuzzysearch/"+ this.state.searchText

        }else{
          url = "/posts/thread/" + this.state.thread.thread_id + "/strictsearch/"+ this.state.searchText

        }
      }else if(this.state.user){
        //search user posts
        if(type == "fuzzy"){
          url = "/posts/user/" + this.state.user.user_id + "/fuzzy/" + this.state.searchText
        }else{
          url = "/posts/user/" + this.state.user.user_id + "/strict/" + this.state.searchText
        }
      }else{ 
        //search all posts
        if(type == "fuzzy"){
          url = '/posts/search/fuzzy/' + this.state.searchText
        }else{
          url = '/posts/search/strict/' + this.state.searchText
        }
      }
    }else{
      //whole cases
      if(this.state.thread && this.state.user){
        //user inside thread
        url =  '/thread/' + this.state.thread.thread_id + '/user/' + this.state.user.user_id
      }else if(this.state.thread){
        //whole thread
        url = "/posts/bythread/" + this.state.thread.thread_id
      }else if(this.state.user){
        //whole user
        url = "/posts/byuser/" + this.state.user.user_id
      }else{ 
        //all posts (Default)
        url = "/posts"
      }
    }
    var title = ""
    var name = ""
    if(this.state.thread){
      title = this.state.thread.title
    }
    if(this.state.user){
      name = this.state.user.name
    }
    this.props.setSearch(url, title, name)
    this.setState({thread: undefined})
    this.setState({user: undefined})
  }

  searchText(event, value){
    this.setState({searchText: value})
  }

  render(){
    const style = {
      margin: 12,
    };

    return(
      <Toolbar >
        <ToolbarGroup firstChild={true}>
          <TextField  disabled={this.props.loading} hintText="Search Posts" style={style} onChange={this.searchText.bind(this)}/>
          <DropDownMenu disabled={this.props.loading} value={this.state.value} onChange={this.handleDropdownChange.bind(this, "value")}>
            <MenuItem value={"all"} primaryText="All Posts" />
            <MenuItem value={"user"} primaryText="By User" />
            <MenuItem value={"thread"} primaryText="By Thread" />
            <MenuItem value={"both"} primaryText="By Thread and User" />
          </DropDownMenu>
        </ToolbarGroup>
        {this.secondDropDown()}
        <ToolbarGroup lastChild={true}>
          <RaisedButton label="Fuzzy Search" 
                        primary={true} 
                        style={style} 
                        onClick={this.search.bind(this, "fuzzy")}
                        disabled={this.props.loading}
                        />
          <RaisedButton label="Strict Search" 
                        primary={true} 
                        style={style} 
                        onClick={this.search.bind(this, "strict")} 
                        disabled={this.props.loading}
                        />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

class Post extends React.Component{

  goToPost(){
    //#post480764289
    window.open(this.props.url + "#post" + this.props.id, "_blank")
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
      posts: [{id: "1", body: "this is some text, there are many like it, but this one is the best objectively. Proven by a committie", user_id: "1", url: "https://forums.somethingawful.com/showthread.php?threadid=3550307&userid=0&perpage=40&pagenumber=4744", post_id:"1"}],
      users: {"1": {name: "TheCog", quote: "The best things in life suck"}},
      page: 1,
      url: "/posts",
      loading: true 
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loading){
      this.setState({loading: nextProps.loading})
    }
    if(nextProps.nextPage){
      const nextPage = nextProps.nextPage
      this.props.clearNextPage()
      this.goToPage(nextPage, nextProps.url)
    }
  }

  mapPosts(posts){

    return (this.state.posts.map((post)=>{
     const user = this.state.users[post.user_id] || {name: undefined, image: undefined, post: undefined}
     return (<div key={post.id}>
     <Post poster={user["name"]}  avatar={user["image"]} subtitle={user["quote"]} text={post.body} url={post.url} id={post.post_id}/>
     <br/>
     </div>)}))
  }

  render(){
    if(this.state.loading){
      return (<div className="center">
              <CircularProgress size={80} thickness={5} />
            </div>)
    }else{
      return (<div> {this.mapPosts(this.state.posts, this.state.users)} </div>
      );
    }
  }

  goToPage(page, url){
    const instance = axios.create({baseURL: 'http://localhost:3001'})
    this.setState({loading: true})
    this.props.setLoading(true)
    instance.get(url + "?page=" + page).then((res)=>{
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
        this.setState({loading: false})
        this.props.setLoading(false)

        
      })
    }).catch((err)=>{
       console.log(err)
       this.setState({users: {1: {name: "ERROR", image: "http://www.iconsplace.com/icons/preview/red/error-256.png" , quote: err.message}}})
       this.setState({ posts: [{id: 1, user_id:1, body: "ERROR OCCURED: " + err}] })
       this.setState({loading:false})
       this.props.setLoading(false)
    })

  }

  componentDidMount() {
    // const instance = axios.create({baseURL: 'http://10.0.0.194:3000'})
    this.goToPage(1, "/posts")
    document.title = "CYOA Archiver";
  }
}

export default App;
