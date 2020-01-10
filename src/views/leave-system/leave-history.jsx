import React, { Component } from "react";
import LeaveData from "./components/leave-data";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchLeaveRequests} from '../../_actions/leave-action'
import {formatDate} from '../../_function/index'

class LeaveHistory extends Component {
  componentWillMount(){
    this.props.fetchLeaveRequests()
  }
  
  // formatDate(date) {
  //   let d = new Date(date),
  //       month = '' + (d.getMonth() + 1),
  //       day = '' + d.getDate(),
  //       year = d.getFullYear();
  
  //   if (month.length < 2) month = '0' + month;
  //   if (day.length < 2) day = '0' + day;
  //   return [year, month, day].join('-');
  // }
  render() {
    const leaveHistory = this.props.leaveRequests.map( leave=> 
      <LeaveData
        startDate={formatDate(leave.startDate)}
        endDate={formatDate(leave.endDate)}
        status={leave.status}
        reason={leave.reason}
      />);

    return (
      <div>
        <section class="py-5">
          <div class="form-group d-flex justify-content-end">
            <label class="py-2">
              Search Leave by Status : 
            </label>
            <div class="col-sm-3">
              <select
                data-filter="make"
                class="filter-make filter form-control"
              >
                <option>All History</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Canceled</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </section>

        <div class="col-lg-12 mb-2">
          {
          leaveHistory
           }
        
        </div>
      </div>
    );
  }
}
LeaveHistory.propTypes={
  // getUserHistory:PropTypes.func.isRequired,
  // status:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  leaveRequests:state.leaveStore.leaveRequests
})
const mapDispachToProps = dispatch => ({
  fetchLeaveRequests:()=>dispatch(fetchLeaveRequests())
});
export default connect(mapStateToProps,mapDispachToProps)(LeaveHistory);