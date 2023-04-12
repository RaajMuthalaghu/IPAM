import React, { Component } from "react";
//import UserDataService from "../services/user.service";
import IPDataService from "../services/ip.service";
import { connect } from "react-redux";
import { createNetwork } from "../actions/networks";
import { createIP } from "../actions/ips";
import { toaster } from "../utils/toast";

class AddNetwork extends Component {
  constructor(props) {
    super(props);
    this.onChangenetwork = this.onChangenetwork.bind(this);
    this.onChangevlan = this.onChangevlan.bind(this);
    this.onChangesubnet = this.onChangesubnet.bind(this);
    this.onfillup = this.onfillup.bind(this);
    this.onChangenetmask = this.onChangenetmask.bind(this);
    this.onChangegateway = this.onChangegateway.bind(this);
    this.onChangefromip = this.onChangefromip.bind(this);
    this.onChangetoip = this.onChangetoip.bind(this);
    this.saveNetwork = this.saveNetwork.bind(this);
    this.newNetwork = this.newNetwork.bind(this);

    this.state = {
      network: "",
      vlan: 0, 
      subnet: "",
      netmask: "",
      gateway: "",
      fromip: "",
      toip: "",

      submitted: false,
      ips: []
    };
  }

  onChangenetwork(e) {
    this.setState({
        network: e.target.value
    });
  }

