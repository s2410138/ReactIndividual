import * as Bootcomp from '../Helpers/react_bootstrapComp'

function AppHeader() {
  return (
      <Bootcomp.Navbar bg="dark" variant="dark">
      <Bootcomp.Container>
        <Bootcomp.Navbar.Brand >Individual</Bootcomp.Navbar.Brand>
        <Bootcomp.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Bootcomp.Navbar.Collapse id="basic-navbar-nav">
          <Bootcomp.Nav className="me-auto">
          </Bootcomp.Nav>
        </Bootcomp.Navbar.Collapse>
      </Bootcomp.Container>
    </Bootcomp.Navbar>
  );
}

export default AppHeader;