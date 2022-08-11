import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { ClientList } from "./components/client/ClientList";
import { ClientForm } from "./components/client/ClientForm";
import { ClientCard } from "./components/client/ClientCard";
import React from "react";
import { TaxiList } from "./components/taxi/TaxiList";
import { TaxiForm } from "./components/taxi/TaxiForm";
import { TaxiCard } from "./components/taxi/TaxiCard";
import { TravelList } from "./components/travel/TravelList";
import { TravelForm } from "./components/travel/TravelForm";
import { TravelCard } from "./components/travel/TravelCard";

const title = "Cooperativa de Taxis";
const description = "Aplicación web para pedir taxis en linea";

const App: React.FC = () => {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">        
          <Link to={"/"}  className="navbar-brand">
            NRC: 6515 
          </Link>
          <div className="navbar-nav mr-auto">       
          </div>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/taxis"} className="nav-link">
                Taxis
              </Link>
            </li>      
            
            <li className="nav-item">
              <Link to={"/travels"} className="nav-link">
                Viajes
              </Link>
            </li>   
            <li className="nav-item">
              <Link to={"/clients"} className="nav-link">
                Clientes
              </Link>
            </li>    
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>  
            <Route path="/" element={<Home title={title} description={description} />} />          
            <Route path="/taxis" element={<TaxiList />} />          
            <Route path="/taxis/create" element={<TaxiForm />} />    
            <Route path="/taxis/retrieve/:id" element={<TaxiCard/>} />      
            <Route path="/taxis/update/:id" element={<TaxiForm />} />    
      
            <Route path="/" element={<Home title={title} description={description} />} />          
            <Route path="/clients" element={<ClientList />} />          
            <Route path="/clients/create" element={<ClientForm />} />    
            <Route path="/clients/retrieve/:id" element={<ClientCard/>} />      
            <Route path="/clients/update/:id" element={<ClientForm />} />

            <Route path="/" element={<Home title={title} description={description} />} />          
            <Route path="/travels" element={<TravelList />} />          
            <Route path="/travels/create" element={<TravelForm />} />    
            <Route path="/travels/retrieve/:idTaxiR/:id" element={<TravelCard/>} />      
            <Route path="/travels/update/:idTaxiR/:id" element={<TravelForm />} />   
      
          </Routes>
        </div>
      
      </div>
  );
}
export default App;