  onChangevlan(e) {
    this.setState({
        vlan: e.target.value
    });
  }
  
ValidateSubnet(ipsubnet) {  
  if (Number(ipsubnet.split("/")[1])<=32){
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipsubnet.split("/")[0])) {  
      return (true)  
    }  
  }
  alert("You have entered an invalid subnet address! Valid format is x.x.x.x/cidr")  
  return (false)  
} 
  
  
  onfillup(e) {
    var ipsubnet = e.target.value;
    this.ValidateSubnet(ipsubnet);

    var q1=(ipsubnet.split("/")[0]).split(".")[0];
    var q2=(ipsubnet.split("/")[0]).split(".")[1];
    var q3=(ipsubnet.split("/")[0]).split(".")[2];
    var q4=(ipsubnet.split("/")[0]).split(".")[3];
    var cidr=ipsubnet.split("/")[1];

		//get IP Address binaries
		var ipBin={};
		ipBin[1]=String("00000000"+parseInt(q1,10).toString(2)).slice(-8);
		ipBin[2]=String("00000000"+parseInt(q2,10).toString(2)).slice(-8);
		ipBin[3]=String("00000000"+parseInt(q3,10).toString(2)).slice(-8);
		ipBin[4]=String("00000000"+parseInt(q4,10).toString(2)).slice(-8);

		//decide standart class
		var standartClass="";
		if(q1<=126) standartClass="A";
		else if (q1===127)	standartClass="loopback IP"
		else if (q1>=128 && q1<=191) standartClass="B";
		else if (q1>=192 && q1<=223) standartClass="C";
		else if (q1>=224 && q1<=239) standartClass="D (Multicast Address)";
		else if (q1>=240 && q1<=225) standartClass="E (Experimental)";
		else standartClass="Out of range";
    
    //netmask
    var mask=cidr;
    var importantBlock=Math.ceil(mask/8);
    var importantBlockBinary=ipBin[importantBlock];
    var maskBinaryBlockCount=mask%8;
    if(maskBinaryBlockCount===0)importantBlock++;
    var maskBinaryBlock="";
    var maskBlock="";
    for(var i=1;i<=8;i++){
      if(maskBinaryBlockCount>=i){
        maskBinaryBlock+="1";
      }else{
        maskBinaryBlock+="0";
      }
    }
    //convert binary mask block to decimal
    maskBlock=parseInt(maskBinaryBlock,2);

    //net & broadcast addr
    var netBlockBinary="";
    var bcBlockBinary="";
    for(i=1;i<=8;i++){
      if(maskBinaryBlock.substr(i-1,1)==="1"){
        netBlockBinary+=importantBlockBinary.substr(i-1,1);
        bcBlockBinary+=importantBlockBinary.substr(i-1,1);
      }else{
        netBlockBinary+="0";
        bcBlockBinary+="1";
      }
    }

    //put everything together, create a string container variables
    mask="";
    var gw="";
    var rangeA="";
    var rangeB="";
    //loop to put whole strings block together
    for(i=1;i<=4;i++){
      if(importantBlock>i) {
        //blocks before the important block.
        mask+="255";
        gw+=parseInt(ipBin[i],2);
        rangeA+=parseInt(ipBin[i],2);
        rangeB+=parseInt(ipBin[i],2);
      }else if (importantBlock===i) {
        //the important block.
        mask+=maskBlock;
        q4 =(parseInt(netBlockBinary,2)+1);
        gw+=(parseInt(netBlockBinary,2)+1);
        rangeA+=(parseInt(netBlockBinary,2)+2);
        rangeB+=(parseInt(bcBlockBinary,2)-1);
      }else {
        //block after the important block.
        mask+=0;
        gw+=0;
        rangeA+=0;
        rangeB+=255;
      }
      //add . separator except the last block
      if(i<4){
        mask+=".";
        gw+=".";
        rangeA+=".";
        rangeB+=".";
      }
    }

    //list ips q1..q4 cidr
    var ips=[];
    q4+=1
    for(i=2**(32 - cidr)-3;i>0;i--){
      ips.push(q1 + "." + q2 + "." + q3 + "." + q4);
      q4++;
      if (q4 > 255) {
        q2++;
        q4 = 0;
      }
      if (q2 > 255) {
        q1++;
        q2 = 0;
      }
      if (q1 > 255) {
        q1++;
        q1 = 0;
      }
    }
  

    console.log(mask, gw, rangeA, rangeB);
    console.log(ips);
    this.setState({
        subnet: ipsubnet,
        netmask: mask,
        gateway: gw,
        fromip: rangeA,
        toip: rangeB,
        ips: ips
    });
  }

  onChangesubnet(e) {
    this.setState({
        subnet: e.target.value
    });
  }

  onChangenetmask(e) {
    this.setState({
      netmask: e.target.value
    });
  }

  onChangegateway(e) {
    this.setState({
        gateway: e.target.value
    });
  }
  onChangefromip(e) {
    this.setState({
      fromip: e.target.value
    });
  }


  onChangetoip(e) {
    this.setState({
      toip: e.target.value
    });
  }

  //save ipaddresses in ipamip
  saveIP() {
    const { network, ips } = this.state;
    //array1.forEach(element => console.log(element));
    var ipdata =[];
    ips.forEach( element => { ipdata.push({network: network, ip: element}) });
      this.props
      .createIP(ipdata)
      .then(response => { console.log(response.data);})
      .catch(e => { console.log(e); });
    
  }


  saveNetwork() {
    const { network, vlan, subnet, netmask, gateway, fromip, toip } = this.state;
    this.props
    .createNetwork(network, vlan, subnet, netmask, gateway, fromip, toip)
    .then((data) => {
      this.setState({
        network: data.network,
        vlan: data.vlan,
        subnet: data.subnet,
        netmask: data.netmask,
        gateway: data.gateway,
        fromip: data.fromip,
        toip: data.toip,

        submitted: true,
      });
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
    this.saveIP();
  }

  newNetwork() {
    this.setState({
        network: "",
        vlan: 0, 
        subnet: "",
        netmask: "",
        gateway: "",
        fromip: "",
        toip: "",

        submitted: false
    });
  }

  render() {
    return (

        <div className="submit-form">
          <form>
          {this.state.submitted ? (
            <div>
              <h4>Request submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newNetwork}>
                Add Network
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="network">Network</label>
                <input
                  type="text"
                  className="form-control"
                  id="network"
                  required
                  value={this.state.network}
                  onChange={this.onChangenetwork}
                  name="network"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="vlan">Vlan</label>
                <input
                  type="integer"
                  className="form-control"
                  id="vlan"
                  required
                  value={this.state.vlan}
                  onChange={this.onChangevlan}
                  name="vlan"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subnet">Subnet</label>
                <input
                  type="text"
                  className="form-control"
                  id="subnet"
                  required
                  value={this.state.subnet}
                  onChange={this.onChangesubnet}
                  onBlur={this.onfillup}
                  name="subnet"
                />
              </div>
              <div className="form-group">
                <label htmlFor="netmask">Netmask</label>
                <input
                  type="text"
                  className="form-control"
                  id="netmask"
                  required
                  value={this.state.netmask}
                  onChange={this.onChangenetmask}
                  name="netmask"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gateway">Gateway</label>
                <input
                  type="text"
                  className="form-control"
                  id="gateway"
                  required
                  value={this.state.gateway}
                  onChange={this.onChangegateway}
                  name="gateway"
                />
              </div>
              <div className="form-group">
                <label htmlFor="fromip">Fromip</label>
                <input
                  type="text"
                  className="form-control"
                  id="fromip"
                  required
                  value={this.state.fromip}
                  onChange={this.onChangefromip}
                  name="fromip"
                />
              </div>
              <div className="form-group">
                <label htmlFor="toip">Toip</label>
                <input
                  type="text"
                  className="form-control"
                  id="toip"
                  required
                  value={this.state.toip}
                  onChange={this.onChangetoip}
                  name="toip"
                />
              </div>
    
              <button onClick={this.saveNetwork} className="btn btn-success">
                Submit
              </button>
              <button onClick={(e) => { e.preventDefault(); window.location.href="/networks/"; }} className="btn btn-success">
                Cancel
              </button>

            </div>
           )} 
          </form>

        </div>
      );
  }
}
export default connect(null, { createNetwork, createIP })(AddNetwork);