
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export const urls = {
  task: "/api/task/"
  
};
export const baseURL = "http://localhost:8889"

//-------------------------Validation Regx----------------------//
export const isValidFullName = (name) => /^[a-zA-Z ]{2,40}$/.test(name);
export const isValidQue = (que) => /^[a-zA-Z0-9., ]{5,100}$/.test(que);
export const isValidName = (name) => /^[a-zA-Z]{2,10}$/.test(name);
export const isValidContact = (contact) => /^[6789]\d{9}$/.test(contact);
export const isValidEmail = (email) => /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/mg.test(email);
export const isValidPnr = (pnr) => /^[A-Za-z0-9-]+$/.test(pnr);
export const isValidPassword = (Password) => /^(?=.*[!@#$%^&*,.?])(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(Password);
export const isValidexamname = (name) => /^[a-zA-Z]{2,10}$/.test(name);
export const isValidexamcode = (examcode) => /^[a-zA-Z0-9]+[a-zA-Z0-9\- ]{1,9}$/.test(examcode);
export const isValidQuestion = (question) => /^[1-5]{1}$/.test(question);

export const errorText = (message) => {
  return (<span style={{ 'display': 'flex', 'alignItems': 'center' }}>
    <ErrorOutlineIcon /> <span style={{ 'paddingLeft': '5px' }}>{message}</span>
  </span>)
}

