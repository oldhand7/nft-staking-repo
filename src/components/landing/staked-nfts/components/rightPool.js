import React from "react";
import Stakinginfo from "../../stakinginfo/Stakinginfo";
import logo2 from '../../../../Assets/rtt-icon.svg'

function Pool({staked, unstaked, linked, nft, stakeLockPeriod}) {

  return (
    <div className="">
      <div className="row">
        <div className="side-div-pool w-100">
          <div className=" p-0 mb-3">
            <div className=" w-100 d-flex poolDiv justify-content-between align-items-center">
              <p>Pool</p>
              <ul className="list-inline">
                <li className="list-inline-item d-flex justify-content-center align-items-center">
                  <img
                    className="img-fluid w-50"
                    src={logo2}
                    alt=""
                  />
                  <p className="ml-1">RTT</p>
                </li>
                {/* <li className="list-inline-item"></li> */}
              </ul>
            </div>
          </div>
          {/* <div className=" p-0 mb-3">
                    <button className="btn-Outline w-100">SWITCH POOL</button>
                  </div> */}
        </div>
      </div>
      <div className="">
        <Stakinginfo stakeLockPeriod={stakeLockPeriod} nft={nft} staked={staked} unstaked={unstaked} linked={linked} />
      </div>
    </div>
  );
}

export default Pool;
