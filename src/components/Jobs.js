import React from 'react'
import axios from 'axios';



const BASE_URL = 'https://jsonplaceholder.typicode.com/users'


class Jobs extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            search:"",
            iniUsers:[],
            fullView:false,
            oneUser : null,

        };
      }

      componentDidMount() {
        axios.get(BASE_URL
        ,
       { headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials' : true,

        }}
        )
   
          .then(res => {
            const users = res.data;
            const iniUsers = res.data;
            this.setState({ users });
            this.setState({ iniUsers });
          })
      }

      JobsList() {
        axios.get(BASE_URL, {
            headers: {
            'Content-Type': 'application/json'
            }
          }
        )
        
      }
      updatSearch(e){
        let newArray = this.state.users.filter((d)=>{
            let searchValue = d.name.toLowerCase();
            return searchValue.indexOf(e.target.value) !== -1;
        });
        this.setState({
            users:newArray
        })
      }
      updatSearchdesc(e){
          console.log(this.state.users);
        let newArray = this.state.users.filter((d)=>{
            let searchValue = d.company.name.toLowerCase();
            return searchValue.indexOf(e.target.value) !== -1;
        });
        this.setState({
            users:newArray
        })
      }
      keypressed(e){
         if(e.keyCode == 8 ){
            this.setState({
                users:this.state.iniUsers
            })
         }

      }
      showDetails(){
          this.setState({
              fullView:true
          })
      }

      getOnUser(index){
          const userDetais = this.state.iniUsers.find(element => element.id == index);
            this.setState({
                oneUser : userDetais
            })
      }
            render() {
                return (
                  <div>
                        <div className="search">
                            <input type="text" 
                            placeholder="Search by User name"
                                onChange={(e)=>this.updatSearch(e)}
                                onKeyDown={(e)=>this.keypressed(e)}
                                
                            />
                            <input type="text" 
                            placeholder="Search by User Company"
                                onChange={(e)=>this.updatSearchdesc(e)}
                                onKeyDown={(e)=>this.keypressed(e)}
                                
                            />
                        </div>
                        <div className="container">
                        {!this.state.fullView && (
                        
                        this.state.users.map(((cloud, index) =>
                        
                              
                              <div class="card" 
                              onClick={()=>this.showDetails()}
  
                              >
                        <div class="card-header">
                      <div class="card-header__avatar"></div><a href="#" class="card-header__follow">  {cloud.company.name } </a>
                        </div>
                        <div class="card-content">
                          <div class="card-content__username"> {cloud.name}  </div>
                        <div class="card-content__bio"> {cloud.email} </div>
                        </div>
                        <div class="card-footer">
                        <div class="card-footer__pens"> <span>231</span>
                            <div class="label">Pens</div>
                        </div>
                        <div class="card-footer__followers"> <span>0</span>
                            <div class="label">Followers</div>
                        </div>
                        <div class="card-footer__following"> <span>0</span>
                            <div class="label">Following</div>
                        </div>
                        </div>
                </div>
                        ))
				)}

                            <div className="lists">
                               <ul>
                        {this.state.users.map(((cloud, index) =>

                                   <li key={index}
                                    onClick={(index)=>this.getOnUser(cloud.id)}
                                   > {cloud.name} </li>

                        ))}
                               </ul>
                            </div>
                        {this.state.oneUser && (

                            <div className="details">
                            <div class="card" 
  
                              >
                        <div class="card-header">
                      <div class="card-header__avatar"></div><a href="#" class="card-header__follow">  {this.state.oneUser.company.name } </a>
                        </div>
                        <div class="card-content">
                          <div class="card-content__username"> {this.state.oneUser.company.name}  </div>
                        <div class="card-content__bio"> {this.state.oneUser.company.email} </div>
                        </div>
                        <div class="card-footer">
                        <div class="card-footer__pens"> <span>231</span>
                            <div class="label">Pens</div>
                        </div>
                        <div class="card-footer__followers"> <span>0</span>
                            <div class="label">Followers</div>
                        </div>
                        <div class="card-footer__following"> <span>0</span>
                            <div class="label">Following</div>
                        </div>
                        </div>
                </div>
                            </div>
                        )}
                  
                  </div>
                  </div>

                );
              }
               
    
}

export default Jobs 