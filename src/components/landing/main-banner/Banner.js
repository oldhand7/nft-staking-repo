/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import "./banner.scss";
import { useWeb3React } from "@web3-react/core";
import useApprove from "../../../hooks/useApprove";
import UserNft from "./components/userNfts.js";
import { ToastContainer, toast } from "react-toastify";
import { userNfts } from "../../../redux/action/index"
import "react-toastify/dist/ReactToastify.css";
import Stakinginfo from "../stakinginfo/Stakinginfo";
import loadgif from "../../../Assets/loader.svg";

const Banner = () => {
  const { account } = useWeb3React();
  const { Approve } = useApprove();
  const [minted, setMinted] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [nft, setNft] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const appoved = async (e) => {
    if (account) {
      try {
        e.preventDefault();
        setInProcess(true);
        const tx = await Approve();
        if (tx) {
          toast.success("Successfully Approved", {
            position: "top-right",
            autoClose: 2000,
          });
          setMinted(true);
        }
        setInProcess(false);
        window.$("#exampleModalLong2").modal("hide");
      } catch (err) {
        console.log(err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setInProcess(false);
      }
    } else {
      window.$("#exampleModalLong2").modal("hide");
      toast.error("Please Connect to wallet", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (account) {
      setLoader(true);
      var config = {
        method: "get",
        url: `https://deep-index.moralis.io/api/v2/${'0x20F71969406EEa8beE2ad570c8F66935fD361c4a'}/nft/0x1C89f9E644aAa08Dfb762bCe95061ECFC74C37dF?chain=bsc&format=decimal`,
        headers: {
          "x-api-key":
            "8PhWxNHdk3lT8nBPqwYO93tpqCDqHPUbGrPTxxEWcEk3yHaMVyDs5qvVQ7bLEsav",
        },
      };

    //  0x20F71969406EEa8beE2ad570c8F66935fD361c4a

      axios(config)
        .then(function (response) {
          setLoader(false);
          dispatch(userNfts(response.data.result));
          setNft(response.data.result);
        })
        .catch(function (error) {
          setLoader(false);
          setNft([]);
          console.log(error);
        });
    }
  }, [account]);

  return (
    <>
      <section className="main-banner ptb">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mb-5 mb-md-0">
              {loader ? (
                <div className="inner-content d-flex justify-content-center ptb">
                  <img src={loadgif} width="200px" className="" alt="" />
                </div>
              ) : (
                <div>
                  {nft.length === 0 ? (
                    <div className="inner-content text-center ptb">
                      <img
                        src="opencanvas-assets/DJT-NFT-staking/no-nft-illustration.svg"
                        className="img-fluid"
                        alt="nft-img"
                      />
                      <h3>No NFTs found</h3>
                      <p className="bluegrey mt-2">
                        Connect your wallet that has your DJT collection NFTs
                      </p>
                    </div>
                  ) : (
                    <section className="main-unstakedNfts">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12 p-0">
                            <div className="row">
                              <div className="col-12 px-1">
                                <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                                  <h3>My NFTs</h3>
                                </div>
                              </div>
                            </div>
                            <div className="ptb20">
                              <div className="row">
                                { nft.map((item,index)=>{
                                    return <div key={index} className="col-md-3 px-1">
                                        <UserNft item={JSON.parse(item.metadata)} />
                                    </div>
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <div className="">
                <Stakinginfo nft={nft} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
