import React, { Fragment } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Layout = props => {
  const { xs, sm, md, lg } = props
  return (<Fragment>
    <Row>
      <Col className="mx-auto mt-4" xs={xs} sm={sm} md={md} lg={lg}>
        {props.children}
      </Col>
    </Row>
    <footer>
      <br />
      <p>Site designed by <a href="https://hollyklose.github.io/">Holly Klose</a></p>
      <p><a href="https://unsplash.com/@mauromora" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from mauro  mora">unsplash-logo by: mauro  mora</a></p>
    </footer>
  </Fragment>
  )
}

export default Layout
