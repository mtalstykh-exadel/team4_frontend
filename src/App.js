import React,{ useState }  from "react";
import './App.scss';
import Modal from "./components/modal/Modal.js";

function App() {
  const [modalActive,setModalActive]=useState(true);
  return (
    <div className="App">
      <main>
        <button className="open-button" onClick={()=>setModalActive(true)}>Открыть модальное окно</button>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
        <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </div>
        <div>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </main>
      <Modal active={modalActive} setActive={setModalActive}>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </Modal>
    </div>
  );
}

export default App;
