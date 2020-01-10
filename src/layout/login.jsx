import React, { Component } from "react";
import { Redirect, Link,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from "../_actions/auth-action";
import authService from "../_utils/auth-service";
class Login extends Component {
  state = {
    id: '',
    usernameOrEmail: '',
    password: '',
    errors: null,
    isAuth: false,
    role:null
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = () => {
    const loginData = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    }
    console.log(loginData);
    this.props.LoginRequest(loginData);
  }
  handlePermission(){
    if(!this.state.isAuth){
    switch(this.state.role){
      case 'ADMIN':
        return (
          this.props.history.push('/manageUser')
        )
      case 'HR':
            return (
              this.props.history.push('/manageLeaveDashboard')
            )
      case 'EMPLOYEE':
          return (
            this.props.history.push('/leaveDashboard')
          )
          default:
              return (
                this.props.history.push('/login')
              )
     }
  }
}
  
  componentWillReceiveProps(nextprops) {
   if(nextprops.auth){
     this.props.history.push('/leaveDashboard')
    this.setState(
       {
         isAuth:nextprops.auth
       }
     )
   }
  //  if(nextprops.errors){
  //   console.log(nextprops.errors);
  //    this.setState(
  //      this.state.errors= nextprops.errors
  //    )
  //  }
  }
  
  componentWillMount() {
    let token = authService.getToken();
    let decodeToken = authService.decode(token);
    if (decodeToken !== null) {
      this.setState({
        role: decodeToken.role
      })
    }
  }
  render() {
    const {errors}=this.props.errors
    console.log(errors);
    return (
      <div>
        <div class="col-12 col-lg-2 ml-left mb-12 mb-lg-12 ">
          <div class="pr-lg-12"><img src="assets/img/New Project (1).png" alt="" class="img-fluid" /></div>
        </div>
        <div class="page-holder d-flex align-items-center ">

          <div class="container  ">

            <div class="row align-items-center py-10">
              <div class="col-5 col-lg-7 mx-auto mb-5 mb-lg-10">
                <div class="pr-lg-5"><img src="assets/img/New Project (6).png" alt="" class="img-fluid" /></div>
              </div>
              <div class="col-lg-5 px-lg-4">

                <h1 class="mb-4">Login</h1>
                <div className="alert alert-danger">{errors}</div>
                <form id="loginForm" class="mt-4">
                  <div class="form-group mb-4">
                    <input type="text" name="usernameOrEmail" placeholder="Username or Email address" class="form-control border-0 shadow form-control-lg"
                      value={this.state.usernameOrEmail} onChange={this.handleChange} />
                  </div>
                  <div class="form-group mb-4">
                    <input type="password" name="password" placeholder="Password" class="form-control border-0 shadow form-control-lg text-violet"
                      value={this.state.password} onChange={this.handleChange} />
                  </div>
                  <div class="form-group mb-4">
                    <div class="custom-control custom-checkbox">
                      <input id="customCheck1" type="checkbox" checked class="custom-control-input" />
                      <label for="customCheck1" class="custom-control-label">Remember Me</label>
                    </div>
                  </div>
                  <a type="submit" class="btn btn-primary shadow px-5"onClick={this.handleSubmit}>Log in</a>
                  {/* {this.loggedIn &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  } */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.authStore.isAuth,
  errors:state.authStore
});

const mapDispachToProps = dispatch => ({
  LoginRequest: (userData) => dispatch(login(userData)),

});

export default connect(mapStateToProps, mapDispachToProps)(Login);