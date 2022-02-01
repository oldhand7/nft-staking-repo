const ClaimModal = ({ cancel, mainAction }) => {
  return (
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
              <h3 className="white modal-heading  text-center">Claim</h3>
              <div className="pop-content">
                <p className="text-justify mt-2 grey">
                  When your NFTs are locked and you would like to claim your
                  rewards, you are ONLY able to receive the portion of your
                  rewards equivalent to the rewards that you would have earned
                  from selecting the "No Lock” staking option. Your entire
                  staking reward amount(s) become(s) available upon the
                  completion of the associated staking session(s).
                </p>
                <ul className="bluegrey ptb20">
                  <li>
                    <p>Available upon staking completion</p>
                  </li>
                  <li>
                    <p>≈ $1.17</p>
                  </li>
                  <li className="mt-sm-4 mt-2 pt-2 pt-sm-4 avail-now">
                    <p>Available now</p>
                  </li>
                  <li>
                    <p>≈ $1.17</p>
                  </li>
                </ul>
                <ul className="list-inline btn-div text-center">
                  <li className="list-inline-item">
                    <button onClick={cancel} className="btn-common-white">
                      Cancel
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button onClick={mainAction} className="btn-common">Claim</button>
                  </li>
                </ul>
                <div className="ptb20 text-center">
                  <a className="grey" href="#">
                    By connecting, I accept OpenCanvas Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;
