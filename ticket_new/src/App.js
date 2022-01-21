import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Login from "./components/AuthComponent/Login";
import Header from './components/LayoutComponent/Header'
import Sidebar from './components/LayoutComponent/Sidebar'
import * as Component from './Declaration'


const App = () => {


  const [token, setToken] = useState(null);

  function checkAuth() {
    var check = localStorage.getItem('token');
    if (check) {
      setToken(check);
    } else {
      setToken(null);
    }
  }
  useEffect(() => {
    checkAuth();
  }, [])


  if (!token) {
    return (
      <>
        {/* <Router>
          <Route exact path="/login" component={ Login } />
        </Router> */}
        <Login />
      </>
    )
  } else {

    return (
      <>
        {/* <Routes>
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/City" element={<CityComponent />} />
        </Routes> */}
        <Router>
          <div id="mytask-layout" className="theme-indigo">
            <Sidebar />
            <div className="main px-lg-4 px-md-4">
              <Header />
              <Switch>

                <Route path="/Country"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url}  component={Component.CountryComponent} exact  />
                        <Route path={`${url}/Create`} component={Component.CreateCountry} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditCountry} />
                      </Switch>
                    </>
                  )}
                />

                <Route path="/State"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.StateComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateState} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditState} />
                      </Switch>
                    </>
                  )}
                />       

                <Route path="/City"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.CityComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateCity} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditCity} />
                      </Switch>
                    </>
                  )}
                />

                <Route path="/Role"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.RoleComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateRole} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditRole} />
                      </Switch>
                    </>
                  )}
                />

                <Route path="/Department"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.DepartmentComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateDepartment} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditDepartment} />
                      </Switch>
                    </>
                  )}
                />

                <Route path="/Designation"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.DesignationComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateDesignation} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditDesignation} />
                      </Switch>
                    </>
                  )}
                />

                <Route path="/Status"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.StatusComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateStatus} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditStatus} />
                      </Switch>
                    </>
                  )}
                />

                <Route path="/Dynamic"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.DynamicFormComponent}  exact/>
                        <Route path={`${url}/Create`} component={Component.CreateDynamicForm} />
                      </Switch>
                    </>
                  )}
                />

                <Route path="/Ticket"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.TicketComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateTicket} />
                        <Route path={`${url}/Edit/:id`} component={Component.EditTicket} />
                        <Route path={`${url}/Task/:id`} component={Component.TaskComponent} />
                      </Switch>
                    </>
                  )}
                />

              <Route path="/User"
                  render={({ match: { url } }) => (
                    <>
                      <Switch>
                        <Route path={url} component={Component.UserComponent} exact />
                        <Route path={`${url}/Create`} component={Component.CreateUser}/>
                        <Route path={`${url}/Edit/:id`} component={Component.EditUser} />
                      </Switch>
                    </>
                  )}
                />

              </Switch>
            </div>
          </div>
        </Router>
      </>
    )
  }
}
export default App
