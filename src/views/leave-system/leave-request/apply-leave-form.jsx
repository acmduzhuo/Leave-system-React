import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import {CreateLeaveRequest,fetchLeaveRequests} from '../../../_actions/leave-action';
import {getLeaveType} from '../../../_actions/leaveType-action';
import swal from 'sweetalert';
import{getNumberOfDays} from '../../../_function/index';

class ApplyLeaveForm extends Component {

state={
    requestedBy: 1,
    startDate: null,
    endDate: null,
    // status: null,
    noOfDays:0,
    reason: null,
    leaveType:null,
    error:null
}

componentWillMount(){
  this.props.getLeaveType();
  this.setState({
    startDate:this.props.startdate,
    endDate:this.props.enddate
  })
}

componentDidMount(){
  this.setState({noOfDays:getNumberOfDays(this.state.startDate,this.state.endDate)}) 
}
getEndDatenoOfDay=(e)=>{
  this.handleChange(e);
  this.setState({noOfDays:getNumberOfDays(this.state.startDate,e.target.value)}) 

  // this.props.getNumberOfDays(this.state.startDate,e.target.value)
}
getStartDatenoOfDay=(e)=>{
  this.handleChange(e);
  this.setState({noOfDays:getNumberOfDays(e.target.value,this.state.endDate)})
  // this.props.getNumberOfDays(e.target.value,this.state.endDate)

}
handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
  this.validate(e.target.name, e.target.value);
}
handleSubmit=()=>{
 const obj={
  requestedBy: 1,
  startDate: this.state.startDate,
  endDate: this.state.endDate,
  noOfDays:this.state.noOfDays,
  reason: this.state.reason,
  leaveType:this.state.leaveType
 }
 console.log(obj);
// const errors=[];
  if(this.state.startDate==null){
    this.setState(
      { error:{startDate: `Start date is required !!, Please select StartDate` } }
    )
      // errors['startDate']= `Start date is required !!, Please select StartDate`;

    // swal("Start date is required !!, Please select StartDate ")
  } if(this.state.endDate==null){
    this.setState(
      { error: { endDate: `End date is required !!, Please select EndDate` } }
    )
    // errors['endDate']= `End date is required !!, Please select EndDate`;

    
  } if(this.state.leaveType==null){
    // errors['leaveType']= `Leavetype is required !!, Please select Leavetype `;
    this.setState(
      { error: {leaveType: `Leavetype is required !!, Please select Leavetype ` } }
    )
    // swal("Leavetype is required !!, Please select Leavetype ")
  }if(this.state.reason==null){
    // errors['reason']= `reason is required !!, Please Enter the reason`;

    this.setState(
      { error: { reason: `reason is required !!, Please Enter the reason ` } }
    )
    // swal("Leavetype is required !!, Please select Leavetype ")
  }else{
    swal({
      title: "Are you sure?",
      text: "Do you want take this leave !",
      // icon: "sucess",
      buttons: true,
      // dangerMode: true,
    }).then((willCreate) => {
      if (willCreate) {
        this.props.CreateLeaveRequest(obj);
        this.props.handleClose();
      } 
    });
  }
  // this.setState({
  //   error:errors
  // })
 
}
validate = (name, value) => {
  console.log(name, value);
  switch (name) {
    case 'reason':
      const REASON_REGEX = RegExp("^[a-zA-Z'.\\s]{1,40}$");
      if (value.length < 10) {
        this.setState(
          { error: { reason: `reason is too short (Minimum ${10} characters needed.)` } }
        )
      }
      else if (value.length > 100) {
        this.setState(
          { error: { reason: `reason is too long (Maximum ${100} characters allowed.)` } }
        )
      } else if (!REASON_REGEX.test(value)) {
        this.setState(
          { error: { reason: `Only character allowed.` } }
        )
      }else{
        this.setState({
          error: {} 
         })
      }
      break;
     
      default:
      {
        this.setState({
           error: {} 
          })
      }
  }
}


render() {

    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="startdate">
              <Form.Label>Start Date : </Form.Label>
              <Form.Control 
              type="date" 
              min="today"
              name="startDate" 
              value={this.state.startDate} 
              onChange={this.getStartDatenoOfDay}
              max={this.state.endDate} 
              />
                <small className="text-danger">{this.state.error == null ? '': this.state.error.startDate}</small>

            </Form.Group>

            <Form.Group as={Col} controlId="enddate">
              <Form.Label>End Date : </Form.Label>
              <Form.Control 
              min={this.state.startDate}
              type="date"
               name="endDate" 
               value={this.state.endDate} 
               onChange={this.getEndDatenoOfDay}

                />
                <small className="text-danger">{this.state.error == null ? '': this.state.error.endDate}</small>
            </Form.Group>

            <Form.Group as={Col} controlId="days">
              <Form.Label>No Of Days :</Form.Label>
              <Form.Control 
                name="noOfDays"
                readOnly  
                value={this.state.noOfDays}
                />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="leavetype">
              <Form.Label>Leave type :</Form.Label>
              <Form.Control as="select"
                 value={this.state.leaveType}
                  name="leaveType"
                  onChange={this.handleChange}
                >
                   <option  value="0">Select The LeaveType</option> 
                  {
                    this.props.leavetypeList.map(leavetype=>
                      <option key={leavetype.id} value={leavetype.id}>{leavetype.leaveTypeName}</option>
                      )
                  }
                  
                </Form.Control>
                <small className="text-danger">{this.state.error == null ? '': this.state.error.leaveType}</small>

            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
              <Form.Label>Reason</Form.Label>
              <Form.Control as="textarea" 
              name="reason" 
              rows="2" 
              onChange={this.handleChange}
              />
                <small className="text-danger">{this.state.error == null ? '': this.state.error.reason}</small>
            </Form.Group>
          </Form.Row>
          <Button 
          variant="primary" 
          onClick={this.handleSubmit}
          >
            Apply
          </Button>
          <Button 
          variant="primary" 
          onClick={ this.props.handleClose}
          >
            Close
          </Button>
        </Form>
      </div>
    );
  }
}
const mapDispachToProps = dispatch => ({
  CreateLeaveRequest:(leaveObj)=>dispatch(CreateLeaveRequest(leaveObj)),
  fetchLeaveRequests:()=>dispatch(fetchLeaveRequests()),
  getLeaveType:()=>dispatch(getLeaveType()),
  // getNumberOfDays:(sDate,eDate)=>dispatch(getNumberOfDays(sDate,eDate))
});
const mapStateToProps = state =>({
  leaveRequests:state.leaveStore.leaveRequests,
  leaveError:state.leaveStore.errors,
  NewleaveRequest:state.leaveStore.newLeaveRequest,
  noOfDay:state.leaveStore.noOfDay,
  leavetypeList:state.leaveTypeStore.leaveTypes
});
export default connect(mapStateToProps,mapDispachToProps)(ApplyLeaveForm);