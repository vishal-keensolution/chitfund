import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./TableContainer";
import { SelectColumnFilter } from "./Filter";

const onUpdateCB = (ischecked, loginuser, userid) => {

  console.log(ischecked, loginuser, userid);

  fetch('http://localhost:3000/cb', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify({
      loginuser,
      userid,
      ischecked: ischecked
    })
  }); 
};

const Card = props => {
  const { ischecked } = props;
  return (
    <div
      className="pointer bg-light-green dib br3 pa3 ma2 shadow-5"
      onClick={() => props.handleClick(props.id)}
      //onClick={(e) => e.stopPropagation()}
    >
      <div>
        <h3>{props.name}</h3>
        <p>{props.company}</p>
        <p>{props.phone}</p>
        <p>{props.email}</p>
        <p>{props.city}</p>
      </div>
      <div>
        My Network
        <input
          className="largeCheckbox"
          type="checkbox"
          checked={ischecked}
          onClick={(event) =>
            onUpdateCB(!isChecked, props.loginuser.id, props.id)
          }
        />
      </div>
    </div>
  );
};

export default Card;