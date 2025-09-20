import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Hero from './Components/Hero';
import JobListing from './Components/JobListing';
import Navbar from './Components/Navbar';
import About from './Components/About';
import ContactUs from './Components/ContactUs';
import PageNotFoung from './Components/pageNotFound';
import Track from './Components/Track';
import Apply from './Components/Apply';
import Seeker from './Components/SeekerRegistration';
import Recruiter from './Components/Recruiter';
import LoginPopUp from './Components/LoginPopUp';
import Profile from './Components/Profile';
import { AuthProvider } from './Components/Authcontext';
import ApplicationsList from './Components/Applications';

function App() {
      

      


  return (

 <>
 <AuthProvider>
         <Navbar/>
        
    <Routes>
     
      <Route path="/" element={ <Hero/>} />
      <Route path="/joblisting" element={<JobListing />} />
      <Route path="/About" element={<About/>} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/Track" element={<Track />} />
       <Route path="/Apply/:id" element={<Apply/>} />
        <Route path="/RecruiterRegistration" element={<Recruiter/>} />
         <Route path="/SeekerRegistration" element={<Seeker/>} />
         <Route path='/LoginPage' element={<LoginPopUp/>}/>
         <Route path= '/Profile' element ={<Profile/>}/>
         <Route path="/applications/:jobId" element={<ApplicationsList />} />
      <Route path='/*' element={  <PageNotFoung/>}/>
    </Routes>
  </AuthProvider>
    </>
  );
}

export default App;
