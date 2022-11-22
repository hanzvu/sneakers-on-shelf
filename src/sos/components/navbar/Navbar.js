import NavbarInfo from "./NavbarInfo";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarSearch from "./NavbarSearch";
import NavbarTopBar from "./NavbarTopBar";

export default function Navbar() {

    return (<>
        <div className="container-fluid p-0 mb-md-0 mb-sm-4">
            <NavbarTopBar />
            <div className="row m-0 justify-content-center py-2" id="header-tab">
                <div className="h-100 col-12 col-xl-10 p-0 m-0 d-flex justify-content-center">
                    <NavbarLogo />
                    <NavbarSearch />
                    <NavbarInfo />
                </div>
            </div>
            <NavbarMenu />
        </div>

    </>)

}