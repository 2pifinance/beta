import PropTypes from 'prop-types'
import { classNames } from '../../lib/html'
import VaultSummary from './VaultSummary'
import VaultPanel from './VaultPanel'
import { useSort, sortVaultsBy } from './utils/sort'

const VaultsTable = ({ vaults, connected, onUpdate }) => {
  const [ sort, sortFor, sortBy ] = useSort('symbol', 'asc')

  vaults = sortVaultsBy(vaults, sort.column, sort.direction !== 'desc')

  return (
    <Table>
      <TableHeader>
        <ColHeader sort={sortFor('symbol')} onSort={sortBy('symbol')}>
          Vault name
        </ColHeader>

        {(connected) &&
          <ColHeader sort={sortFor('balance')} onSort={sortBy('balance')}>
            Balance
          </ColHeader>
        }

        {(connected) &&
          <ColHeader sort={sortFor('deposited')} onSort={sortBy('deposited')}>
            Deposited
          </ColHeader>
        }

        <ColHeader sort={sortFor('apy')} onSort={sortBy('apy')}>
          <abbr title="Annual Percentage Yield">APY</abbr>
        </ColHeader>

        <ColHeader sort={sortFor('daily')} onSort={sortBy('daily')}>
          Daily
        </ColHeader>

        <ColHeader sort={sortFor('tvl')} onSort={sortBy('tvl')}>
          <abbr title="Total Value Locked">TVL</abbr>
        </ColHeader>

        <ColHeader />
      </TableHeader>

      {vaults.map(vault => (
        <Row key={vault.id}>
          <VaultSummary vault={vault} connected={connected} />

          <div className="collapse" id={`vault-panel-${vault.id}`}>
            <VaultPanel vault={vault} connected={connected} onUpdate={onUpdate} />
          </div>
        </Row>
      ))}
    </Table>
  )
}

VaultsTable.propTypes = {
  vaults:    PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func
}

export default VaultsTable



// -- TABLE HELPERS --

const Table = ({ children }) => (
  <div role="grid" className="vaults-table">{children}</div>
)

Table.propTypes = {
  children: PropTypes.node
}

const TableHeader = ({ children }) => (
  <div role="row" className="vaults-table-header d-none d-lg-block">
    <div className="row">{children}</div>
  </div>
)

TableHeader.propTypes = {
  children: PropTypes.node
}

const ColHeader = ({ sort, onSort, children }) => {
  const isAsc  = (sort === 'asc')
  const isDesc = (sort === 'desc')

  const ariaSort
    = (isAsc)  ? 'ascending'
    : (isDesc) ? 'descending'
    : 'none'

  const ascClassNames = classNames({
    'vaults-table-sort-asc': true,
    'is-active': isAsc
  })

  const descClassNames = classNames({
    'vaults-table-sort-desc': true,
    'is-active': isDesc
  })

  if (! children) {
    return <div role="columnheader" className="vaults-table-colheader col"></div>
  }

  return (
    <div role="columnheader" aria-sort={ariaSort}
         className="vaults-table-colheader col py-3 px-5">
      <span onClick={() => onSort(isAsc ? 'desc' : 'asc')}>
        {children}
      </span>

      <span className="vaults-table-sort">
        <i className={ascClassNames} onClick={() => onSort('asc')}></i>
        <i className={descClassNames} onClick={() => onSort('desc')}></i>
      </span>
    </div>
  )
}

ColHeader.propTypes = {
  sort:     PropTypes.string,
  onSort:   PropTypes.func,
  children: PropTypes.node
}

const Row = ({ children }) => (
  <div role="row" className="vaults-table-row">{children}</div>
)

Row.propTypes = {
  children: PropTypes.node
}
