import React from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// import Pagination from "react-bootstrap-4-pagination";




const BASE_URL = 'https://jobs.github.com/positions.json'
var cors_url = "https://cors-anywhere.herokuapp.com/";


class Jobs extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
        users: [],
        search:"",
        iniUsers:[],
        fullView:false,
        oneUser : null,
        offset: 0,
        data: [],
        perPage: 12,
        currentPage: 0,
        listUsers:[]
    };
    this.handlePageClick = this
        .handlePageClick
        .bind(this);
}
showDetails(){
  this.setState({
      fullView:true
  })
}
receivedData() {
    axios
        .get(cors_url + BASE_URL)
        .then(res => {

            const data = res.data;
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
//             const users = slice.map(pd =>
//               <div class="card" 
//               onClick={()=>this.showDetails()}

//               >
//         <div class="card-header">
//       <div class="card-header__avatar"></div><a href="#" class="card-header__follow">{pd.title}    </a>
//         </div>
//         <div class="card-content">
//           <div class="card-content__bio"> {pd.location}</div>
//           <div class="card-content__username"> {pd.type}  </div>
//               <button className="btn-view">View</button>
//         </div>
      
// </div>
 
//             )

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
               
                users:slice,
                iniUsers:slice,
                listUsers:data
            })
        });
}
handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};
updatSearch(e){
  
  let newArray = this.state.users.filter((d)=>{
    console.log(d);
      let searchValue = d.location.toLowerCase();
      return searchValue.indexOf(e.target.value) !== -1;
  });
  this.setState({
      users:newArray
  })
}
updatSearchdesc(e){
    console.log(this.state.users);
  let newArray = this.state.users.filter((d)=>{
      let searchValue = d.description.toLowerCase();
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
notFullView(){
  this.setState({
    fullView:false
  })
}
getOnUser(index){
  const userDetais = this.state.listUsers.find(element => element.id == index);
  console.log(userDetais);
    this.setState({
        oneUser : userDetais
    })
}
componentDidMount() {
    this.receivedData()
}
render() {
    return (
      <div> 
                  <div className="header"> <h2>Jobs</h2> </div>
        
                              <div className="search">
                            <input type="text" 
                            placeholder="Location"
                                onChange={(e)=>this.updatSearch(e)}
                                onKeyDown={(e)=>this.keypressed(e)}
                                
                            />
                            <input type="text" 
                            placeholder="Description"
                                onChange={(e)=>this.updatSearchdesc(e)}
                                onKeyDown={(e)=>this.keypressed(e)}
                                
                            />
                        </div>
                        <div className="container">
            
                        {!this.state.fullView && (
                        
                        this.state.users.map(((pd, index) =>
                        
                              
                        <div class="card" >
                                <div class="card-header">
                              <div class="card-header__avatar"></div><a href="#" class="card-header__follow">{pd.title}    </a>
                                </div>
                                <div class="card-content">
                                  <div class="card-content__bio"> {pd.location}</div>
                                  <div class="card-content__username"> {pd.type}  </div>
                                      <button className="btn-view"
                                      onClick={()=>this.showDetails()}
                                      
                                      >View</button>
                                </div>
                              
                        </div>
                         
                        ))
				)}

        </div>
        {!this.state.fullView && (

        <ReactPaginate
                className="pagination"
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
        )}

{this.state.fullView && (

  <div className="lists">
   <ul className="ul-list">
{this.state.listUsers.map(((cloud, index) =>

       <li 
        className="li-list"
       key={index}
        onClick={(index)=>this.getOnUser(cloud.id)}
       > {cloud.title} </li>

))}
   </ul>
   {this.state.oneUser && (

<div className="details">
<div class="card" >
                                <div class="card-header">
                                <button onClick={()=>this.notFullView()}  className="btn-view" style={{margin:"10px" , float:"left"}}>Back</button>
                                <div class="card-header__avatar"></div><a href="#" class="card-header__follow">{this.state.oneUser.title}    </a>
                                   <div> {this.state.oneUser.company}</div>
                                </div>
                                
                                <div class="card-content">
                                  <div class="card-content__bio"> {this.state.oneUser.location}</div>
                                  <div class="card-content__username"> {this.state.oneUser.type}  </div>
                                  <div
                                        dangerouslySetInnerHTML={{
                                          __html: this.state.oneUser.description
                                        }}></div>
                                  <div
                                        dangerouslySetInnerHTML={{
                                          __html: this.state.oneUser.how_to_apply
                                        }}></div>
                        
                                </div>
                              
                        </div>
</div>
)}
</div>

)}




      </div>


    )
}
    
}

export default Jobs 