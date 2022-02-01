import { useEffect, useState } from "react";

const LinkNFTModal = ({ cancel, stakes, GetStakeSelected, title, length }) => {
  const [locktime, setLocktime] = useState("90");
  const [onStake, setOnStake] = useState(4490.1);

  useEffect(() => {
    let total = 0;
    if (stakes?.length > 0) {
      for (let i of stakes) {
        if (locktime === "90") {
          total = total + 49.89 * 90;
        } else if (locktime === "180") {
          total = total + 61.79 * 180;
        } else if (locktime === "360") {
          total = total + 80.24 * 365;
        }
      }
    }
    if (total > 0) {
      setOnStake(total);
    }
  }, [length, locktime]);

  return (
    <div className="modal-dialog pos-modal" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <div className="row">
            <div className="col-sm-12 p-0">
              <button
                type="button"
                className="close pt-1"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 className="white modal-heading  text-center">{title}</h3>
              <div className="pop-content">
                <ul className="pb-4">
                  <li>
                    <p className="">SELECT LOCK TIME</p>
                  </li>
                  <li>
                    <select
                      className="w-100 select-opt"
                      onChange={(e) => setLocktime(e.target.value)}
                      name="No Lock"
                      id=""
                    >
                      {/* <option value="No Lock">No Lock</option> */}
                      <option value={90}>3 Months</option>
                      <option value={180}>6 Months</option>
                      <option value={360}>1 Year</option>
                    </select>
                  </li>
                </ul>
                {/* <ul className="list-inline mt-4">
                  <li className="list-inline-item">
                    <ul className="bluegrey ">
                      <li>
                        <p>Staking Value</p>
                      </li>
                      <li>
                        <p>3013 Credits</p>
                      </li>
                    </ul>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li className="list-inline-item">
                    <ul className="bluegrey">
                      <li>
                        <p>Avarage APY</p>
                      </li>
                      <li>
                        <p>30%</p>
                      </li>
                    </ul>
                  </li>
                </ul> */}
                <p>{"Expected Reward: " + onStake?.toFixed(2)+" RTT"}</p>
                <ul className="list-inline btn-div text-center">
                  <li className="list-inline-item">
                    <button onClick={cancel} className="btn-common-white">
                      Cancel
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={() => GetStakeSelected(locktime)}
                      className="btn-common"
                    >
                      {title}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkNFTModal;
