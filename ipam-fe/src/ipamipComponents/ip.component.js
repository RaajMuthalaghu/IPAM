import React, { useState, useEffect } from "react";
import IPDataService from "../services/ip.service";


const IP = props => {
  const initialIPState = {
    network: "",
    ip: "",
    exclude: false,
    hostname: null
  };
  const [currentIP, setCurrentIP] = useState(initialIPState);
  const [message, setMessage] = useState("");

  const getIP = (ip) => {
    IPDataService.findByip(ip)
      .then(response => {
        setCurrentIP(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getIP(props.match.params.ip);
  }, [props.match.params.ip]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentIP({ ...currentIP, [name]: value });
  };

//   const updatePublished = status => {
//     var data = {
//       network: currentNetwork.network,
//       description: currentNetwork.description,
//       published: status
//     };

//     IPDataService.update(currentNetwork.network, data)
//       .then(response => {
//         setCurrentNetwork({ ...currentNetwork, published: status });
//         console.log(response.data);
//         setMessage("The status was updated successfully!");
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };
// const listIP = () => {
//   IPDataService.get(currentNetwork.network)
//     .then(response => {
//       console.log(response.data);
//       setMessage("The IPs are listed successfully!");
//       props.history.push("/ips/" + currentNetwork.network);
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };
  const updateIP = () => {
    IPDataService.update(currentIP.ip, currentIP)
      .then(response => {
        console.log(response.data);
        setMessage("The IPaddress was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const deleteNetwork = () => {
  //   IPDataService.remove(currentNetwork.network)
  //     .then(response => {
  //       console.log(response.data);
  //       props.history.push("/networks");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  return (
    <div>
      {currentIP ? (
        <div className="edit-form">
          <h4>IP Form</h4>
          <form>
            <div className="form-group">
              <label htmlFor="network">Network</label>
              <input
                type="text"
                className="form-control"
                id="network"
                name="network"
                value={currentIP.network}
                onChange={handleInputChange}
              />
            </div>
              <div className="form-group">
                <label htmlFor="ip">IP</label>
                <input
                  type="text"
                  className="form-control"
                  id="ip"
                  required
                  value={currentIP.ip}
                  onChange={handleInputChange}
                  name="ip"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exclude">Exclude</label>
                <input
                  type="boolean"
                  className="form-control"
                  id="exclude"
                  required
                  value={currentIP.exclude}
                  onChange={handleInputChange}
                  name="exclude"
                />
              </div>
              <div className="form-group">
                <label htmlFor="hostname">Hostname</label>
                <input
                  type="text"
                  className="form-control"
                  id="hostname"
                  required
                  value={currentIP.hostname}
                  onChange={handleInputChange}
                  name="hostname"
                />
              </div>
          </form>


          <button type="submit" className="badge badge-success" onClick={updateIP}>
            Update
          </button>
          {/* <button className="badge badge-danger mr-2" onClick={deleteNetwork}>
            Delete
          </button> */}
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a IP Address...</p>
        </div>
      )}
    </div>
  );
};

export default IP;
