export default function NavbarSearch() {
    return (<>
        <div className="mh-100 col-4 col-md-5 d-none d-md-flex align-items-center">
            <form action="/collections" method="get" className="w-100">
                <div className="row m-0">
                    <input type="text" name="s" className="col-9 p-2" placeholder="Tìm kiếm..." required /><input type="submit" className="btn btn-dark col-3 shadow-none rounded-0" value="Tìm Kiếm" />
                </div>
            </form>
        </div>
    </>)
}