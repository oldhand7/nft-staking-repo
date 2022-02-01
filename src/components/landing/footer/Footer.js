import React from 'react';
import './footer.scss';
const Footer = () => {
    return (
        <>
           
            <section className="main-footer">
            <hr className="hr-m-0" />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="inner-rights ptb20">
                                <p className="grey">©2021 - OPENCANVAS. All Rights Reserved</p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="inner-rights ptb20">
                               <ul className="list-inline">
                                   <li className="list-inline-item">
                                       <div className="inner-side">
                                           <a className="">Terms of Service</a>
                                       </div>
                                   </li>
                                   <li className="list-inline-item">
                                       <div className="inner-side">
                                           |
                                       </div>
                                   </li>
                                   <li className="list-inline-item">
                                       <div className="inner-side">
                                            <a className="">Privacy Policy</a>
                                       </div>
                                   </li>
                               </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer;
