import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import Wallet from './wallet'

const Header = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-transparent mt-1">
    <div className="container">
      <Link href="/">
        <a className="navbar-brand me-auto mt-n2 ms-n4 d-none d-lg-inline">
          <Image src={`${props.path ?? '.'}/images/logo.svg`} alt="2PI" width="136" height="108" unoptimized={true} />
        </a>
      </Link>
      <Link href="/">
        <a className="navbar-brand me-auto ms-n3 d-lg-none">
          <Image src={`${props.path ?? '.'}/images/logo.svg`} alt="2PI" width="95" height="76" unoptimized={true} />
        </a>
      </Link>

      <button className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
              aria-controls="menu"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menu">
        <Wallet />

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-lg-2 ms-lg-4 order-1 order-lg-0">
          <li className="nav-item d-none d-lg-inline">
            <Link href="/referrals">
              <a className="nav-link btn btn-outline-primary text-white me-3 mt-3 mt-lg-0">
                Referrals
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/airdrop">
              <a className="nav-link">
                Airdrop
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="https://docs.2pi.network/how-to-guide">
              <a className="nav-link" target="_blank" rel="noreferrer">
                How-to guide
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  path: PropTypes.string
}

export default Header
