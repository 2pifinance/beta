const Footer = () => (
  <footer className="app-footer container mt-7">
    <div className="d-sm-flex justify-content-between pt-3">
      <div className="text-center d-sm-flex align-items-center mb-3 m-sm-0">
       ©2021 2PI Ltd.
      </div>

      <div className="text-center d-sm-flex align-items-center">
        <span className="d-block d-sm-inline mb-2 m-sm-0">Join the community:</span>

        <ul className="list-inline m-0">
          <li className="list-inline-item mx-3 me-sm-0 ms-sm-3 ms-md-4">
            <a href="https://twitter.com/2piNetwork" target="_blank"
               rel="noreferrer" title="Tweet us!">
              <i className="bi-twitter fs-3"></i>
            </a>
          </li>

          <li className="list-inline-item mx-3 me-sm-0 ms-sm-3 ms-md-4">
            <a href="https://discord.com/invite/h8VG2XcwvT" target="_blank"
               rel="noreferrer" title="Talk with us!">
              <i className="bi-discord fs-3"></i>
            </a>
          </li>

          <li className="list-inline-item mx-3 me-sm-0 ms-sm-3 ms-md-4">
            <a href="https://2pinetwork.medium.com" target="_blank"
               rel="noreferrer" title="Read us!">
              <i className="bi-medium fs-3"></i>
            </a>
          </li>

          <li className="list-inline-item mx-3 me-sm-0 ms-sm-3 ms-md-4">
            <a href="https://github.com/2pinetwork" target="_blank"
               rel="noreferrer" title="Inspect us!">
              <i className="bi-github fs-3"></i>
            </a>
          </li>

          <li className="list-inline-item mx-3 me-sm-0 ms-sm-3 ms-md-4">
            <a href="https://docs.2pi.network" target="_blank"
               rel="noreferrer" title="Learn more about us!">
              <i className="bi-file-text fs-3"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
)

export default Footer
