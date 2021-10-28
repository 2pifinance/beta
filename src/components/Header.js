import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WalletButton from './WalletButton'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container">
        <div className="row flex-fill">
          <div className="col-lg-4 d-flex justify-content-between align-items-center">
            <Link href="/">
              <a className="navbar-brand d-inline-block"><Logo /></a>
            </Link>

            <button type="button" className="navbar-toggler"
                    data-bs-toggle="collapse" data-bs-target="#app-mobile-nav"
                    aria-controls="app-nav-toggle" aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="col-lg-8 d-none d-lg-flex align-items-center justify-content-end">
            <SecondaryNav />
            <DesktopPrimaryNav />
          </div>

          <div className="d-lg-none">
            <div id="app-mobile-nav" className="collapse navbar-collapse">
              <MobilePrimaryNav />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header

const Logo = () => (
  <React.Fragment>
    <figure className="d-inline-block d-lg-none m-0">
      <Image src="/images/logo.svg" alt="2PI" width="95" height="76" unoptimized={true} />
    </figure>

    <figure className="d-none d-lg-inline-block m-0">
      <Image src="/images/logo.svg" alt="2PI" width="136" height="108" unoptimized={true} />
    </figure>
  </React.Fragment>
)

const MobilePrimaryNav = () => (
  <ul className="navbar-nav ms-2 mb-5">
    <li className="nav-item">
      <Link href="/">
        <a className="nav-link">Vaults</a>
      </Link>
    </li>

    <li className="nav-item">
      <Link href="/referrals">
        <a className="nav-link">Referrals</a>
      </Link>
    </li>

    <li className="nav-item d-lg-none">
      <a className="nav-link" target="_blank" rel="noreferrer"
         href="https://docs.2pi.network/how-to-guide">
        Docs
      </a>
    </li>

    <li className="nav-item mt-2">
      <WalletButton />
    </li>
  </ul>
)

const DesktopPrimaryNav = () => (
  <div className="btn-group" role="group">
    <Link href="/">
      <a className="btn btn-outline-primary py-3">Vaults</a>
    </Link>

    <Link href="/referrals">
      <a className="btn btn-outline-primary py-3">Referrals</a>
    </Link>

    <a className="btn btn-outline-primary py-3 me-3" target="_blank"
       rel="noreferrer" href="https://docs.2pi.network/how-to-guide">
      Docs
    </a>

    <WalletButton />
  </div>
)

const SecondaryNav = () => (
  <div>
  </div>
)
