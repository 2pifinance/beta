import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Drawer from './Drawer'
import WalletButton from './WalletButton'

const Header = () => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container">
        <div className="row flex-fill">
          <div className="col-lg-4 d-flex justify-content-between align-items-center">
            <Link href="/">
              <a className="navbar-brand d-inline-block"><Logo /></a>
            </Link>

            <button type="button" className="navbar-toggler"
                    aria-label="Toggle navigation"
                    aria-controls="app-nav-toggle" aria-expanded="false"
                    onClick={() => setIsOpen(!isOpen)}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="col-lg-8 d-none d-lg-flex align-items-center justify-content-end">
            <SecondaryNav />
            <DesktopPrimaryNav />
          </div>

          <div className="d-lg-none">
            <Drawer active={isOpen}>
              <MobilePrimaryNav />
            </Drawer>
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

    <li className="nav-item">
      <Link href="/airdrop">
        <a className="nav-link">Airdrop</a>
      </Link>
    </li>

    <li className="nav-item d-lg-none">
      <a className="nav-link" target="_blank" rel="noreferrer"
         href="https://docs.2pi.network/how-to-guide">
        Docs
      </a>
    </li>

    <li className="nav-item mt-2">
      <WalletButton className="btn btn-outline-primary" />
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

    <Link href="/airdrop">
      <a className="btn btn-outline-primary py-3">Airdrop</a>
    </Link>

    <a className="btn btn-outline-primary py-3 me-3" target="_blank"
       rel="noreferrer" href="https://docs.2pi.network/how-to-guide">
      Docs
    </a>

    <WalletButton className="btn btn-outline-primary" />
  </div>
)

const SecondaryNav = () => (
  <div>
  </div>
)
