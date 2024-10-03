import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';


import Empdisplay from './component/Empdisplay';
import Addemp from './component/Addemp';
import Updemp from './component/Updemp';
import View from './component/View';

function App(){
    return (
        <BrowserRouter>
            <div className ="App">
            <Sidebar/>
            <Navbar/>
            
            <Routes>
                <Route path="/empdisplay" element={<Empdisplay/>}></Route>
                <Route path="/addemp" element={<Addemp/>}></Route>
                <Route path="/updemp/:empid" element={<Updemp/>}></Route>
                <Route path="/viewemp/:empid" element={<View/>}></Route>
            </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;