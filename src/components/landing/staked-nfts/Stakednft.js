import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Environment from "../../../utils/Environment";
import "./stakednft.scss";
import RightPool from "./components/rightPool";
import { useWeb3React } from "@web3-react/core";
import { userNfts } from "../../../redux/action/index";
import NFTModal from "../models/linkNFTModal";
import Stacked from "./components/stakednfts";
import UnStacked from "./components/unstakednfts";
import UnLinked from "./components/unlinkednfts";
import loadgif from "../../../Assets/loader.svg";
import CheckNfts from "../../../hooks/CheckNfts";
import CheckApproveAllNfts from "../../../hooks/CheckApproveAllNfts";
import ApprovedForSingle from "../../../hooks/GetApproved";
import StakeForSingle from "../../../hooks/getStake";
import UnStakeForSingle from "../../../hooks/getUnStake";
import ApprovedForAll from "../../../hooks/getApprovedAll";
import StakeForAll from "../../../hooks/getStakeAll";
import UnStakeForAll from "../../../hooks/getUnStakeAll";

function Stakednft() {
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const [nft, setNft] = useState([]);
  const [loader, setLoader] = useState(false);
  const [staked, setStaked] = useState([]);
  const [unstaked, setUnstaked] = useState();
  const [linked, setLinked] = useState([]);
  const [rend, setRend] = useState(false);
  const [linkAll, setLinkAll] = useState(false);
  const [stackAll, setStackAll] = useState(false);
  const [unstackAll, setUnStackAll] = useState(false);
  const [selectUnlink, setSelectUnlink] = useState([]);
  const [selectUnStake, setSelectUnStake] = useState([]);
  const [selectStake, setSelectStake] = useState([]);
  const [unstakeTier, setUnstakeTier] = useState(90);
  const [loaderMessage, setLoaderMessage] = useState("");
  const [approved, setApproved] = useState(false);
  const [stakeLockPeriod, setStakeLockPeriod] = useState({
    s90: [],
    s180: [],
    s360: [],
  });
  const { CategoriesNft } = CheckNfts();
  const { ApproveAllNft } = CheckApproveAllNfts();
  const { Approve } = ApprovedForSingle();
  const { Stake } = StakeForSingle();
  const { ApproveAll } = ApprovedForAll();
  const { StakeAll } = StakeForAll();
  const { UnStakeAll } = UnStakeForAll();
  const { UnStake } = UnStakeForSingle();

  const lockModalSingle = () => {
    if (selectUnStake.length > 0) {
      window.$("#exampleModalLong3").modal("show");
    }
  };

  useEffect(() => {
    let dum90 = [];
    let dum180 = [];
    let dum360 = [];
    if (staked.length > 0) {
      for (let i of staked) {
        let tier = Number(i.tier);
        if (tier === 360) {
          dum360.push(i);
        } else if (tier === 180) {
          dum180.push(i);
        } else if (tier === 90) {
          dum90.push(i);
        }
      }
      setStakeLockPeriod({ s90: dum90, s180: dum180, s360: dum360 });
    }
  }, [staked]);

  const cancel = () => {
    window.$("#exampleModalLong3").modal("hide");
  };

  const lockModalMulti = () => {
    window.$("#unstackModalLong3").modal("show");
  };

  // const lockModalSingleStack = () => {
  //   if (selectStake.length > 0) {
  //     window.$("#stackModalSingleLong3").modal("show");
  //   }
  // };

  // const lockModalMultiStack = () => {
  //   window.$("#stackModalLong3").modal("show");
  // };

  const cancelUnStack = () => {
    window.$("#unstackModalLong3").modal("hide");
  };

  const cancelStack = () => {
    window.$("#stackModalLong3").modal("hide");
  };

  // const cancelModalSingleStack = () => {
  //   window.$("#stackModalSingleLong3").modal("hide");
  // };

  // const GetLinkSelected = useCallback(async () => {
  //   for (let _u of selectUnlink) {
  //     const res = await Approve(account, _u.token_id);
  //     await getNftsdata();
  //   }
  // });

  useEffect(async () => {
    checkLink();
  }, [account]);

  const checkLink = async () => {
    if (account) {
      const initialAllCheck = await ApproveAllNft();
      await setApproved(initialAllCheck);
    }
  };

  const approveAll = useCallback(async (e) => {
    setLoader(true);
    setLoaderMessage("Linking NFT's");
    e.preventDefault();
    const res = await ApproveAll(account);
    if (res?.code === 4001) {
      await toast("NFT's linked successfully!");
    } else if (res?.code) {
      await toast("Link failed!");
    } else {
      await toast("Link Status updated!");
    }
    await checkLink();
    await setLoader(false);
    await setLoaderMessage("");
  });

  const GetStakeSelected = useCallback(async (locktime) => {
    cancel();
    if (selectUnStake.length > 1) {
      setLoader(true);
      setLoaderMessage(
        "Please check your wallet, Transaction is under process"
      );
      let tokenIDS = [];
      for (let i of selectUnStake) {
        tokenIDS.push(i.token_id);
      }
      cancelUnStack();
      const res = await StakeAll(tokenIDS, locktime);
      if (res?.code === 4001) {
        await toast("Transaction rejected by user!");
      } else if (res?.code) {
        await toast("Transaction failed!");
      } else {
        await toast("Transaction Status updated!");
        if (unstaked?.length > 0) {
          let dummArr = unstaked;
          for (let it of selectUnStake) {
            dummArr = dummArr.filter((i) => {
              return i.token_id !== it.token_id;
            });
          }
          await setUnstaked(dummArr);
        }
      }
      await setSelectStake([]);
      await getStakedNfts();
      // await getNftsdata();
      await setLoader(false);
      await setLoaderMessage("");
    } else {
      for (let _u of selectUnStake) {
        setLoader(true);
        setLoaderMessage(
          "Please check your wallet, Transaction is under process"
        );
        cancelUnStack();
        const res = await Stake(_u.token_id, locktime);
        if (res?.code === 4001) {
          await toast("Transaction rejected by user!");
        } else if (res?.code) {
          await toast("Transaction failed!");
        } else {
          await toast("Transaction Status updated!");
          if (unstaked?.length > 0) {
            let dummArr = unstaked;
            for (let it of selectUnStake) {
              dummArr = dummArr.filter((i) => {
                return i.token_id !== it.token_id;
              });
            }
            await setUnstaked(dummArr);
            await setSelectUnStake([]);
          }
        }
        await setSelectStake([]);
        // await getNftsdata();
        await setLoader(false);
        await getStakedNfts();
        await setLoaderMessage("");
      }
    }
  });

  const GetUnStakeSelected = useCallback(async (locktime) => {
    if (selectStake.length > 1) {
      setLoader(true);
      setLoaderMessage(
        "Please check your wallet, Transaction is under process"
      );
      let tokenIDS = [];
      for (let i of selectStake) {
        if (unstakeTier.toString() === i.tier) {
          tokenIDS.push(i.tokenId);
        }
      }
      cancelStack();
      const res = await UnStakeAll(tokenIDS, locktime);
      await setSelectStake([]);
      await getNftsdata();
      await getStakedNfts();
      await setLoader(false);
      await setLoaderMessage(false);
    } else {
      for (let _u of selectStake) {
        setLoader(true);
        setLoaderMessage(
          "Please check your wallet, Transaction is under process"
        );
        const res = await UnStake(_u.tokenId, locktime);
        if (res?.code === 4001) {
          await toast("Transaction rejected by user!");
        } else if (res?.code) {
          await toast("Transaction failed!");
        } else {
          await toast("Transaction Status updated!");
        }
        await getStakedNfts();
        await setSelectStake([]);
        await getNftsdata();
        await setLoaderMessage("");
        await setLoader(false);
      }
    }
  });

  const getStackAll = async (lockTime) => {
    if (unstackAll) {
      setLoader(true);
      setLoaderMessage(
        "Please check your wallet, Transaction is under process"
      );
      let tokenIDS = [];
      for (let i of unstaked) {
        tokenIDS.push(i.token_id);
      }
      cancelUnStack();
      const res = await StakeAll(tokenIDS, lockTime);
      if (res?.code === 4001) {
        await toast("Transaction rejected by user!");
      } else if (res?.code) {
        await toast("Transaction failed!");
      } else {
        await toast("Transaction Status updated!");
      }
      await getStakedNfts();
      await setSelectStake([]);
      await getNftsdata();
      await setLoaderMessage("");
    }
  };

  const getUnStackAll = async (lockTime) => {
    if (stackAll) {
      setLoader(true);
      setLoaderMessage(
        "Please check your wallet, Transaction is under process"
      );
      let tokenIDS = [];
      for (let i of staked) {
        if (unstakeTier.toString() === i.tier) {
          tokenIDS.push(i.tokenId);
        }
      }
      cancelStack();
      const res = await UnStakeAll(tokenIDS, lockTime);
      if (res?.code === 4001) {
        await toast("Transaction rejected by user!");
      } else if (res?.code) {
        await toast("Transaction failed!");
      } else {
        await toast("Transaction Status updated!");
      }
      await getNftsdata();
      await getStakedNfts();
      await setLoader(false);
      await setLoaderMessage(false);
    }
  };

  const selectUnStackAll = () => {
    if (unstackAll) {
      lockModalMulti();
    } else {
      setUnStackAll(true);
    }
  };

  const selectStackAll = (tier) => {
    if (stackAll && unstakeTier === tier) {
      getUnStackAll(tier);
    } else {
      setUnstakeTier(tier);
      let tierStak = staked.filter((_i) => {
        var d = new Date(_i.stakeTime);
        let check = false;
        if (_i.tier === "90") {
          d.setMonth(d.getMonth() + 3);
          // d.setMinutes(d.getMinutes() + 2);
        } else if (_i.tier === "180") {
          d.setMonth(d.getMonth() + 6);
          // d.setMinutes(d.getMinutes() + 4);
        } else if (_i.tier === "360") {
          d.setMonth(d.getMonth() + 12);
          // d.setMinutes(d.getMinutes() + 6);
        }
        d = d.toISOString().split("T")[0];
        // check withdraw
        let newdate = new Date();
        var stakeDate = new Date(d);
        check = newdate > stakeDate;
        if (_i.tier === tier.toString() && check === true) {
          return _i;
        }
      });
      setSelectStake(tierStak);
      if (tierStak.length > 0) {
        setStackAll(true);
      }
    }
  };

  useEffect(() => {
    if (linkAll) {
      setSelectUnlink(linked);
    }
  }, [linkAll]);

  useEffect(() => {
    if (unstackAll) {
      setSelectUnStake(unstaked);
    }
  }, [unstackAll]);

  useEffect(() => {
    if (account) {
      getStakedNfts();
    }
  }, [account]);

  const getStakedNfts = () => {
    // http://192.168.18.40:6500/getStaked
    axios
      .post("https://api.opencanvas.app/getStaked", {
        address: account,
      })
      .then((res) => {
        setStaked(res.data);
      })
      .catch((err) => {
        return false;
      });
  };

  const contract_address = "0x1C89f9E644aAa08Dfb762bCe95061ECFC74C37dF";

  const getNftsdata = async () => {
    if (account) {
      setLoader(true);
      var config = {
        method: "get",
        url: `https://deep-index.moralis.io/api/v2/${account}/nft/${contract_address}?chain=bsc&format=decimal`,
        headers: {
          "x-api-key":
            "8PhWxNHdk3lT8nBPqwYO93tpqCDqHPUbGrPTxxEWcEk3yHaMVyDs5qvVQ7bLEsav",
        },
      };
      axios(config)
        .then(function (response) {
          dispatch(userNfts(response.data.result));
          setNft(response.data.result);
          checkCondition(response.data.result);
        })
        .catch(function (error) {
          setLoader(false);
          setNft([]);
          console.log(error);
        });
    }
  };

  const checkCondition = async (resArr) => {
    const initialAllCheck = await ApproveAllNft();
    if (!initialAllCheck) {
      let dumStaked = [];
      let dumUnstaked = [];
      let dumLinked = [];
      for (let i of resArr) {
        const address = await CategoriesNft(i.token_id);
        if (address === Environment.stakingContractAddress) {
          let existing = dumStaked.filter((_o) => {
            return _o.token_id === i.token_id;
          });
          if (existing.length === 0) {
            dumUnstaked.push(i);
          }
        } else if (address !== Environment.stakingContractAddress) {
          let existing = dumLinked.filter((_o) => {
            return _o.token_id === i.token_id;
          });
          if (existing.length === 0) {
            dumLinked.push(i);
          }
        }
      }
      // to rerender
      setRend(!rend);
      setLoader(false);
      setUnstaked(dumUnstaked);
      setLinked(dumLinked);
    } else {
      setLoader(false);
      setUnstaked(resArr);
    }
  };

  useEffect(() => {
    getNftsdata();
  }, [account]);

  return (
    <>
      <section className="main-stakednft ptb">
        <div className="container">
          <div className="row">
            {loader ? (
              <div className="inner-content col-md-8 ptb">
                <div className="d-flex justify-content-center pt-3">
                  <img
                    src={loadgif}
                    className="ms-5"
                    width="200px"
                    className=""
                    alt=""
                  />
                </div>
                <p className="text-center">{loaderMessage}</p>
              </div>
            ) : (
              <div className="col-md-8">
                {nft.length === 0 && staked.length === 0 ? (
                  <div>
                    {account ? (
                      <div>
                        <div className="row">
                          <div className="col-12 px-1">
                            <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                              <h3>Staked NFTs</h3>
                              <ul className="list-inline"></ul>
                            </div>
                          </div>
                        </div>
                        <div className="pb-lg-5">
                          <div className="inner-content text-center pt-3 pt-lg-5 pb-5">
                            <img
                              src="opencanvas-assets/DJT-NFT-staking/no-nft-illustration.svg"
                              className="img-fluid"
                              alt="nft-img"
                            />
                            <h3>You do not have any staked NFTs</h3>
                            <p className="bluegrey mt-2">
                              Stake some NFTs from your unstaked NFTs section to
                              start earning rewards
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 px-1">
                            <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                              <h3>Unstaked NFTs</h3>
                              <ul className="list-inline"></ul>
                            </div>
                          </div>
                        </div>
                        <div className="pb-lg-5 d-flex justify-content-center w-100">
                          <div className="inner-content text-center pt-3 pt-lg-5 pb-5">
                            <img
                              src="opencanvas-assets/DJT-NFT-staking/no-nft-illustration.svg"
                              className="img-fluid"
                              alt="nft-img"
                            />
                            <h3>You do not have any unstaked NFTs</h3>
                            {staked?.length === 0 && (
                              <p className="bluegrey mt-2">
                                Link your DJT NFTs after connecting your wallet
                                to start staking
                              </p>
                            )}
                            {account && (
                              <div className="pt-4">
                                {!approved && (
                                  <button
                                    type="button"
                                    onClick={approveAll}
                                    className="btn-common br-5 my-2 my-sm-0 mr-2"
                                  >
                                    LINK DJT NFTS
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="pb-lg-5">
                        <div className="inner-content text-center pt-3 pt-lg-5 pb-5">
                          <img
                            src="opencanvas-assets/DJT-NFT-staking/no-nft-illustration.svg"
                            className="img-fluid"
                            alt="nft-img"
                          />
                          <h3>No NFTs found</h3>
                          <p className="bluegrey mt-2">
                            Connect your wallet that has your DJT collection
                            NFTs
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-0">
                    <div className="row">
                      <div className="col-12 px-1">
                        <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                          <h3>Staked NFTs</h3>
                          <ul className="list-inline"></ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      {staked.length === 0 ? (
                        <div className="pb-lg-5">
                          <div className="inner-content text-center pt-3 pt-lg-5 pb-5">
                            <img
                              src="opencanvas-assets/DJT-NFT-staking/no-nft-illustration.svg"
                              className="img-fluid"
                              alt="nft-img"
                            />
                            <h3>You do not have any staked NFTs</h3>
                            <p className="bluegrey mt-2">
                              Stake some NFTs from your unstaked NFTs section to
                              start earning rewards
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {stakeLockPeriod.s90.length > 0 && (
                            <div className="ptb20">
                              <div className="row">
                                <div className="col-12 px-1">
                                  <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                                    <p className="bluegrey900 text-lg font-weight-bold pt-1 pb-2">
                                      3 Months
                                    </p>
                                    <ul className="list-inline">
                                      <li className="list-inline-item">
                                        {selectStake.length > 0 &&
                                        unstakeTier === 90 ? (
                                          <button
                                            onClick={() =>
                                              GetUnStakeSelected(90)
                                            }
                                            className="btn-Outline"
                                          >
                                            UnStake Selected
                                          </button>
                                        ) : (
                                          <div></div>
                                        )}
                                      </li>
                                      <li className="list-inline-item">
                                        <button
                                          onClick={() => selectStackAll(90)}
                                          className="btn-Outline"
                                        >
                                          {/* Select All */}
                                          {stackAll && unstakeTier === 90
                                            ? "UnStake All"
                                            : "Select All"}
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row pt-3">
                                {stakeLockPeriod.s90.map((item, index) => {
                                  return (
                                    <div className="col-md-3 px-1" key={index}>
                                      <Stacked
                                        setUnstakeTier={setUnstakeTier}
                                        lockTime={"3 Months"}
                                        setRend={setRend}
                                        rend={rend}
                                        unstakeTier={unstakeTier}
                                        stackAll={stackAll ? stackAll : null}
                                        setStackAll={setStackAll}
                                        selectStake={selectStake}
                                        setSelectStake={setSelectStake}
                                        item={item}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {stakeLockPeriod.s180.length > 0 && (
                            <div className="">
                              <div className="row">
                                <div className="col-12 px-1">
                                  <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                                    <p className="bluegrey900 text-lg font-weight-bold pt-1 pb-2">
                                      6 Months
                                    </p>
                                    <ul className="list-inline">
                                      <li className="list-inline-item">
                                        {selectStake.length > 0 &&
                                        unstakeTier === 180 ? (
                                          <button
                                            onClick={() =>
                                              GetUnStakeSelected(180)
                                            }
                                            className="btn-Outline"
                                          >
                                            UnStake Selected
                                          </button>
                                        ) : (
                                          <div></div>
                                        )}
                                      </li>
                                      <li className="list-inline-item">
                                        <button
                                          onClick={() => selectStackAll(180)}
                                          className="btn-Outline"
                                        >
                                          {stackAll && unstakeTier === 180
                                            ? "UnStake All"
                                            : "Select All"}
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row pt-3">
                                {stakeLockPeriod.s180.map((item, index) => {
                                  return (
                                    <div className="col-md-3 px-1" key={index}>
                                      <Stacked
                                        lockTime={"6 Months"}
                                        setUnstakeTier={setUnstakeTier}
                                        setRend={setRend}
                                        rend={rend}
                                        unstakeTier={unstakeTier}
                                        stackAll={stackAll ? stackAll : null}
                                        setStackAll={setStackAll}
                                        selectStake={selectStake}
                                        setSelectStake={setSelectStake}
                                        item={item}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {stakeLockPeriod.s360.length > 0 && (
                            <div className="ptb20">
                              <div className="row">
                                <div className="col-12 px-1">
                                  <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                                    <p className="bluegrey900 text-lg font-weight-bold pt-1 pb-2">
                                      1 Year
                                    </p>
                                    <ul className="list-inline">
                                      <li className="list-inline-item">
                                        {selectStake.length > 0 &&
                                        unstakeTier === 360 ? (
                                          <button
                                            onClick={() =>
                                              GetUnStakeSelected(360)
                                            }
                                            className="btn-Outline"
                                          >
                                            UnStake Selected
                                          </button>
                                        ) : (
                                          <div></div>
                                        )}
                                      </li>
                                      <li className="list-inline-item">
                                        <button
                                          onClick={() => selectStackAll(360)}
                                          className="btn-Outline"
                                        >
                                          {stackAll && unstakeTier === 360
                                            ? "UnStake All"
                                            : "Select All"}
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row pt-3">
                                {stakeLockPeriod.s360.map((item, index) => {
                                  return (
                                    <div className="col-md-3 px-1" key={index}>
                                      <Stacked
                                        setUnstakeTier={setUnstakeTier}
                                        lockTime={"1 Year"}
                                        unstakeTier={unstakeTier}
                                        setRend={setRend}
                                        rend={rend}
                                        stackAll={stackAll ? stackAll : null}
                                        setStackAll={setStackAll}
                                        selectStake={selectStake}
                                        setSelectStake={setSelectStake}
                                        item={item}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="row pt-3">
                      <div className="col-md-12 mb-5 mb-md-0 p-0">
                        <div className="row">
                          <div className="col-12 px-1">
                            <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                              <h3>Unstaked NFTs</h3>
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  {selectUnStake.length > 0 && (
                                    <button
                                      onClick={lockModalSingle}
                                      className="btn-Outline"
                                    >
                                      Stake Selected
                                    </button>
                                  )}
                                </li>
                                {unstaked?.length > 0 && (
                                  <li className="list-inline-item">
                                    <button
                                      onClick={selectUnStackAll}
                                      className="btn-Outline"
                                    >
                                      {unstackAll ? "Stake All" : "Select All"}
                                    </button>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="ptb20">
                          <div className="row">
                            {unstaked?.length > 0 ? (
                              <>
                                {unstaked?.map((item, index) => {
                                  return (
                                    <div
                                      className={
                                        " " +
                                        (item.metadata ? "col-md-3 px-1" : "")
                                      }
                                      key={index}
                                    >
                                      {item.metadata && (
                                        <UnStacked
                                          unstackAll={
                                            unstackAll ? unstackAll : null
                                          }
                                          setUnStackAll={setUnStackAll}
                                          selectUnStake={selectUnStake}
                                          setRend={setRend}
                                          rend={rend}
                                          setSelectUnStake={setSelectUnStake}
                                          mainItem={item}
                                          item={JSON.parse(item.metadata)}
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </>
                            ) : (
                              <div className="d-flex justify-content-center w-100">
                                <div className="inner-content text-center pt-3 pt-lg-5 pb-5">
                                  <img
                                    src="opencanvas-assets/DJT-NFT-staking/no-nft-illustration.svg"
                                    className="img-fluid"
                                    alt="nft-img"
                                  />
                                  <h3>You do not have any unstaked NFTs</h3>
                                  {staked?.length === 0 && (
                                    <p className="bluegrey mt-2">
                                      Link your DJT NFTs after connecting your
                                      wallet to start staking
                                    </p>
                                  )}
                                  {account && (
                                    <div className="pt-4">
                                      {!approved && (
                                        <button
                                          type="button"
                                          onClick={approveAll}
                                          className="btn-common br-5 my-2 my-sm-0 mr-2"
                                        >
                                          LINK DJT NFTS
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row pt-3">
                      <div className="col-md-12 mb-5 mb-md-0 p-0">
                        <div className="row">
                          <div className="col-12 px-1">
                            <div className="btns-div d-flex justify-content-between flex-wrap align-items-center">
                              <h3>Unlinked NFTs</h3>
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <button
                                    onClick={GetLinkSelected}
                                    className="btn-Outline"
                                  >
                                    Link Selected
                                  </button>
                                </li>
                                <li className="list-inline-item">
                                  <button
                                    onClick={() => approveAll()}
                                    className="btn-Outline"
                                  >
                                    {linkAll ? "Get Approved All" : "Link All"}
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="ptb20">
                          <div className="row">
                            {linked?.length !== 0 &&
                              linked?.map((item, index) => {
                                return (
                                  <div
                                    className={
                                      " " +
                                      (item.metadata ? "col-md-3 px-1" : "")
                                    }
                                    key={index}
                                  >
                                    {item.metadata && (
                                      <UnLinked
                                        linkall={linkAll ? linkAll : null}
                                        setLinkAll={setLinkAll}
                                        selectUnlink={selectUnlink}
                                        setSelectUnlink={setSelectUnlink}
                                        mainItem={item}
                                        item={JSON.parse(item.metadata)}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
            )}

            <div className="col-md-4">
              <RightPool
                // selectStackAll={selectStackAll}
                stakeLockPeriod={stakeLockPeriod}
                nft={nft}
                staked={staked}
                unstaked={unstaked}
                linked={linked}
              />
            </div>
          </div>
        </div>
      </section>
      {/* single link nft modal here */}
      <div
        className="modal fade"
        id="exampleModalLong3"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <NFTModal
          title="Stake"
          length={selectUnStake?.length}
          stakes={selectUnStake}
          cancel={cancel}
          GetStakeSelected={GetStakeSelected}
        />
      </div>
      {/* multi link unstack nft modal here */}
      <div
        className="modal fade"
        id="unstackModalLong3"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <NFTModal
          title="Stake All"
          length={selectUnStake?.length}
          stakes={selectUnStake}
          cancel={cancelUnStack}
          GetStakeSelected={getStackAll}
        />
      </div>

      {/* Toaster */}
      <ToastContainer />

      {/* stack to unstack single nft modal here */}
      {/* <div
        className="modal fade"
        id="stackModalSingleLong3"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <NFTModal
          title="UnStake"
          cancel={cancelModalSingleStack}
          GetStakeSelected={GetUnStakeSelected}
        />
      </div> */}
      {/* stack to unstack all nft modal here */}
      {/* <div
        className="modal fade"
        id="stackModalLong3"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <NFTModal
          title="UnStake All"
          cancel={cancelStack}
          GetStakeSelected={getUnStackAll}
        />
      </div> */}
    </>
  );
}

export default Stakednft;
