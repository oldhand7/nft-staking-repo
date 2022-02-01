import React, { useEffect, useState } from "react";
import ClaimModal from "../models/claimModal";
import "./stakinginfo.scss";
function Stakinginfo({ nft, stakeLockPeriod, staked, unstaked, linked }) {
  const [reward, setReward] = useState(0);
  const claim = () => {
    // window.$("#exampleModalLong1").modal('hide');
    window.$("#exampleModalLong1").modal("show");
  };
  const cancel = () => {
    window.$("#exampleModalLong1").modal("hide");
  };

  useEffect(() => {
    let dummArr = [];
    let total = 0;
    for (let i of staked) {
      var d = new Date(i.stakeTime);
      if (i.tier === "90") {
        d.setMonth(d.getMonth() + 3);
        // d.setMinutes(d.getMinutes() + 2);
      } else if (i.tier === "180") {
        d.setMonth(d.getMonth() + 6);
        // d.setMinutes(d.getMinutes() + 4);
      } else if (i.tier === "360") {
        d.setMonth(d.getMonth() + 12);
        // d.setMinutes(d.getMinutes() + 6);
      }
      // check withdraw
      let newdate = new Date();
      var stakeDate = new Date(d);
      let checkava = newdate > stakeDate;
      if (checkava) {
        dummArr.push(i);
      }
    }
    for (let _t of dummArr) {
      if (_t.tier === "90") {
        total = total + 49.89 * 90;
      } else if (_t.tier === "180") {
        total = total + 61.79 * 180;
      } else if (_t.tier === "360") {
        total = total + 80.24 * 365;
      }
    }
    setReward(total);
  }, [staked]);

  return (
    <>
      <section className="stakinginfo">
        <div className="container p-0">
          <div className="row">
            <div className="col-12 p-0">
              <div className="stakinginfo-card w-100">
                <h3>Expected Reward</h3>
                <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>3 Months</p>
                  </li>
                  <li className="list-inline-item">
                    {/* <p>≈ {staked?.length} DJT</p> */}
                    <p>
                      ≈{" "}
                      {(49.89 * 90 * stakeLockPeriod?.s90.length).toFixed(2) +
                        " RTT"}
                    </p>
                  </li>
                </ul>
                <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>6 Months</p>
                  </li>
                  <li className="list-inline-item">
                    <p>
                      ≈{" "}
                      {(61.79 * 180 * stakeLockPeriod?.s180.length).toFixed(2) +
                        " RTT"}
                    </p>
                    {/* <p>{apy.toFixed(2)}%</p> */}
                  </li>
                </ul>
                <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>1 Year</p>
                  </li>
                  <li className="list-inline-item">
                    <p>
                      ≈{" "}
                      {(80.24 * 365 * stakeLockPeriod?.s360.length).toFixed(2) +
                        " RTT"}
                    </p>
                    {/* <p>≈ {apy.toFixed(2)} RTT</p> */}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 p-0">
              <div className="stakinginfo-card stakinginfo-card-claim w-100">
                <h3>Claimable Reward</h3>
                <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>≈ {reward.toFixed(2)} RTT</p>
                  </li>
                  {/* <li className='list-inline-item'><button onClick={selectStackAll} className='btn-Outline claim-btn'>Claim</button></li> */}
                </ul>
              </div>
            </div>
            <div className="col-12 p-0">
              <div className="stakinginfo-card w-100">
                <h3>Staking Info</h3>
                <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>Total NFTs</p>
                  </li>
                  <li className="list-inline-item">
                    {unstaked ? (
                      <p>{unstaked?.length + staked?.length}</p>
                    ) : (
                      <p>0</p>
                    )}
                  </li>
                </ul>
                <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>Staked</p>
                  </li>
                  <li className="list-inline-item">
                    {staked ? <p>{staked?.length}</p> : <p>0</p>}
                  </li>
                </ul>
                <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>Unstaked</p>
                  </li>
                  <li className="list-inline-item">
                    {unstaked ? <p>{unstaked?.length}</p> : <p>0</p>}
                  </li>
                </ul>
                {/* <ul className="list-inline card-item d-flex justify-content-between align-item-center bluegrey">
                  <li className="list-inline-item">
                    <p>Unlinked</p>
                  </li>
                  <li className="list-inline-item">
                    <p>{linked?.length}</p>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div
                className="modal fade"
                id="exampleModalLong1"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
              >
                <ClaimModal cancel={cancel} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div
                className="modal fade"
                id="exampleModalLong2"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
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
                          <h3 className="white modal-heading  text-center">
                            Claim
                          </h3>
                          <div className="pop-content">
                            <div className="row">
                              <div className="col-12 m-auto">
                                <div className="row">
                                  <div className="col-12">
                                    <ul className="list-inline d-flex align-item-center">
                                      <li className="list-inline-item">
                                        <div>
                                          <img
                                            src="/opencanvas-assets/DJT-NFT-staking/pools/popup-icons/signature-icon.svg"
                                            alt=""
                                          />
                                        </div>
                                      </li>
                                      <li className="list-inline-item">
                                        <ul>
                                          <li className="tbold bluegrey">
                                            <p>Signature</p>
                                          </li>
                                          <li>
                                            <p>Sign your transaction</p>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                    <ul>
                                      <li>
                                        {" "}
                                        <p className="text-justify grey pt-4">
                                          IMPORTANT: if, after this stage, the
                                          tranaction is canceled or rejected,
                                          your balance will restore within 24
                                          hours.
                                        </p>
                                      </li>
                                      <li>
                                        <button className="btn-common p-3 mt-4 w-100">
                                          Sign
                                        </button>{" "}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="row ptb20">
                                  <div className="col-12">
                                    <ul className="list-inline d-flex align-item-center">
                                      <li className="list-inline-item">
                                        <div>
                                          <img
                                            src="/opencanvas-assets/DJT-NFT-staking/pools/popup-icons/transaction-fee-icon.svg"
                                            alt=""
                                          />
                                        </div>
                                      </li>
                                      <li className="list-inline-item">
                                        <ul>
                                          <li className="tbold bluegrey">
                                            <p>Transaction Fee</p>{" "}
                                          </li>
                                          <li>
                                            <p>Cover the transaction fee</p>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                    <ul>
                                      <li>
                                        <button
                                          disabled
                                          className="btn-common-white p-3 mt-4  w-100"
                                        >
                                          Pay Fee
                                        </button>{" "}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Stakinginfo;
