import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthState } from '../atoms'
import '../styles/Register.css'



const Formsignup = ({url}) => {
  const navigate = useNavigate();
  //const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connectState, setConnectState] = useAuthState()

  const handleSignup = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    
  

  axios.post(url+'user/register', {pseudo,email,password})
  .then(res => {
    localStorage.setItem("profil",JSON.stringify(res.data)) 
    setConnectState({loggedIn: true, token: res.data.token})
    navigate("/accueil"); 
  })

  .catch (err => { 
    if (err.response.data.errors){
    passwordError.innerHTML =  err.response.data.errors[0].password; 
     }
     if (err.response.data.errorEmail){
      emailError.innerHTML =  err.response.data.errorEmail; 
       }

 
  }) ;
}

return (
 

  <div className='Blocsignup'>
<form  className='formulaire' onSubmit={handleSignup}  method='post'>
<label htmlFor="pseudo"></label>
   
<input type="text" name="pseudo"  id="pseudo"  onChange={(e) => setPseudo(e.target.value)}
        value={pseudo} placeholder="Pseudo" />
        
<div className="pseudo error"></div>
 <br/>

 <label htmlFor="email"> </label>
   
<input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
        value={email} placeholder="Adresse E-mail" />

<div className="email error"></div>
 <br/>

 <label htmlFor="password"> </label>

<input type="password" name="password"  id="password"  onChange={(e) => setPassword(e.target.value)}
        value={password} placeholder="Mot de passe" />

         <div className="password error"></div>
 <br/>

  <input className='button' type="submit" value="S'inscrire" />
</form>
</div>


)

}
 export default Formsignup