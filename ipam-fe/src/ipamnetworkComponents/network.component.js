import React, { useState, useEffect } from "react";
import NetworkDataService from "../services/network.service";
import IPDataService from "../services/ip.service";


const Network = props => {
  const initialNetworkState = {
    network: "",
    vlan: 0, 
    subnet: "",
    netmask: "",
    gateway: "",
    fromip: "",
    toip: ""
  };
  const [currentNetwork, setCurrentNetwork] = useState(initialNetworkState);
  const [message, setMessage] = useState("");

  const getNetwork = network => {
    NetworkDataService.get(network)
      .then(response => {
        setCurrentNetwork(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNetwork(props.match.params.network);
  }, [props.match.params.network]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNetwork({ ...currentNetwork, [name]: value });
  };

//   const updatePublished = status => {
//     var data = {
//       network: currentNetwork.network,
//       description: currentNetwork.description,
//       published: status
//     };

//     NetworkDataService.update(currentNetwork.network, data)
//       .then(response => {
//         setCurrentNetwork({ ...currentNetwork, published: status });
//         console.log(response.data);
//         setMessage("The status was updated successfully!");
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };
const listIP = () => {
  IPDataService.get(currentNetwork.network)
    .then(response => {
      console.log(response.data);
      setMessage("The IPs are listed successfully!");
      props.history.push("/ips/" + currentNetwork.network);
    })
    .catch(e => {
      console.log(e);
    });
};
  const updateNetwork = () => {
    NetworkDataService.update(currentNetwork.network, currentNetwork)
      .then(response => {
        console.log(response.data);
        setMessage("The Network was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteNetwork = () => {
    NetworkDataService.remove(currentNetwork.network)
      .then(response => {
        console.log(response.data);
        props.history.push("/networks");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentNetwork ? (
        <div className="edit-form">
          <h4>Network</h4>
          <form>
            <div className="form-group">
              <label htmlFor="network">Network</label>
              <input
                type="text"
                className="form-control"
                id="network"
                name="network"
                value={currentNetwork.network}
                onChange={handleInputChange}
              />
            </div>
              <div className="form-group">
                <label htmlFor="vlan">Vlan</label>
                <input
                  type="integer"
                  className="form-control"
                  id="vlan"
                  required
                  value={currentNetwork.vlan}
                  onChange={handleInputChange}
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
                  value={currentNetwork.subnet}
                  onChange={handleInputChange}
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
                  value={currentNetwork.netmask}
                  onChange={handleInputChange}
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
                  value={currentNetwork.gateway}
                  onChange={handleInputChange}
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
                  value={currentNetwork.fromip}
                  onChange={handleInputChange}
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
                  value={currentNetwork.toip}
                  onChange={handleInputChange}
                  name="toip"
                />
              </div>

          </form>


          <button className="badge badge-success" onClick={listIP}>
            IP List
          </button>
          <button type="submit" className="badge badge-success" onClick={updateNetwork}>
            Update
          </button>
          <button className="badge badge-danger mr-2" onClick={deleteNetwork}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Network...</p>
        </div>
      )}
    </div>
  );
};

export default Network;
