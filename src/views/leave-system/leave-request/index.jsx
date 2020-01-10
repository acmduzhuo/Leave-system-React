import React, { Component } from "react";
import MetricPill from "../../../commons/metric-pill";
import ApplyLeaveForm from './apply-leave-form';
import Card from '../../../commons/card';
import ModalCalendar from './ModalCalendar'
import { connect } from 'react-redux';
import {fetchLeaveRequests} from '../../../_actions/leave-action'
import { Link } from 'react-router-dom';

const leaveCounts = [
  { title: "Casual", total: 10, count: 3 },
  { title: "Annual", total: 8, count: 5 },
  { title: "Medical", total: 15, count: 13 },
  { title: "LieuLeave", total: 15, count: 7 }
];

class RequestLeave extends Component {
 

  render() {
    let leavePill = leaveCounts.map(leaveCount => {
      return (
        <MetricPill
          title={leaveCount.title}
          total={leaveCount.total}
          count={leaveCount.count}
        />
      );
    });
    return (
      <section className="py-5">
       <div
          className="nav nav-pills flex-column flex-sm-row"
          id="nav-tab"
          role="tablist"
        >
          <a
            className="flex-row-reverse-fill text-sm-center nav-link active"
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            <i className="far fa-calendar-alt" />  &nbsp;&nbsp;  Calander View
            
          </a>

          <a
            className="flex-row-reverse-fill text-sm-center nav-link "
            id="nav-cancelled-tab"
            data-toggle="tab"
            href="#nav-cancelled"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
            
          >
            <i className="fas fa-user-clock" /> &nbsp;&nbsp;  Form View
          </a>
        </div>
        <div className="row mt-3">
          <div className="col-lg-9">
            <nav />

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div classNameName="mt-3">
                <ModalCalendar />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-cancelled"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
               <div classNameName="mt-3">
                <Card title="Leave Application Form">
                  <ApplyLeaveForm/>
                </Card>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">{leavePill}</div>
        </div>
      </section>
    );
  }
}
const mapDispachToProps = dispatch => ({
  getLeaveRequests:()=>dispatch(fetchLeaveRequests())
});
const mapStateToProps = state =>({
  leaveRequests:state.leaveStore.leaveRequests
});
export default connect(mapStateToProps,mapDispachToProps)(RequestLeave);
