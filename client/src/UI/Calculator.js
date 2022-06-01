import React, {
  useEffect,
  useState
} from "react";
import axios from "axios";
import {
  useHistory
} from "react-router-dom";
/* import Navbar from "./Navbar";
import UpperNavbar from "./UpperNavbar"; */
import RedirectNavbar from "./RedirectNavbar";
import Calendar from "react-calendar";
import {
  Dropdown
} from "react-bootstrap";
import "react-calendar/dist/Calendar.css";

export default function Calculator() {
 
 
  const [print,setPrint]=useState(false);

  const [loginStatus, setLoginStatus, query, setQuery] = useState("");
  const onChange = (event) => setQuery(event.target.value);
  const [number_of_committee, setnumber_of_committee] = useState(1);
  const [number_of_participants, setnumber_of_participants] = useState(12);
  const [number_of_chits, setnumber_of_chits] = useState(12);
  const [amount_per_chits, setamount_per_chits] = useState(10000);
  const [value_of_scheme, setvalue_of_scheme] = useState(120000);
  const [nof_required, setnof_required] = useState(12000);
  const [monthly_chit_contribution, setmonthly_chit_contribution] = useState(120000);
  const [base_discount_rate, setbase_discount_rate] = useState(10);
  const [reinvestment_rate, setreinvestment_rate] = useState(5);
  const [buyback_available, setbuyback_available] = useState("Yes");
  const [moneypool_operating_costs, setmoneypool_operating_costs] = useState(2.5);
  const [fd_security_required, setfd_security_required] = useState(120000);
  const [roi_for_moneypool, setroi_for_moneypool] = useState(12);

  console.log('number_of_committee',number_of_committee);
  const month= [1,2,3,4,5,6,7,8,9,10,11,12];
  const moneypool_operating_cost_multiplier= [100, 100, 100, 50, 50, 50, 50, 50, 50, 20, 20, 0];
  const multiplier= [100, 95, 90, 60, 50, 42.5, 35, 25, 20, 15, 5, 0];
  const security_deposit_cashback= [0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50];
  var moc_per=[null,null,null,null,null,null,null,null,null,null,null,null];
  var moc_inr=[null,null,null,null,null,null,null,null,null,null,null,null];
  var participant_discount_per=[null,null,null,null,null,null,null,null,null,null,null,null];
  var participant_discount_inr=[null,null,null,null,null,null,null,null,null,null,null,null];
  var share_per_participant=[null,null,null,null,null,null,null,null,null,null,null,null];
  var contribution_per_participant=[null,null,null,null,null,null,null,null,null,null,null,null];
  var cumulative_money_invested=[null,null,null,null,null,null,null,null,null,null,null,null];
  var last_row=[90,95,96,100,105,105,140,160,70,60,40,20];
  var parti=[];
  var parti2=[];
  var absolute_p=[];
  var proj=[];
  var buyback=[null,null,null,null,null,null,null,null,null,null,null,null];
  var income_participant=[null,null,null,null,null,null,null,null,null,null,null,null];
  var forecast_income_bids=[null,null,null,null,null,null,null,null,null,null,null,null];
  var total_reinvestment_income=[null,null,null,null,null,null,null,null,null,null,null,null];
  var reinv_income_5=[null,null,null,null,null,null,null,null,null,null,null,null];
  var mpool_commission_at_10=[null,null,null,null,null,null,null,null,null,null,null,null];
  var max_buyback=[null,null,null,null,null,null,null,null,null,null,null,null];
  var mpool_forecast_income_commission=[null,null,null,null,null,null,null,null,null,null,null,null];
  var share_interest_per=[30, 28, 38, 41, 45, 45, 55, 60, 70, 70, 75, 75];
  var buyback_amt_capital_protection=[null,null,null,null,null,null,null,null,null,null,null,null];
  var bonus_for_mems_at_2_per=[null,null,null,null,null,null,null,null,null,null,null,null];
  var moneypool_interest_cost=[null,null,null,null,null,null,null,null,null,null,null,null];
  var net_mpool_income=[null,null,null,null,null,null,null,null,null,null,null,null];
  var interest_cost_per=[null,null,null,null,null,null,null,null,null,null,null,null];
  var interest_cost_per2=[null,null,null,null,null,null,null,null,null,null,null,null];
  var user_category=[null,null,null,null,null,null,null,null,null,null,null,null];
  var mirr=[null,null,null,null,null,null,null,null,null,null,null,null];
  var tot_of_parti=[null,null,null,null,null,null,null,null,null,null,null,null];
  var sum=0;
  var t_income_participant=0;
  var t_forecast_income_bids=0;
  var t_total_reinvestment_income=0;
  var t_reinv_income_5=0;
  var t_mpool_commission_at_10=0;
  var t_max_buyback=0;
  var t_mpool_forecast_income_commission=0;
  var t_share_interest_per=0;
  var t_buyback_amt_capital_protection=0;
  var t_bonus_for_mems_at_2_per=0;
  var t_moneypool_interest_cost=0;
  var t_net_mpool_income=0;

  var nper=2.5;
  let sdc=0;
  let moneypool_operating_costs_m=0;

  function NPV(rate, initialCost, cashFlows=12) {
    var npv = initialCost;
  
    for (var i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(rate / 100 + 1, i + 1);
    }
  
    return npv;
  }

    function MIRR(values, finance_rate, reinvest_rate) {
      // Initialize number of values
      var n = values.length;
    
      // Lookup payments (negative values) and incomes (positive values)
      var payments = [];
      var incomes = [];
      for (var i = 0; i < n; i++) {
        if (values[i] < 0) {
          payments.push(values[i]);
        } else {
          incomes.push(values[i]);
        }
      }
      // Return modified internal rate of return
      var num = -NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
      var den = NPV(finance_rate, payments) * (1 + finance_rate);
      return Math.pow(num / den, 1 / (n - 1)) - 1;
    }
    function getnumber_of_committee(number_of_committee)
    {
      setnumber_of_committee(number_of_committee.target.value);
    }
    function getnumber_of_participants(number_of_participants)
    {
      setnumber_of_participants(number_of_participants.target.value);
    }
    function getnumber_of_chits(number_of_chits)
    {
      setnumber_of_chits(number_of_chits.target.value);
    }
    function getamount_per_chits(amount_per_chits)
    {
      setamount_per_chits(amount_per_chits.target.value);
    }
    function getvalue_of_scheme(value_of_scheme)
    {
      setvalue_of_scheme(value_of_scheme.target.value);
    }
    function getnof_required(nof_required)
    {
      setnof_required(nof_required.target.value);
    }
    function getmonthly_chit_contribution(monthly_chit_contribution)
    {
      setmonthly_chit_contribution(monthly_chit_contribution.target.value);
    }
    function getbase_discount_rate(base_discount_rate)
    {
      setbase_discount_rate(base_discount_rate.target.value);
    }
    function getreinvestment_rate(reinvestment_rate)
    {
      setreinvestment_rate(reinvestment_rate.target.value);
    }
    function getbuyback_available(buyback_available)
    {
      setbuyback_available(buyback_available.target.value);
    }
    function getfd_security_required(fd_security_required)
    {
      setfd_security_required(fd_security_required.target.value);
    }
    function getmoneypool_operating_costs(moneypool_operating_costs)
    {
      setmoneypool_operating_costs(moneypool_operating_costs.target.value);
    }
    function getroi_for_moneypool(roi_for_moneypool)
    {
      setroi_for_moneypool(roi_for_moneypool.target.value);
    }
  if (print === true){
    var total_fund = monthly_chit_contribution;
    var moneypool_operating_cost = moneypool_operating_costs;

    for (let i = 0; i < moneypool_operating_cost_multiplier.length; i++) {
       //Scheme Projections - Calculation
      if(security_deposit_cashback[i]>0){sdc = security_deposit_cashback[i]/100;}
      else{sdc =1;}  
       moc_per[i]=((moneypool_operating_cost_multiplier[i]/100)*moneypool_operating_cost*(sdc) ).toFixed(2);
       moc_inr[i]=moc_per[i]/100*monthly_chit_contribution;
       participant_discount_per[i]=multiplier[i]/100*base_discount_rate;
       participant_discount_inr[i]=(participant_discount_per[i]/100*monthly_chit_contribution).toFixed(0);
       share_per_participant[i]=(participant_discount_inr[i]/11).toFixed(0);
       contribution_per_participant[i]=10000-share_per_participant[i];
       if(i==0){cumulative_money_invested[i]=contribution_per_participant[i];}
       else{cumulative_money_invested[i]=contribution_per_participant[i]+cumulative_money_invested[i-1];}
       if(participant_discount_per[i]<nper){buyback[i]="Yes";}else{buyback[i]="No";}
      
    }
    for (var i = 0; i < 12; i++)
    {
       //Cash Flows of all participants
      parti.push([]);
      var k=0;
      for (var j = 0; j < 12; j++) {
        if(i==j)
        {
          var p = parseFloat(total_fund)-parseFloat(moc_inr[i])-parseFloat(participant_discount_inr[i])-parseFloat(amount_per_chits);
          parti[i].push(p); 
        }
        else{
          var p=((parseFloat(amount_per_chits) - parseFloat(share_per_participant[i]))*(-1));
          parti[i].push(p);
        }  
      }
    }
    var parti_n = parti.map(function(arr, i) {
      return arr.map(function(e, c) {
        return parti[c][i]
      })
    })
    parti=parti_n;
    parti2=parti;
    for (var i = 0; i < 12; i++)
    {
      //Absolute interest cost and income of all participants Without Mpool Buyback
      absolute_p.push([]);
      var k=0;
      for (var j = 0; j < 12; j++) {
        if(i==j)
        {
          var a = (parseFloat(parti[i][j]))-(parseFloat(value_of_scheme)-parseFloat(amount_per_chits));
          absolute_p[i].push(a); 
        }
        else{
          absolute_p[i].push(parseFloat(share_per_participant[i]));
        }  
      }
      var k=0;
    }

    var absolute_p_n = absolute_p.map(function(arr, i) {
      return arr.map(function(e, c) {
        return absolute_p[c][i]
      })
    })
    absolute_p=absolute_p_n;

    for (var i = 0; i < 12; i++)
    {
      var k=0;
      var p =0;
      for (var j = 0; j < 12; j++)
      {
        k=parseFloat(absolute_p[i][j])+parseFloat(k);
        if(i<j){p=parseFloat(absolute_p[i][j])+parseFloat(p);}
      }
      income_participant[i]=k;
      forecast_income_bids[i]=p;
    }
    t_income_participant=income_participant.reduce((result,number)=> result+number);
    t_forecast_income_bids=forecast_income_bids.reduce((result,number)=> result+number);
    for (var i = 0; i < 12; i++)
    {
      //Projected Reinvestment Income on Moneypool Buyback for 12 months 
      proj.push([]);
      var k=0;
      for (var j = 0; j < 12; j++) {
          k += parseFloat(parti[i][j]);
        if(j>=i){
          proj[i].push((parseFloat(k)*(1/12)*(parseFloat(reinvestment_rate)/100)).toFixed(0)); 
        }else{proj[i].push("0");}
      }
      k=0;
    }
    for (var i = 0; i < 12; i++)
    {
      var k=0;
      for (var j = 0; j < 12; j++) {
        k=parseFloat(proj[i][j])+parseFloat(k);
      }
      total_reinvestment_income[i]=k;
      k=0;
    } 
    mpool_forecast_income_commission=moc_inr; 
    t_total_reinvestment_income=total_reinvestment_income.reduce((result,number)=> result+number);
  var l=0;
    for (var i = 0; i < 12; i++)
    {
//reinv_income_5      
      var k=0;
      for (var j = 0; j < 11; j++) {
          k= parseFloat(k)+parseFloat(proj[i][j]) ;
      }
      reinv_income_5[i]=k;
      mpool_commission_at_10[i]=(parseFloat(k)*(10/100)).toFixed(2);
      t_mpool_commission_at_10 +=parseFloat(mpool_commission_at_10[i]);
      max_buyback[i]=parseFloat(reinv_income_5[i])-parseFloat(mpool_commission_at_10[i]);
      buyback_amt_capital_protection[i]= parseFloat(max_buyback[i])+parseFloat(moc_inr[i]);
      l=l+parseFloat(moc_inr[i]);
      bonus_for_mems_at_2_per[i] = parseFloat(l)*(2/100)
      if(buyback[i]==="Yes")
      {
        moneypool_interest_cost[i]=(parseFloat(bonus_for_mems_at_2_per[i])+parseFloat(buyback_amt_capital_protection[i])).toFixed(2);
        net_mpool_income[i]=(parseFloat(forecast_income_bids[i])+parseFloat(total_reinvestment_income[i])+parseFloat(mpool_forecast_income_commission[i])-parseFloat(moneypool_interest_cost[i])).toFixed(2);
        interest_cost_per[i]=(parseFloat(moneypool_interest_cost[i])*100/parseFloat(cumulative_money_invested[i])).toFixed(2);

      }
      else{
        moneypool_interest_cost[i]=0;
        net_mpool_income[i]=(parseFloat(mpool_forecast_income_commission[i])).toFixed(2);
        interest_cost_per[i]=0;
      }
      k=0;
      t_net_mpool_income+=parseFloat(net_mpool_income[i]);
      t_moneypool_interest_cost+=parseFloat(moneypool_interest_cost[i]);
    }
    t_reinv_income_5=reinv_income_5.reduce((result,number)=> result+number);
    t_max_buyback=max_buyback.reduce((result,number)=> result+number);
    t_mpool_forecast_income_commission=mpool_forecast_income_commission.reduce((result,number)=> result+number);
    t_share_interest_per=0;
    t_buyback_amt_capital_protection=(buyback_amt_capital_protection.reduce((result,number)=> result+number)).toFixed(2);
    t_bonus_for_mems_at_2_per=bonus_for_mems_at_2_per.reduce((result,number)=> result+number);
    
    
    l=0;
    for (var i = 0; i < 12; i++)
    {
      for (var j = 0; j < 12; j++) {
        if(i==j)
        {
          if(buyback[i]==="No")
          {
            interest_cost_per2[i]=(parseFloat(income_participant[i])*100/(parseFloat(parti[i][j])+parseFloat(amount_per_chits))).toFixed(2);
          }
          else{
            interest_cost_per2[i]=0;
          }
        }
      }

      if((buyback[i]==="Yes" ) && (parseFloat(interest_cost_per[i])>0))
      {
        user_category[i] = "Investor";
      }else{
        user_category[i] = "Borrower";
      }
      
    }
    for (var i = 0; i < 12; i++)
    {
      tot_of_parti[i]=0;
      for (var j = 0; j < 12; j++) {
        tot_of_parti[i]=parseFloat(tot_of_parti[i])+parseFloat(parti[i][j]);
        
      }
      mirr[i]=MIRR(parseFloat(tot_of_parti[i]),parseFloat(moc_per[0]),parseFloat(reinvestment_rate));
  }
    console.log('moneypool_operating_cost',moneypool_operating_cost);
    console.log('monthly_chit_contribution',monthly_chit_contribution);
    console.log('moneypool_operating_cost_multiplier',moneypool_operating_cost_multiplier);
    console.log('moc_per',moc_per);
    console.log('moc_inr',moc_inr);
    console.log('parti',parti);
    console.log('absolute_p',absolute_p);
    console.log('proj',proj);
    console.log('parti2',parti2); 
    console.log('buyback',buyback); 
    console.log('income_participant',income_participant); 
    console.log('forecast_income_bids',forecast_income_bids); 
    console.log('total_reinvestment_income',total_reinvestment_income); 
    console.log('reinv_income_5',reinv_income_5); 
    console.log('mpool_commission_at_10',mpool_commission_at_10); 
    console.log('max_buyback',max_buyback);
    console.log('mpool_forecast_income_commission',mpool_forecast_income_commission); 
    console.log('buyback_amt_capital_protection',buyback_amt_capital_protection);
    console.log('bonus_for_mems_at_2_per',bonus_for_mems_at_2_per);
    console.log('moneypool_interest_cost',moneypool_interest_cost);
    console.log('net_mpool_income',net_mpool_income);
    console.log('interest_cost_per',interest_cost_per);
    console.log('interest_cost_per2',interest_cost_per2);
    console.log('user_category',user_category);
    console.log('tot_of_parti',tot_of_parti);
    console.log('mirr',mirr);

  }
    useEffect(() => {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user.fullname);
      }
    });
  }, []);

  const logout = () => {
    axios.get("/api/logout").then((response) => {
      if (response.data === "logout done") {
        setLoginStatus("");
      }
    });
  };
  return (
    <div className="sidebar-collapse">
      <nav className="navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
              <h1>Chit-Fund</h1>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
              {/* Navbar Search */}
              <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">
                      Features
                  </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">
                      Plans
                  </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">
                      About us
                  </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">
                      Support
                  </a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" data-widget="navbar-search" href="/" role="button">
                      <i className="fas fa-search" />
                  </a>
                  <div className="navbar-search-block">
                      <form className="form-inline">
                          <div className="input-group input-group-sm">
                              <input className="form-control form-control-navbar" type="search" placeholder="Search"
                                  aria-label="Search" />
                              <div className="input-group-append">
                                  <button className="btn btn-navbar" type="submit">
                                      <i className="fas fa-search" />
                                  </button>
                                  <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                      <i className="fas fa-times" />
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </li>
              {loginStatus === "" && (
              <li style={{ background: "gray" }} className="nav-item d-none d-sm-inline-block">
                  <a style={{ color: "white" }} href="/register" className="nav-link">
                      Login/Sign In
                  </a>
              </li>
              )}
              {loginStatus !== "" && (
              <>
                  <li style={{ marginTop: "9px" }} className="nav-item d-none d-sm-inline-block">
                      <span>Hello! {loginStatus} </span>
                  </li>
                  <li style={{ marginTop: "1px", paddingLeft: "12px" }} className="nav-item d-none d-sm-inline-block">
                      <button type="submit" className="btn btn-danger btn-block" onClick={logout}>
                          Logout
                      </button>
                  </li>
              </>
              )}
          </ul>
      </nav>
      <div className="card-body container">
        <h4 className="title">Scheme Design	</h4>
        <form>
          <div className="container">
          <div className="row">
                  <div className="form-group col-md-4 mb-3">
                      <label>Number of Committee</label>
                      <input  type="text" className="form-control" placeholder="Number of Committee" id="number_of_committee" name="number_of_committee" onChange={getnumber_of_committee} defaultValue={1} />
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Number of Participants</label>
                      <input  type="text" className="form-control" placeholder="Number of Participants" id="number_of_participants" name="number_of_participants" onChange={getnumber_of_participants} defaultValue={12} />
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Number of Chits</label>
                      <input  type="text" className="form-control" placeholder="Number of Chits" id="number_of_chits" name="number_of_chits" onChange={getnumber_of_chits} defaultValue={12} />
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Amount per Chit</label>
                      <input  type="text" className="form-control" placeholder="Amount per Chit" id="amount_per_chits" name="amount_per_chits" onChange={getamount_per_chits} defaultValue={10000}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Value of scheme</label>
                      <input  type="text" className="form-control" placeholder="Value of scheme" id="value_of_scheme" name="value_of_scheme" onChange={getvalue_of_scheme} defaultValue={120000}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>NoF required</label>
                      <input  type="text" className="form-control" placeholder="NoF required" id="nof_required" name="nof_required" onChange={getnof_required} defaultValue={12000}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Monthly Chit contribution</label>
                      <input  type="text" className="form-control" placeholder="Monthly Chit contribution" id="monthly_chit_contribution" name="monthly_chit_contribution" onChange={getmonthly_chit_contribution} defaultValue={120000}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Base Discount Rate %</label>
                      <input  type="text" className="form-control" placeholder="Base Discount Rate %" id="base_discount_rate" name="base_discount_rate" onChange={getbase_discount_rate} defaultValue={10}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Reinvestment Rate</label>
                      <input  type="text" className="form-control" placeholder="Reinvestment Rate" id="reinvestment_rate" name="reinvestment_rate" onChange={getreinvestment_rate} defaultValue={5}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Buyback available</label>
                      <input  type="text" className="form-control" placeholder="Buyback available" id="buyback_available" name="buyback_available" onChange={getbuyback_available} defaultValue={"Yes"}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>Moneypool Operating Cost</label>
                      <input  type="text" className="form-control" placeholder="Moneypool Operating Cost" id="moneypool_operating_costs" name="moneypool_operating_costs" onChange={getmoneypool_operating_costs} defaultValue={2.5}/>
                  </div>
                  <div className="form-group col-md-4 mb-3">
                      <label>FD security required</label>
                      <input  type="text" className="form-control" placeholder="FD security required" id="fd_security_required" name="fd_security_required" onChange={getfd_security_required} defaultValue={120000}/>
                  </div> 
                  <div className="form-group col-md-4 mb-3">
                      <label>ROI for Moneypool</label>
                      <input  type="text" className="form-control" placeholder="ROI for Moneypool" id="roi_for_moneypool" name="roi_for_moneypool" onChange={getroi_for_moneypool} defaultValue={12}/>
                  </div> 
                </div>
          </div>
          <div className="col-md-4">
          <input
            type="button"
            className="btn btn-block btn-primary"
            value="Calculate" onClick={()=>setPrint(true)}/>
            </div> <div className="col-md-12">
            
            </div>
        </form>
      </div>
      <div className="card-body container">
        <div className="table-responsive">
          <table className="table table-hover">
              <thead className="thead-dark">
            <tr>
              <td colspan="13" align="center">Scheme Projections</td>
            </tr></thead>
            <tr>
              <th>Month</th>
              {month.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc} 
                </td>  
              ))} 
            </tr>
            <tr>
              <th>Total fund</th>
              {month.map((moc,i) => (  
                <td key={i} className="text-right">{print?(total_fund):null}</td>
              ))} 
            </tr>
            <tr>
              <th>Period of investment</th>
              {month.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {13-moc} 
                </td>  
              ))} 
            </tr>
            <tr>
              <th>Moneypool Operating Costs %</th>
              {moc_per.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc}%
                </td>  
              ))}
              
            </tr>
            <tr>
              <th>Moneypool Operating Costs (INR)</th>
              {moc_inr.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc} 
                </td>  
              ))}
            </tr>
            <tr>
              <th>Participant Discount %</th>
              {participant_discount_per.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc}%
                </td>  
              ))}
            </tr>
            <tr>
              <th>Participant Discount Amount</th>
              {participant_discount_inr.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc} 
                </td>  
              ))}
            </tr>
            <tr>
              <th>Share per participant</th>
              {share_per_participant.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc} 
                </td>  
              ))}
            </tr>
            <tr>
              <th>Contribution per participant</th>
              {contribution_per_participant.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc} 
                </td>  
              ))}
            </tr>
            <tr>
              <th>Cumulative Money invested</th>
              {cumulative_money_invested.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc} 
                </td>  
              ))}
            </tr>
            <tr>
              <th>Multiplier</th>
              {multiplier.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc}% 
                </td>  
              ))} 
            </tr>
            <tr>
              <th>Moneypool Operating Cost Multiplier</th>
              {moneypool_operating_cost_multiplier.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc}% 
                </td>  
              ))} 
              
            </tr>
            <tr>
              <th> Security deposit cashback </th>
              {security_deposit_cashback.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc}% 
                </td>  
              ))} 
            </tr>
            <tr>
              <th></th>
              {last_row.map((moc,i) => (  
                <td key={i} className="text-right">  
                  {moc}% 
                </td>  
              ))} 
            </tr>
          </table>
        </div>
      </div>
      <div className="card-body container">
        <div className="table-responsive">
          <table className="table">
            <tr>

              <th colspan="14">Mpool buy back cost and capital    protection trigger projections </th>
              <th></th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th></th>
              <th></th>
              <th>&nbsp;</th>
              <th width="123">This will be input variable</th>
              <th width="143">Buyback cost for Moneypool</th>
              <th width="119">2%</th>
              <th width="127">Total Cost for Moneypool</th>
              <th width="142"></th>
              <th width="151"></th>
              <th width="168"></th>
              <th width="164"></th>
              <th width="62"></th>
              <th width="94"></th>
              <th width="111"></th>
            </tr>
            <tr>
              <th>&nbsp;</th>
              <th>Month 1</th>
              <th>Month 2</th>
              <th>Month 3</th>
              <th>Month 4</th>
              <th>Month 5</th>
              <th>Month 6</th>
              <th>Month 7</th>
              <th>Month 8</th>
              <th>Month 9</th>
              <th>Month 10</th>
              <th>Month 11</th>
              <th>Month 12</th>
              <th>Buyback</th>
              <th width="139">Total cost/ income for participant</th>
              <th width="174">Mpool forecast income - bids</th>
              <th width="134">Total Reinvestment Income</th>
              <th width="194">Mpool Commission @ 10%</th>
              <th>Max. Buyback</th>
              <th width="141">Mpool forecast income - Commission</th>
              <th width="123">Share in interest %</th>
              <th width="143">Buyback Amount - Capital Protection</th>
              <th width="119">Bonus for members @2%</th>
              <th width="127">Moneypool Interest Cost</th>
              <th width="142">Net Mpool income</th>
              <th width="151">Interest cost/ income of participants w buyback</th>
              <th width="168">Interest cost/ income of participants w/o buyback</th>
              <th width="164">User Category</th>
              {/* <th width="62">MIRR</th>
              <th width="94">Gap</th>
              <th width="111">Net Cost/ income    for users</th>
              
              
              <th align="right">5%</th>
              <th align="right">-3.26%</th>
              <th align="right">-9.74%</th>*/}
            </tr>
            <tr>
              <th>P1</th>
                      {(absolute_p[0] || []) .map((moc, index) => (  
                        <td key={index} className= {index===0 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}
              
              <td className="text-right buyback">{buyback[0]}</td>
              <td className="text-right income_participant">{income_participant[0]}</td>
              <td className="text-right forecast_income_bids">{forecast_income_bids [0]}</td>
              <td className="text-right total_reinvestment_income">{total_reinvestment_income [0]}</td>
              {/* <td className="text-right reinv_income_5">{reinv_income_5[0]}</td> */}
              <td className="text-right mpool_commission_at_10">{mpool_commission_at_10[0]}</td>
              <td className="text-right max_buyback">{max_buyback[0]}</td>
              <td className="text-right mpool_forecast_income_commission" align="right">{mpool_forecast_income_commission[0]}</td>
              <td className="text-right">{share_interest_per[0]}%</td>
              <td className="text-right buyback_amt_capital_protection">{buyback_amt_capital_protection[0]}</td>
              <td className="text-right bonus_for_mems_at_2_per">{bonus_for_mems_at_2_per[0]}</td>
              <td className="text-right moneypool_interest_cost">{moneypool_interest_cost[0]}</td>
              <td className="text-right net_mpool_income">{net_mpool_income[0]}</td>
              <td className="text-right interest_cost_per" align="right">{interest_cost_per[0]}%</td>
              <td className="text-right interest_cost_per2" align="right">{interest_cost_per2[0]}%</td>
              <td className="text-right user_category">{user_category[0]}</td>
            </tr>
            <tr>
              <th>P2</th>
                        {(absolute_p[1] || []) .map((moc, index) => (  
                        <td key={index} className={index===1 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}
                
                <td className="text-right">{buyback[1]}</td>
                <td className="text-right">{income_participant[1]}</td>
                <td className="text-right">{forecast_income_bids [1]}</td>
                <td className="text-right">{total_reinvestment_income [1]}</td>
                {/* <td className="text-right">{reinv_income_5[1]}</td> */}
                <td className="text-right">{mpool_commission_at_10[1]}</td>
                <td className="text-right">{max_buyback[1]}</td>
                <td className="text-right">{mpool_forecast_income_commission[1]}</td>
                <td className="text-right">{share_interest_per[1]}%</td>
                <td className="text-right">{buyback_amt_capital_protection[1]}</td>
                <td className="text-right">{bonus_for_mems_at_2_per[1]}</td>
                <td className="text-right">{moneypool_interest_cost[1]}</td>
                <td className="text-right">{net_mpool_income[1]}</td>
                <td className="text-right">{interest_cost_per[1]}%</td>
                <td className="text-right">{interest_cost_per2[1]}%</td>
                <td className="text-right">{user_category[1]}</td>
              
            </tr>
            <tr>
              <th>P3</th>
                        {(absolute_p[2] || []) .map((moc, index) => (  
                        <td key={index} className={index===2 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}
                
                <td className="text-right">{buyback[2]}</td>
                <td className="text-right">{income_participant[2]}</td>
                <td className="text-right">{forecast_income_bids [2]}</td>
                <td className="text-right">{total_reinvestment_income [2]}</td>
                {/* <td className="text-right">{reinv_income_5[2]}</td> */}
                <td className="text-right">{mpool_commission_at_10[2]}</td>
                <td className="text-right">{max_buyback[2]}</td>
                <td className="text-right">{mpool_forecast_income_commission[2]}</td>
                <td className="text-right">{share_interest_per[2]}%</td>

                <td className="text-right">{buyback_amt_capital_protection[2]}</td>
                <td className="text-right">{bonus_for_mems_at_2_per[2]}</td>
                <td className="text-right">{moneypool_interest_cost[2]}</td>
                <td className="text-right">{net_mpool_income[2]}</td>
                <td className="text-right">{interest_cost_per[2]}%</td>
                <td className="text-right">{interest_cost_per2[2]}%</td>
                <td className="text-right">{user_category[2]}</td>
            </tr>
            <tr>
              <th>P4</th>
                        {(absolute_p[3] || []) .map((moc, index) => (  
                        <td key={index} className={index===3 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}
                
                <td className="text-right">{buyback[3]}</td>
                <td className="text-right">{income_participant[3]}</td>
                <td className="text-right">{forecast_income_bids [3]}</td>
                <td className="text-right">{total_reinvestment_income [3]}</td>
                {/* <td className="text-right">{reinv_income_5[3]}</td> */}
                <td className="text-right">{mpool_commission_at_10[3]}</td>
                <td className="text-right">{max_buyback[3]}</td>
                <td className="text-right">{mpool_forecast_income_commission[3]}</td>
                <td className="text-right">{share_interest_per[3]}%</td>
                <td className="text-right">{buyback_amt_capital_protection[3]}</td>
                <td className="text-right">{bonus_for_mems_at_2_per[3]}</td>
                <td className="text-right">{moneypool_interest_cost[3]}</td>
                <td className="text-right">{net_mpool_income[3]}</td>
                <td className="text-right">{interest_cost_per[3]}%</td>
                <td className="text-right">{interest_cost_per2[3]}%</td>
                <td className="text-right">{user_category[3]}</td> 
            </tr>
            <tr>
              <th>P5</th>
                    {(absolute_p[4]|| []) .map((moc, index) => (  
                        <td key={index} className={index===4 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}
            
              <td className="text-right">{buyback[4]}</td>
              <td className="text-right">{income_participant[4]}</td>
              <td className="text-right">{forecast_income_bids [4]}</td>
              <td className="text-right">{total_reinvestment_income [4]}</td>
              {/* <td className="text-right">{reinv_income_5[4]}</td> */}
              <td className="text-right">{mpool_commission_at_10[4]}</td>
              <td className="text-right">{max_buyback[4]}</td>
              <td className="text-right">{mpool_forecast_income_commission[4]}</td>
              <td className="text-right">{share_interest_per[4]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[4]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[4]}</td>
              <td className="text-right">{moneypool_interest_cost[4]}</td>
              <td className="text-right">{net_mpool_income[4]}</td>
              <td className="text-right">{interest_cost_per[4]}%</td>
              <td className="text-right">{interest_cost_per2[4]}%</td>
              <td className="text-right">{user_category[4]}</td>  
            </tr>
            <tr>
              <th>P6</th>
              {(absolute_p[5]|| []) .map((moc, index) => (  
                        <td key={index} className={index===5 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}

              <td className="text-right">{buyback[5]}</td>
              <td className="text-right">{income_participant[5]}</td>
              <td className="text-right">{forecast_income_bids [5]}</td>
              <td className="text-right">{total_reinvestment_income [5]}</td>
              {/* <td className="text-right">{reinv_income_5[5]}</td> */}
              <td className="text-right">{mpool_commission_at_10[5]}</td>
              <td className="text-right">{max_buyback[5]}</td>
              <td className="text-right">{mpool_forecast_income_commission[5]}</td>
              <td className="text-right">{share_interest_per[5]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[5]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[5]}</td>
              <td className="text-right">{moneypool_interest_cost[5]}</td>
              <td className="text-right">{net_mpool_income[5]}</td>
              <td className="text-right">{interest_cost_per[5]}%</td>
              <td className="text-right">{interest_cost_per2[5]}%</td>
              <td className="text-right">{user_category[5]}</td>  
            </tr>
            <tr>
              <th>P7</th>
              {(absolute_p[6]|| []) .map((moc, index) => (  
                        <td key={index} className={index===6 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}
              <td className="text-right">{buyback[6]}</td>
              <td className="text-right">{income_participant[6]}</td>
              <td className="text-right">{forecast_income_bids [6]}</td>
              <td className="text-right">{total_reinvestment_income [6]}</td>
              {/* <td className="text-right">{reinv_income_5[6]}</td> */}
              <td className="text-right">{mpool_commission_at_10[6]}</td>
              <td className="text-right">{max_buyback[6]}</td>
              <td className="text-right">{mpool_forecast_income_commission[6]}</td>
              <td className="text-right">{share_interest_per[6]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[6]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[6]}</td>
              <td className="text-right">{moneypool_interest_cost[6]}</td>
              <td className="text-right">{net_mpool_income[6]}</td>
              <td className="text-right">{interest_cost_per[6]}%</td>
              <td className="text-right">{interest_cost_per2[6]}%</td>
              <td className="text-right">{user_category[6]}</td>  
            </tr>
            <tr>
              <th>P8</th>
              {(absolute_p[7]|| []) .map((moc, index) => (  
                        <td key={index} className={index===7 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}

              <td className="text-right">{buyback[7]}</td>
              <td className="text-right">{income_participant[7]}</td>
              <td className="text-right">{forecast_income_bids [7]}</td>
              <td className="text-right">{total_reinvestment_income [7]}</td>
              {/* <td className="text-right">{reinv_income_5[7]}</td> */}
              <td className="text-right">{mpool_commission_at_10[7]}</td>
              <td className="text-right">{max_buyback[7]}</td>
              <td className="text-right">{mpool_forecast_income_commission[7]}</td>
              <td className="text-right">{share_interest_per[7]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[7]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[7]}</td>
              <td className="text-right">{moneypool_interest_cost[7]}</td>
              <td className="text-right">{net_mpool_income[7]}</td>
              <td className="text-right">{interest_cost_per[7]}%</td>
              <td className="text-right">{interest_cost_per2[7]}%</td>
              <td className="text-right">{user_category[7]}</td>  
            </tr>
            <tr>
              <th>P9</th>
              {(absolute_p[8]|| []) .map((moc, index) => (  
                        <td key={index} className={index===8 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}

              <td className="text-right">{buyback[8]}</td>
              <td className="text-right">{income_participant[8]}</td>
              <td className="text-right">{forecast_income_bids [8]}</td>
              <td className="text-right">{total_reinvestment_income [8]}</td>
              {/* <td className="text-right">{reinv_income_5[8]}</td> */}
              <td className="text-right">{mpool_commission_at_10[8]}</td>
              <td className="text-right">{max_buyback[8]}</td>
              <td className="text-right">{mpool_forecast_income_commission[8]}</td>
              <td className="text-right">{share_interest_per[8]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[8]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[8]}</td>
              <td className="text-right">{moneypool_interest_cost[8]}</td>
              <td className="text-right">{net_mpool_income[8]}</td>
              <td className="text-right">{interest_cost_per[8]}%</td>
              <td className="text-right">{interest_cost_per2[8]}%</td>
              <td className="text-right">{user_category[8]}</td>  

            </tr>
            <tr>
              <th>P10</th>
              {(absolute_p[9]|| []) .map((moc, index) => (  
                        <td key={index} className={index===9 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}

              <td className="text-right">{buyback[9]}</td>
              <td className="text-right">{income_participant[9]}</td>
              <td className="text-right">{forecast_income_bids [9]}</td>
              <td className="text-right">{total_reinvestment_income [9]}</td>
              {/* <td className="text-right">{reinv_income_5[9]}</td> */}
              <td className="text-right">{mpool_commission_at_10[9]}</td>
              <td className="text-right">{max_buyback[9]}</td>
              <td className="text-right">{mpool_forecast_income_commission[9]}</td>
              <td className="text-right">{share_interest_per[9]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[9]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[9]}</td>
              <td className="text-right">{moneypool_interest_cost[9]}</td>
              <td className="text-right">{net_mpool_income[9]}</td>
              <td className="text-right">{interest_cost_per[9]}%</td>
              <td className="text-right">{interest_cost_per2[9]}%</td>
              <td className="text-right">{user_category[9]}</td>  

            </tr>
            <tr>
              <th>P11</th>
              {(absolute_p[10]|| []) .map((moc, index) => (  
                        <td key={index} className={index===10 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}

              <td className="text-right">{buyback[10]}</td>
              <td className="text-right">{income_participant[10]}</td>
              <td className="text-right">{forecast_income_bids [10]}</td>
              <td className="text-right">{total_reinvestment_income [10]}</td>
              {/* <td className="text-right">{reinv_income_5[10]}</td> */}
              <td className="text-right">{mpool_commission_at_10[10]}</td>
              <td className="text-right">{max_buyback[10]}</td>
              <td className="text-right">{mpool_forecast_income_commission[10]}</td>
              <td className="text-right">{share_interest_per[10]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[10]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[10]}</td>
              <td className="text-right">{moneypool_interest_cost[10]}</td>
              <td className="text-right">{net_mpool_income[10]}</td>
              <td className="text-right">{interest_cost_per[10]}%</td>
              <td className="text-right">{interest_cost_per2[10]}%</td>
              <td className="text-right">{user_category[10]}</td>  

            </tr>
            <tr>
              <th>P12</th>
              {(absolute_p[11]|| []) .map((moc, index) => (  
                        <td key={index} className={index===11 ? 'text-right bg-warning font-weight-bold text-danger' : 'text-right'}>  
                          {moc} 
                        </td>  
                      ))}

              <td className="text-right">{buyback[11]}</td>
              <td className="text-right">{income_participant[11]}</td>
              <td className="text-right">{forecast_income_bids [11]}</td>
              <td className="text-right">{total_reinvestment_income [11]}</td>
              {/* <td className="text-right">{reinv_income_5[11]}</td> */}
              <td className="text-right">{mpool_commission_at_10[11]}</td>
              <td className="text-right">{max_buyback[11]}</td>
              <td className="text-right">{mpool_forecast_income_commission[11]}</td>
              <td className="text-right">{share_interest_per[11]}%</td>
              <td className="text-right">{buyback_amt_capital_protection[11]}</td>
              <td className="text-right">{bonus_for_mems_at_2_per[11]}</td>
              <td className="text-right">{moneypool_interest_cost[11]}</td>
              <td className="text-right">{net_mpool_income[11]}</td>
              <td className="text-right">{interest_cost_per[11]}%</td>
              <td className="text-right">{interest_cost_per2[11]}%</td>
              <td className="text-right">{user_category[11]}</td>  

            </tr>
            <tr>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right t_forecast_income_bids">{t_forecast_income_bids}</td>
              <td className="text-right t_total_reinvestment_income">{t_total_reinvestment_income}</td>
              {/* <td className="text-right t_reinv_income_5">{t_reinv_income_5}</td> */}
              <td className="text-right t_mpool_commission_at_10">{t_mpool_commission_at_10}</td>
              <td className="text-right t_max_buyback">{t_max_buyback}</td>
              <td className="text-right t_mpool_forecast_income_commission">{t_mpool_forecast_income_commission}</td>
              <td className="text-right t_share_interest_per">{t_share_interest_per}</td>
              <td className="text-right t_buyback_amt_capital_protection">{t_buyback_amt_capital_protection}</td>
              <td className="text-right t_bonus_for_mems_at_2_per">{t_bonus_for_mems_at_2_per}</td>
              <td className="text-right t_moneypool_interest_cost">{t_moneypool_interest_cost}</td>
              <td className="text-right t_net_mpool_income">{t_net_mpool_income}</td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
              <td className="text-right"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}