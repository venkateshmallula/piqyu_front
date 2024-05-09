import MyRequests from "./myReuests";
import "./request.css"
import DrawerExample from "./dasboard";
import Navbar from "./navBar";

function RequestForm(){
  return (
    <>
      <div>
        <Navbar/>
        <DrawerExample />
        <MyRequests />
      </div>
    </>
  );
};

export default RequestForm;
