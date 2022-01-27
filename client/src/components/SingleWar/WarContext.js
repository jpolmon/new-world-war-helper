import { createContext, useState } from "react";

export const WarContext = createContext();

const MyProvider = props => {
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [registerDisplay, setRegisterDisplay] = useState('none');
  const [userRole, setUserRole] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [role, setRole] = useState('');

  return (
    <WarContext.Provider
      value={{ value1: [visible, setVisible], 
               value2: [modalText, setModalText],
               value3: [registerDisplay, setRegisterDisplay],
               value4: [userRole, setUserRole],
               value5: [role, setRole]
             }}
    >
      {props.children}
    </WarContext.Provider>
  );
};

export default MyProvider;