import React, { Component } from 'react'
import IndividualLeaveCountTable from './components/individualLeaveCountTable';

export default class ManageLeaveAllocation extends Component {
    render() {
        return (
            <div>
                 <section class="py-3">
        
       
        <div className="roundy row p-3" style={{backgroundColor:'#fff'}}>
          <div className="col-md-2 text-center pt-3">
            <img src='assets/img/avatar-1.jpg' class="rounded circle"/>
            <h5>Thirupparan</h5>
            <h6>Software Engineer</h6>
          </div>
          <div className="col-md-9">
         <IndividualLeaveCountTable />
         </div>
        </div>


        <section class="py-3">
        <div className="roundy row p-3" style={{backgroundColor:'#fff'}}>
          <div className="col-md-2 text-center pt-3">
            <img src='assets/img/avatar-1.jpg' class="rounded circle"/>
            <h5>Thiru</h5>
            <h6>QA Engineer</h6>
          </div>
          <div className="col-md-9">
         <IndividualLeaveCountTable/>
         </div>
        </div>
               
        </section>
      </section>
      </div>
        )
    }
}
