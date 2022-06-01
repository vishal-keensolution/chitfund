  import React, { useEffect, useState , Component }  from "react";
  import axios from "axios";
  import BidSchemeCard from './BidSchemeCard';
  import dayjs from 'dayjs';
  import Countdown from "react-countdown";
  import TimeAgo from 'javascript-time-ago'
  import en from 'javascript-time-ago/locale/en.json'
  import {
    CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, Inject, Annotations, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective
} from '@syncfusion/ej2-react-circulargauge';


  export default function Bid() {
    TimeAgo.addLocale(en);

    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US');
    const [loginStatus, setLoginStatus] = useState("");
    const [inputValue, setinputValue] = useState({
      SchemeId: '', Fee: '', Paid: '', CreatedAt: '', time_remain:''
    });
    const inputsHandler = event => {
    const { name, value } = event.target;
      setinputValue({ ...inputValue, [name]: value });
    };
    const [isChecked, setIsChecked] = useState(false);
    const [SchemeId, setSchemeId] = useState("0");
    const [scdata, setScdata] = useState([]);
    const [newBids, setNewBids] = useState([]);
    const [mr, setMr] = useState([]);
    const current = new Date();
    useEffect(() => {
      axios.get("/api/login").then((response) => {
        if (response.data.loggedIn === true) {
          setLoginStatus(response.data.user.fullname);
          localStorage.setItem('userid',response.data.user.userid);
          localStorage.setItem('pic',response.data.user.pic);
        }
      });

    }, []);
        const [data, setData] = useState({
        SchemeId : "",
        Paid: "",
    });
    function meterRange(p) {
      var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var endDate= [year, month, day].join('-');
    //var startDate= [year, "03", day].join('-');
    console.log("ppppp3",p[0]);
      var start      = p[0].startDate.split('-');
      var end        = endDate.split('-');
      var startYear  = parseInt(start[0]);
      var endYear    = parseInt(end[0]);
      var dates      = [];
    
      for(var i = startYear; i <= endYear; i++) {
        var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
        var startMon = i === startYear ? parseInt(start[1])-1 : 0;
        for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
          var month = j+1;
          var displayMonth = month < 10 ? '0'+month : month;
          dates.push([i, displayMonth, '01'].join('-'));
        }
      }
      console.log("mmmmmmdddd","m"+dates.length)

      var m= "m"+dates.length;
      setMr(p[0][m].split(","));
    }

    function getMonthDifference(startDate, endDate) {
      return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
      );
    }
    const getNewBids= async(event) => {
          await axios.post("/api/getBidDataforSchemes", {schemesid:data.SchemeId})
          .then(r => {
              if (r.data.data !== "No Data" && r.data.data.length > 0) {
                setNewBids(r.data.data);
                meterRange(r.data.data)
              } else {
                setNewBids([]);
              }
          });
    }

    const userid =  localStorage.getItem('userid');
    const handleSubmit = async(e) => {
      e.preventDefault();
      await axios.post("/api/addUserBid", {
          idSchemes: data.SchemeId,
            paid: data.Paid,
            userid: userid
          }).then((response) => {console.log("response : ", response);});
          
            getNewBids();  
          
    }
    const handleClick = async(event) => {
        const {name , value} = event.target;
        setIsChecked(!isChecked);
          getNewBids();  
         
    };
      const handleChange = (event) => {
        const {name , value} = event.target;
        setIsChecked(!isChecked);
        
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });

    };
    useEffect(async () => {
    axios.post("/api/getSchemeDataforuser", {userid:userid})  
    .then(response => {
     
        if (response.data.data !== "No Data" && response.data.data.length > 0) {
          setScdata(response.data.data);
          
        } else {
          setScdata([]);
        }
      });
    }, []);
    return (
      <div>
        <h2>Bid</h2>
        <div className="row">
          <div className="col-sm-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-12 col-sm-12  col-form-label" htmlFor="Scheme">Scheme</label>
                <div className="col-sm-10">
                  <div className="row">
                  {(scdata.length == 0)?(<label>Currently No Scheme For you</label>):(
                  scdata.map(p => (
                    
                    (Date.parse(current) >= Date.parse(current.getFullYear()+"-"+(parseInt(current.getMonth())+1)+"-"+dayjs(p.startDate).format("DD")) && Date.parse(current) < Date.parse(current.getFullYear()+"-"+(parseInt(current.getMonth())+1)+"-"+dayjs(p.startDate).add('7', 'days').format("DD")))? (
                    <label id={"idSchemes-"+p.idSchemes} key={p.idSchemes} className="col-md-12 mx-1">
                      <div className="card">
                        <div className="card-body">
                        <span onClick={() => {setSchemeId(p.idSchemes); }}>
                        <input
                          type="radio"
                          value={p.idSchemes}
                          name={"SchemeId"}
                          onChange={handleChange}
                          checked={SchemeId == p.idSchemes} 
                          onClick={handleClick}
                          />
                                                  
                          {p.schemeName}<br/>
                          </span>
                          <input className="form-control" id="time_remain" name="time_remain" type="hidden" value={dayjs(p.startDate).format("DD")} />
                          <br/>
                          {dayjs(p.startDate).format("DD")+"-"+(parseInt(current.getMonth())+1)+"-"+current.getFullYear()} <br/>
                          <Countdown date={Date.parse(current.getFullYear()+"-"+(parseInt(current.getMonth())+1)+"-"+dayjs(p.startDate).format("DD"))+ 1000*60*60*24*7} ></Countdown>
                        </div>
                      </div>
                    </label>):(<label></label>)
                  )))}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="Paid">Paid</label>
                <div className="col-sm-3">
                  <input className="form-control" 
                  id="Paid"
                  name="Paid"
                  type="text"
                  onChange={handleChange}
                  value={data.Paid}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <button className="btn btn-success" type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div className="col-sm-4">
            <div className="card">
                <div className="card-body">
                  <label>Bids Suggestion</label>
                  <div className='col-lg-12 control-section'>
                  {(Array. isArray(newBids) && newBids.length )?(
                      <div id='circular-container justify-content-center' width='100%' height='350px'>
                        <CircularGaugeComponent className='position-relative' id='circulargauge' width='350' height='350'>
                          <AxesDirective>
                            <AxisDirective  minimum={0} maximum={newBids[0].amount}>
                              <RangesDirective>
                                <RangeDirective start={mr[0]} end={mr[1]} radius='50%' color='#ff00ff'></RangeDirective>
                                <RangeDirective start={0} end={(newBids[0].amount)*3.34/10} startWidth={15} endWidth={15} color='#00ff00'></RangeDirective>
                                <RangeDirective start={(newBids[0].amount)*3.34/10} end={(newBids[0].amount)*3.34/5} startWidth={15} endWidth={15} color='#ff0000'></RangeDirective>
                                <RangeDirective start={(newBids[0].amount)*3.34/5} end={(newBids[0].amount)} startWidth={15} endWidth={15} color='#0000ff'></RangeDirective>
                              </RangesDirective>
                              <PointersDirective>
                                <PointerDirective value={((( parseInt(mr[1])-parseInt(mr[0]))/2)+parseInt(mr[0]))}></PointerDirective>
                              </PointersDirective>
                            </AxisDirective>
                          </AxesDirective>
                        </CircularGaugeComponent>
                      </div>):(<div></div>)}
                    </div>
                </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
              <label>Previous Bids</label>
              <table className="table">
                <tr>
                  <th>User Name</th>
                  <th>Bid Amount</th>
                  <th>Date</th>
                </tr>
              {newBids.map(p => (
                <tr id={"bidId-"+p.bidId} key={p.bidId} >
                  <td>{p.fullname}{console.log("p",p)}</td>
                  <td>{p.paid}</td>
                  <td>{timeAgo.format(Date.parse(p.created_at))}</td>
                </tr>
              ))}
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };