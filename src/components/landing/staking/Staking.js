import './staking.scss'
import logo from '../../../Assets/bnb-icon.svg'
import logo2 from '../../../Assets/rtt-icon.svg'
import logo3 from '../../../Assets/nft-icon.svg'
import ComingSoon from '../../../Assets/coming-soon.svg'
import {Link} from 'react-router-dom'

function Staking() {
    return (
        <>
            <section className='main-staking ptb'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 px-2">
                            <div className="card main-staking-card">
                                <div className='staking-card-imgBg-div staking-card-imgBg-div2'>
                                    <h4>Earn RTT</h4>
                                    <img src={logo2} alt="" />
                                </div>
                                <div className="card-body">
                                   <ul className='list-inline pt-3 d-flex mt-2 bluegrey justify-content-between align-items-center'>
                                       {/* <li className='list-inline-item'><p>Average Apy</p></li> */}
                                       <li className='list-inline-item'><p>3 Months</p></li>
                                       <li className='list-inline-item'><p>≈ {49.89 * 90}</p></li>
                                   </ul>
                                   <ul className='list-inline d-flex mt-2 bluegrey justify-content-between align-items-center'>
                                       {/* <li className='list-inline-item'><p>Total earning</p></li> */}
                                       <li className='list-inline-item'><p>6 Months</p></li>
                                       <li className='list-inline-item'><p>≈ {61.79 * 180}</p></li>
                                   </ul>
                                   <ul className='list-inline d-flex mt-2 bluegrey justify-content-between align-items-center'>
                                       {/* <li className='list-inline-item'><p>Staked</p></li> */}
                                       <li className='list-inline-item'><p>1 Year</p></li>
                                       <li className='list-inline-item'><p>≈ {80.24 * 365}</p></li>
                                   </ul>
                                   <ul className='list-inline d-flex mt-2 bluegrey justify-content-between align-items-center'>
                                       <li className='list-inline-item'><p></p></li>
                                       <li className='list-inline-item'><p></p></li>
                                   </ul>
                                   <Link to='/staking'> <div className='pt-1-5'> <button className='btn-common p-3 mt-3 w-100'>Start Staking</button> </div> </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className="card main-staking-card">
                                <div className='staking-card-imgBg-div'>
                                    <h4>Earn BNB</h4>
                                    <img src={logo} alt="" />
                                </div>
                                <div className="card-body d-flex justify-content-center">
                                   <img src={ComingSoon} alt="coming-soon" className="p-27"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className="card main-staking-card">
                                <div className='staking-card-imgBg-div staking-card-imgBg-div3'>
                                    <h4>Earn NFT</h4>
                                    <img src={logo3} alt="" />
                                </div>
                                <div className="card-body d-flex justify-content-center">
                                   <img src={ComingSoon} alt="coming-soon" className="p-27"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Staking
