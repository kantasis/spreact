import {useRef, useState, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {

   const userRef = useRef(null);
   const errRef = useRef(null);

   const [username, setUsername] = useState('');
   const [validUsername, setValidUsername] = useState(false);
   const [usernameFocus, setUsernameFocus] = useState(false);

   const [password, setPassword] = useState('');
   const [validPassword, setValidPassword] = useState(false);
   const [passwordFocus, setPasswordFocus] = useState(false);

   const [match, setMatch] = useState('');
   const [validMatch, setValidMatch] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

   const [errorMessage, setErrorMessage] = useState('');
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      userRef.current.focus();
   }, []);

   useEffect(() => {
      const result = USER_REGEX.test(username)
      console.log(result);
      console.log(username);
      setValidUsername(result);
   }, [username]);

   useEffect(() => {
      const result = PWD_REGEX.test(password)
      console.log(result);
      console.log(password);
      setValidPassword(result);
      const isMatched = password === match;
      setValidMatch(isMatched);
   }, [password, match]);

   useEffect(() => {
      setErrorMessage("");

      const result = PWD_REGEX.test(password)
      console.log(result);
      console.log(password);
      setValidPassword(result);
      const isMatched = password === match;
      setValidMatch(isMatched);
   }, [username, password, match]);

   return (
      <section>
         <p
            ref={errRef}
            className={errorMessage ? "errmsg":"offscreen"}
            aria-live="assertive"
         >
            {errorMessage}
         </p>
         <h1>Register</h1>
         <form>
            <label htmlFor="usernam_id">
               Username:
               <FontAwesomeIcon 
                  className={validUsername?"valid":"hide"}
                  icon={faCheck}
               />
               <FontAwesomeIcon 
                  className={ validUsername || !username ? "hide" : "invalid" }
                  icon={faTimes}
               />
                  
            </label>
            <input 
               type="text" 
               id="usernam_id"
               ref={userRef}
               autoComplete="off"
               onChange={(e)=>setUsername(e.target.value)}
               required
               aria-invalid={validUsername?"false":"true"}
               aria-describedby="uidnote"
               onFocus={()=>setUsernameFocus(true)}
               onBlur={()=>setUsernameFocus(false)}
            />
            <p
               id="uidnote"
               className={usernameFocus && username && !validUsername ? "instructions":"offscreen"}
            >
               <FontAwesomeIcon icon={faInfoCircle} />
               4 to 24 characters. <br/>
               Must begin with a letter.<br/>
               Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password_id">
               Password:
               <FontAwesomeIcon 
                  className={validPassword?"valid":"hide"}
                  icon={faCheck}
               />
               <FontAwesomeIcon 
                  className={ validPassword || !password ? "hide" : "invalid" }
                  icon={faTimes}
               />
                  
            </label>
            <input 
               type="password" 
               id="password_id"
               onChange={(e)=>setUsername(e.target.value)}
               required
               aria-invalid={validUsername?"false":"true"}
               aria-describedby="pwdnote"
               onFocus={()=>setPasswordFocus(true)}
               onBlur={()=>setPasswordFocus(false)}
            />
            <p
               id="pwdnote"
               className={passwordFocus && !validPassword ? "instructions":"offscreen"}
            >
               <FontAwesomeIcon icon={faInfoCircle} />
               8 to 24 characters. <br/>
               Must include uppercase and lowercase letters, a number and a special character.<br/>
               Allowed special characters !@#$%^&*.
            </p>
         </form>
      </section>
   );
}

export default Register;