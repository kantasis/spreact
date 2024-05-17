import { useState } from 'react';
import './App.css'

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spring_Data from './components/spring_call.tsx';

// import { Switch, Route, Link } from "react-router-dom";

function App() {

   return (
      <>
         <div>
            Hello world
         </div>
         <div>
            <Spring_Data/>
         </div>
      </>
   )
}

export default App
