import React, { useEffect, useState } from "react";

function UnLinked({ item, setSelectUnlink, selectUnlink, linkall, setLinkAll, mainItem }) {
  const [nftImage] = useState(item?.image);
  const [checkRadio, setCheckRadio] = useState(false);

  const changeRadio = () => {
    let dummArr = selectUnlink;
    let selectStatus = !checkRadio;
    if(selectStatus){
      dummArr.push(mainItem);
      setCheckRadio(true);
    }else{
      dummArr = dummArr.filter((i)=>{
        return i.token_id !== mainItem.token_id;
      })
      setCheckRadio(false);
    }
    setSelectUnlink(dummArr);
    setLinkAll(false);
  }

  const handleChange = () => {

  }

  useEffect(()=>{
    if(linkall){
      setCheckRadio(true);
    }
  },[linkall])

  return (
    <div className="w-100">
      <div className="card custom-Card">
        <div className="img-div">
          <img
            // src="/opencanvas-assets/DJT-NFT-staking/ff.png"
            src={"https://ipfs.io/ipfs/" + nftImage?.slice(7, nftImage.length)}
            className="card-img-top img-fluid p-2"
            alt="..."
          />
          <input
            className="form-check-input radio-class cursor-pointer"
            type="radio"
            onClick={changeRadio}
            onChange={(e)=>handleChange(e.target.value)}
            checked={checkRadio}
            name={item.name}
            id="exampleRadios1"
            value={item.name}
          />
        </div>
        <div className="card-body p-2">
          <p className="card-text text-sm bluegrey">{item.name}</p>
        </div>
      </div>
    </div>
  );
}

export default UnLinked;
