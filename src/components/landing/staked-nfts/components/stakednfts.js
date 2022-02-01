import axios from "axios";
import lock from "../../../../Assets/lock.png";
import "../stakednft.scss";
import React, { useEffect, useState } from "react";

function UnStacked({
  item,
  stackAll,
  selectStake,
  setSelectStake,
  setStackAll,
  unstakeTier,
  lockTime,
  setRend,
  rend,
  setUnstakeTier,
}) {
  const [nftImage, setNftImage] = useState(null);
  const [checkRadio, setCheckRadio] = useState(false);
  const [futureDate, setFutureDate] = useState("");
  const [checkAvailable, setCheckAvailable] = useState(false);

  const changeRadio = () => {
    setUnstakeTier(Number(item.tier));
    let dummArr = selectStake;
    let selectStatus = !checkRadio;
    if (selectStatus) {
      dummArr.push(item);
      setCheckRadio(true);
    } else {
      dummArr = dummArr.filter((i) => {
        return i.tokenId !== item?.tokenId;
      });
      setCheckRadio(false);
    }
    setSelectStake(dummArr);
    setStackAll(false);
    setRend(!rend);
  };

  const handleChange = () => {};

  useEffect(() => {
    if (stackAll) {
      if (item.tier === unstakeTier.toString()) {
        setCheckRadio(true);
      } else {
        setCheckRadio(false);
      }
    }
  }, [stackAll, unstakeTier]);

  useEffect(() => {
    var d = new Date(item.stakeTime);
    if (item.tier === "90") {
      d.setMonth(d.getMonth() + 3);
      // d.setMinutes(d.getMinutes() + 2);
    } else if (item.tier === "180") {
      d.setMonth(d.getMonth() + 6);
      // d.setMinutes(d.getMinutes() + 4);
    } else if (item.tier === "360") {
      d.setMonth(d.getMonth() + 12);
      // d.setMinutes(d.getMinutes() + 6);
    }
    let fd = d.toISOString().split("T")[0];
    setFutureDate(fd);
    // check withdraw

    let newdate = new Date();
    var stakeDate = new Date(d);
    setCheckAvailable(newdate > stakeDate);

    var config = {
      method: "get",
      url: `https://gateway.ipfs.io/ipfs/QmY6qr9qHS3ZY1WV9PcsDFBteRfmgx8nBQMhWK94GYTUyK/${item.tokenId}`,
    };
    axios(config)
      .then(function (response) {
        setNftImage(response.data.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [item]);

  return (
    <div className="w-100">
      <div
        className={
          "card position-relative " +
          (checkAvailable ? "custom-Card-app" : "custom-Card")
        }
      >
        <div className={" " + (checkAvailable ? "succ-lock" : "red-lock")}>
          <div className="d-flex justify-content-start px-2">
            <img height={12} style={{ marginTop: 6 }} src={lock} alt="" />
            <p style={{ marginLeft: 5, fontSize: "14px", marginTop: 2 }}>
              {checkAvailable ? "Unlocked" : "Locked"}
            </p>
          </div>
        </div>
        <div className="img-div position-relative">
          <img
            // src="/opencanvas-assets/DJT-NFT-staking/ff.png"
            src={
              "https://gateway.ipfs.io/ipfs/" +
              nftImage?.slice(7, nftImage.length)
            }
            className="card-img-top img-fluid p-2"
            alt="..."
          />
          <input
            className="form-check-input mt-2 radio-class cursor-pointer"
            type="radio"
            onClick={changeRadio}
            onChange={(e) => handleChange(e.target.value)}
            checked={checkRadio}
            checked={checkAvailable === false ? false : checkRadio}
            disabled={!checkAvailable}
            name={item.tokenId}
            id="exampleRadios1"
            value={item.tokenId}
          />
        </div>
        <div className="card-body p-2">
          <p className="card-text text-sm bluegrey">
            {"DJT #" + item?.tokenId}
          </p>
          <div className="card-ul">
            <ul className="list-inline ">
              <li className="list-inline-item">
                <p>Lock Time</p>
              </li>
              <li className="list-inline-item">
                <p>{lockTime}</p>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <p>Stake Date</p>
              </li>
              <li className="list-inline-item">
                <p>{item.stakeTime.slice(0, 10)}</p>
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                <p>Expiry</p>
              </li>
              <li className="list-inline-item">
                <p>{futureDate}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnStacked;
