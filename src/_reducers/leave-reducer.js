import {GET_LEAVES,NEW_LEAVE,SHOW_ERROR_MESSAGE,COUNT_DAY} from "../_constants/types"

const initialState = {
  pending: false,
  leaveRequests: [],
  newLeaveRequest:{},
  errors: {},
  noOfDay:null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEAVES:
      return {
        ...state,
        leaveRequests:action.leaveRequestList
      };
    case NEW_LEAVE:
      return {
        ...state,
        newLeaveRequest:action.newLeave,
        leaveRequests:state.leaveRequests.concat(action.newLeave)
      };
   case COUNT_DAY:
      return {
        ...state,
        noOfDay:action.payload
      }
  case SHOW_ERROR_MESSAGE :
    return {
      ...state,
      show:true,
      errors:action.payload
    }
    default:
      return state;
  }
}
