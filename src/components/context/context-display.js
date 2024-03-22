import { useContext, useState } from 'react';
import AppContext from '../../appContext';

function ContextDisplay() {

  const [context] = useContext(AppContext);

  const [error, setError] = useState(sessionStorage.getItem("error"));
  
  const dismiss = () => {
    setError('');
    sessionStorage.setItem("error",'');
  }

  return (
    <h1>Fix</h1>
  );
      
}

export default ContextDisplay;