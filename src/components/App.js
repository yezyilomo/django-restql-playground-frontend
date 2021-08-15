import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import {
    TopBar, Actions, Routes, DataQueryingPlayGround, DataMutationPlayGround
} from '.';
import './App.scss';


function App() {
    const location = useLocation();
    return (
        <div class="row m-0 p-0">
            <TopBar/>
            <div class="col-12 col-md-6 p-0 m-0">
                <Switch location={location}>
                    <Route exact path="/get/" render={({ match }) => {
                        return <Routes action="GET" />
                    }} />

                    <Route exact path="/post/" render={({ match }) => {
                        return <Routes action="POST" />
                    }} />

                    <Route exact path="/put/" render={({ match }) => {
                        return <Routes action="PUT" />
                    }} />

                    <Route exact path="/patch/" render={({ match }) => {
                        return <Routes action="PATCH" />
                    }} />
                </Switch>
            </div>
            <div class="col-12 col-md-6 p-0 m-0">
                <Switch location={location}>
                    <Route exact path="/get/" render={({ match }) => {
                        return <Actions action="GET" />
                    }} />

                    <Route exact path="/post/" render={({ match }) => {
                        return <Actions action="POST" />
                    }} />

                    <Route exact path="/put/" render={({ match }) => {
                        return <Actions action="PUT" />
                    }} />

                    <Route exact path="/patch/" render={({ match }) => {
                        return <Actions action="PATCH" />
                    }} />
                </Switch>
            </div>
            <div class="col-12 p-0 m-0">
                <Switch location={location}>
                    <Route exact path="/">
                        <Redirect to="/get" />
                    </Route>
                    <Route exact path="/get/" render={({ match }) => {
                        return <DataQueryingPlayGround action="GET" />
                    }} />

                    <Route exact path="/post/" render={({ match }) => {
                        return <DataMutationPlayGround action="POST" />
                    }} />

                    <Route exact path="/put/" render={({ match }) => {
                        return <DataMutationPlayGround action="PUT" />
                    }} />

                    <Route exact path="/patch/" render={({ match }) => {
                        return <DataMutationPlayGround action="PATCH" />
                    }} />
                </Switch>
            </div>
        </div>
    );
}


export default App;
