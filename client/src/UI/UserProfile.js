import React, { memo, useEffect, useState , Component }  from "react";

import UpperNavbar from "./User/UpperNavbar";
import Navbar from "./User/Navbar";
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import axios from "axios";

function UserProfile( handleSubmit, btnText, userfData) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [emptyfullname, setEmptyfullname] = useState(false);
  const [emptyusername, setEmptyusername] = useState(false);
  const [emptydob, setEmptydob] = useState(false);
  const [emptyaddress, setEmptyaddress] = useState(false);
  const [emptypassword, setEmptypassword] = useState(false);
  const [emptypic, setEmptyPic] = useState(false);
  const [emptyconfirmpassword, setEmptyconfirmpassword] = useState(false);
  const [emptycontact, setEmptycontact] = useState(false);
  const [registersuccess, setRegistersuccess] = useState("");
  const [accountalreadyexist, setAccountalreadyexist] = useState("");


  const onSubmit = (event) => {
    setRegistersuccess(false);
    setAccountalreadyexist(false);
    if (pic !== "") {
      setEmptyPic(false);
    }
    if (fullname === "") {
      setEmptyfullname(true);
    }
    if (contact !== "") {
      setEmptycontact(false);
    }
    if (dob === "") {
      setEmptydob(true);
    }
    if (address !== "") {
      setEmptyaddress(false);
    }
  }
  const userid =  localStorage.getItem('userid');
  const upic =  localStorage.getItem('pic');
  const [userP, setUserP] = useState([]);
  const [state, setState] = useState("");
  
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [isSelected, setIsSelected] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userf, setUserf] = useState({});
  function handleMode () {
      if(!isEditMode) setIsEditMode(true);
      else setIsEditMode(false);
      }
    const submit = () => {
      handleSubmit(userf);
  }

  const handleChange = ({target}) => {
     const userDetail=[...userP];
      const {name, value} = target;
      userDetail[0][name] = value;
      setUserf({...userf, [name]: value});
      console.log(userf);
  };
  const OnSubmit = async(e) => {
    e.preventDefault();
    await axios.post("/api/editUser", {
      fullname:userP[0].fullname,
      email:userP[0].email,
      dob:userP[0].dob,
      address:userP[0].address,
      contact:userP[0].contact,
      users_id: userid
      }).then((response) => {console.log("response : ", response);});
  };
	const changeHandler = async(event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
		const formData = new FormData();
    console.log(event.target.files[0])

		formData.append("file", event.target.files[0]);
		formData.append("users_id", userid);
		await axios.post("/api/addUserPic", formData).then((r) => {
      console.log(r.data);
      });
	
    }
    const getUser= async(event) => {
      await axios.post("/api/getDataforuser", {userid:userid})
      .then(r => {
          if (r.data.data !== "No Data" && r.data.data.length > 0) {
            setUserP(r.data.data);
          } else {
            setUserP([]);
          }
    });
    }
    useEffect(()=>{
      getUser();  
    },[]);

  return (
    <div className="sidebar-collapse">
    <UpperNavbar />
    <div style={{ display: "contents" }} className="col-12 col-sm-6">
    <div className="card card-secondary card-tabs">
      <div style={{ display: "contents" }} className="col-12 col-sm-6">
        <div className="card card-secondary card-tabs">
          <div className="card-header p-0 pt-1">
            <ul style={{ width: "56%", margin: "0 auto" }} className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link active" to={  (localStorage.getItem('role_id') === '1' )? "/dashboarduser" : (localStorage.getItem('role_id') === '2') ? "/dashboard" : 
                (localStorage.getItem('role_id') === '3') ? "/dashboardadmin" : "/dashboardadmin"}>Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hold-transition uprofile-page">
        <div className="card-body">
          <h2>User Profile</h2>
            
              <div >
              {userP.map((p,i) => (  
                    <div key={1} className="card mb-3" style={{maxWidth: "890px"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                            <div className="card1 p-4"> 
                                <label htmlFor="pic" className="custom-file-upload fas">
                                  <div className="img-wrap" >
                                    <img src=
                                    {(p.pic)?
                                      (require('../assets/images/user_upload/' + p.pic).default):
                                      (require('../assets/images/user_upload/defaultu.png').default)
                                    }  className="img-fluid"/>
                                    <span><span className="fa fa-upload fa-5x"></span></span>
                                  </div></label>
                                  <div className="form-group">
                                    <input type="file" id="pic" name="pic" className="form-control" onChange={event=>changeHandler(event)} />
                                </div>
                                {/* <button type="button" className="btn btn-primary" onClick={handleSubmission}><i className="fa fa-edit"></i></button> */}
                              {/* </form> */}
                            </div>
                              
                            </div>
                            <div className="col-md-8">
                            <form key={1} onSubmit={e=>OnSubmit(e)} className='form'>
                            <div className="text-right mr-4 mt-4"><span onClick={handleMode} className="fa fa-edit fa-2x"></span></div>
                                <h3><div>{p.fullname} </div></h3>
                                <div className="card-body">
                                    <div className="row">
                                    <label className="col-md-3"><b>Name: </b></label>
                                      <div className="col-md-9 form-group pr-5">
                                        {!isEditMode ?p.fullname:(
                                        <l><input onChange={e=>handleChange(e)} name="fullname" id="fullname" value={p.fullname} type="text" className={`form-control}`} />
                                        </l>)}
                                      </div>
                                      <label className="col-md-3"><b>Contact No.: </b></label>
                                      <div className="col-md-9 form-group pr-5">
                                        {!isEditMode ?p.contact:(
                                        <l><input onChange={e=>handleChange(e)} name="contact" id="contact" value={p.contact} type="text" className={`form-control `} />
                                        </l>)}
                                      </div>
                                      <label className="col-md-3"><b>Email: </b></label>
                                      <div className="col-md-9 form-group pr-5">
                                        {!isEditMode ?p.email:(
                                        <l><input onChange={e=>handleChange(e)} name="email" id="email" value={p.email} type="text" className={`form-control `} />
                                        </l>)}
                                      </div>
                                      <label className="col-md-3"><b>Address: </b></label>
                                      <div className="col-md-9 form-group pr-5">
                                        {!isEditMode ?p.address:(
                                        <l><input onChange={e=>handleChange(e)} name="address" id="address" value={p.address} type="text" className={`form-control `} />
                                        </l>)}
                                      </div>
                                      <label className="col-md-3"><b>Date of Birth: </b></label>
                                      <div className="col-md-9 form-group pr-5">
                                        {!isEditMode ?format(p.dob, "DD/MM/YYYY"):(
                                        <l><input onChange={e=>handleChange(e)} name="dob" id="dob" value={format(p.dob, "MM/DD/YYYY")} placeholder={format(p.dob, "MM/DD/YYYY")} type="date" className={`form-control `} />
                                        </l>

                                        )}
                                      </div>
                                      <div className="col-md-3"></div>
                                      <div className="col-md-9 form-group pr-5">
                                        {!isEditMode ?'':(
                                        <l><button name="submit" type="submit" className="btn btn-success"  >Update</button>
                                        </l>

                                        )}
                                      </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
              ))}
              </div>
            
        </div>
      </div>
  </div>
</div>
    </div>
  );
}


export default memo(UserProfile) ;
