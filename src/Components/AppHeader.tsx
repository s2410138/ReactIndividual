import * as Bootcomp from '../Helpers/react_bootstrapComp'

function AppHeader() {
  return (
      <Bootcomp.Navbar bg="dark" variant="dark">
      <Bootcomp.Container>
        <Bootcomp.Navbar.Brand >Individual</Bootcomp.Navbar.Brand>
      </Bootcomp.Container>
    </Bootcomp.Navbar>
  );
}

export default AppHeader;