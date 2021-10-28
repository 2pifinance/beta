import PropTypes from 'prop-types'
import Image from 'next/image'

const AirdropPhases = () => (
  <div className="airdrop-phases row gy-3 gx-xl-7">
    <div id="airdrop-phase-1" className="col">
      <figure className="airdrop-phase-image">
        <div className="airdrop-phase-flag">
          <Image src="/images/airdrop/flag_one.svg" width="187" height="172"
                 alt="Phase 1" layout="responsive" unoptimized={true} />
        </div>

        <div className="airdrop-phase-planet">
          <Image src="/images/airdrop/mars.png" width="170" height="89"
                 alt="Mars" layout="responsive" unoptimized={true} />
        </div>
      </figure>

      <PhaseStatsOne />
    </div>

    <div id="airdrop-phase-2" className="col">
      <figure className="airdrop-phase-image">
        <div className="airdrop-phase-flag">
          <Image src="/images/airdrop/flag_two.svg" width="148" height="127"
                 alt="Phase 2" layout="responsive"  unoptimized={true} />
        </div>

        <div className="airdrop-phase-planet">
          <Image src="/images/airdrop/saturn.png" width="274" height="90"
                  alt="Saturn" layout="responsive" unoptimized={true} />
        </div>
      </figure>

      <PhaseStatsTwo />
    </div>

    <div id="airdrop-phase-3" className="col">
      <figure className="airdrop-phase-image">
        <div className="airdrop-phase-flag">
          <Image src="/images/airdrop/flag_three.svg" width="158" height="131"
                alt="Phase 3" layout="responsive" unoptimized={true} />
        </div>

        <div className="airdrop-phase-planet">
          <Image src="/images/airdrop/neptune.png" width="170" height="80"
                alt="Neptune" layout="responsive" unoptimized={true} />
        </div>
      </figure>

      <PhaseStatsThree />
    </div>
  </div>
)

export default AirdropPhases

const PhaseStatsOne = () => (
  <div className="airdrop-phase-stats">
    <h1 className="airdrop-phase-title">Phase 1</h1>

    <p className="airdrop-phase-subtitle">Not active yet</p>

    <PhaseStat title="TVL" amount="$10 M" />
    <PhaseStat title="Market Cap" amount="$15 M" />
    <PhaseStat title="Users" amount="2,000" />
    <PhaseStat title="Transactions" amount="5,000" />
  </div>
)

const PhaseStatsTwo = () => (
  <div className="airdrop-phase-stats">
    <h1 className="airdrop-phase-title">Phase 2</h1>

    <p className="airdrop-phase-subtitle">Not active yet</p>

    <PhaseStat title="TVL" amount="$100 M" />
    <PhaseStat title="Market Cap" amount="$50 M" />
    <PhaseStat title="Users" amount="9,000" />
    <PhaseStat title="Transactions" amount="15,000" />
  </div>
)

const PhaseStatsThree = () => (
  <div className="airdrop-phase-stats">
    <h1 className="airdrop-phase-title">Phase 3</h1>

    <p className="airdrop-phase-subtitle">Not active yet</p>

    <PhaseStat title="TVL" amount="$200 M" />
    <PhaseStat title="Market Cap" amount="$100 M" />
    <PhaseStat title="Users" amount="12,000" />
    <PhaseStat title="Transactions" amount="18,000" />
  </div>
)

const PhaseStat = ({ title, amount }) => (
  <div className="airdrop-phase-stat">
    <p className="airdrop-phase-stat-text">
      <span className="airdrop-phase-stat-label">{title}</span>
      <span className="airdrop-phase-stat-goal">{amount}</span>
    </p>

    <figure className="airdrop-phase-stat-progress">
      <Image src="/images/airdrop/phase_progress.svg" alt="Progress"
             layout="responsive" height="14" width="254" unoptimized={true} />
    </figure>
  </div>
)

PhaseStat.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
}
