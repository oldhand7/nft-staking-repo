import { useState } from "react";
import { useSelector } from 'react-redux'
import "./userNfts.scss";
function UnstakedNfts({item}) {

  const [nftImage] = useState(item?.image);
  const ownNfts = useSelector(state => state.UserReducer.ownNfts);

  return (
    <div className="card custom-Card">
      <div className="img-div">
        <img
          // src="/opencanvas-assets/DJT-NFT-staking/image-not-available.png"
          src={'https://ipfs.io/ipfs/'+nftImage?.slice(7,nftImage.length)}
          className="card-img-top img-fluid p-2"
          alt="..."
        />
        <input
          className="form-check-input radio-class"
          type="radio"
          name="exampleRadios"
          id="exampleRadios1"
          value="option1"
        />
      </div>
      <div className="card-body p-2">
        <p className="card-text">
          {item.name}
        </p>
      </div>
    </div>
  );
}

export default UnstakedNfts;
