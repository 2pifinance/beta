import Image from 'next/image'
import { useSelector } from 'react-redux'
import { SUPPORTED_CHAINS } from '../data/constants'
import { selectChainId } from '../features/walletSlice'

const networkName = chainId => {
  const names = {
    137:   'Polygon',
    1337:  'Local',
    80001: 'Polygon test'
  }

  return names[chainId] || 'Unsupported network'
}

const networkLogo = chainId => {
  const logos = {
    137:   'polygon.svg',
    1337:  'localhost.svg',
    80001: 'polygon.svg'
  }

  return logos[chainId] || 'unsupported.svg'
}

const Network = () => {
  const chainId = useSelector(selectChainId)
  const network = networkName(chainId)
  const style   = SUPPORTED_CHAINS.includes(chainId) ? 'primary' : 'danger'
  const margin  = chainId === 80001 ? 'mt-3' : 'mt-5'

  return (
    <div className={`d-flex mt-lg-0 ${margin}`}>
      <div className={`card bg-blur border-${style}`}>
        <div className="d-flex align-items-center card-body py-2">
          <Image src={`/images/networks/${networkLogo(chainId)}`} alt={network} width="32" height="32" unoptimized={true} />
          <span className="ms-3">
            {network}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Network
