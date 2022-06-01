import React, { useState  } from "react";



// useEffect(() => {
//     axios.get("/api/getSchemeDataforuser", {
//         userid: userid
//       }).then((response) => {
//       if (response.data.data !== "No Data" && response.data.data.length > 0) {
//         setData(response.data.data);
//       } else {
//         setData(false);
//       }
//     });
//   }, []);


function BidSchemeCard(props) {
  const {
    type = 'text', 
    name,
  } = props;

  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="RadioButton">
        <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} />
        <label htmlFor={props.id}>{props.label}</label>
    </div>
  )
}
export default BidSchemeCard;