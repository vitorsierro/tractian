import Assets from "./Assets/Assets";
import Users from "./Users/Users";
import Other from "./Other/Other";

export default function Crud({ name, modo }) {
  if(name === 'assets'){
    return (<Assets modo={modo}/>)
  }else if(name === 'users'){
    
    return (<Users modo={modo} />);
  }else{
    return (<Other page={name} modo={modo} />)
  }

}
