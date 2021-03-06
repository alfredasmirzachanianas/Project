import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
        vatrates: []
    };
  }
  componentDidMount() {
      fetch('https://app-alfredas-server.herokuapp.com/api/vatrates/')
        .then(res => res.json())
        .then(res => {
              this.setState({
                  vatrates: res
               });
        })
        .catch(error => {
            console.log(error);
        })
  }

  render() {
    return(
       <div class="container-fluid">
       <h1>VATRates</h1>

       <p>This page tests the output of JSON API</p>

       <div class="row">

               <table class="table table-striped table-hover table-sm">
                   <thead class="thead-inverse">
                       <tr>
                           <th class="country-code">Country Code</th>
                           <th class="country">Country Name</th>
                           <th class="rate rate-reduced">Standard rate </th>
                           <th class="rate rate-standard">Reduced rate</th>
                           <th class="rate rate-parking">Reduced rate alt</th>
                           <th class="rate rate-parking">Super reduced rate</th>
                           <th class="rate rate-parking">Parking rate</th>
                           <th class="rate rate-date">CreateDate</th>
                           <th class="rate rate-date">ModifyDate</th>
                       </tr>
                   </thead>
                   <tbody>
                    {this.state.vatrates.map(function(p,index){
                      return (
                          <tr>
                              <td>{p._id}</td>
                              <td>{p.country}</td>
                              <td>{p.standard_rate}</td>
                              <td>{p.reduced_rate}</td>
                              <td>{p.reduced_rate_alt}</td>
                              <td>{p.super_reduced_rate ? "true" : "false"}</td>
                              <td>{p.parking_rate}</td>
                              <td>{p.createDate}</td>
                              <td>{p.modifyDate}</td>
                          </tr>
                      );
                    })}
                  </tbody>
               </table>
           </div>
        </div>
    );
  }
}

export default App;
