import Success from "../../../Assets/success.png";

const SuccessModal = () => {
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
              <h3 className="white modal-heading text-center">Success</h3>
              <div className="pop-content">
                <div className="d-flex justify-content-center">
                  <img src={Success} alt="" />
                </div>
                <p className="mt-2 grey text-center px-3 pt-3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque
                </p>
                <ul className="list-inline btn-div text-center px-5 pt-4">
                  <li className="list-inline-item w-100">
                    <button className="btn-common w-100">Claim</button>
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

export default SuccessModal;
