import logo from '../assets/img/logo.png';

export default function NavbarLogo() {
    return (<>
        <div className="mh-100 col-12 col-sm-4 d-flex justify-content-center">
            <img className="mh-100 img-fluid" alt="logo" src={logo} />
        </div>
    </>)
}