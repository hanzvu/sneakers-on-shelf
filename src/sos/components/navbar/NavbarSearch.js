import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function NavbarSearch() {

    const navigate = useNavigate();

    const [query, setQuery] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        navigate({ pathname: '/products', search: `query=${query}` })
    }

    return (<>
        <div className="mh-100 col-4 col-md-5 d-none d-md-flex align-items-center">
            <form action="/products" method="get" className="w-100" onSubmit={handleSubmit}>
                <div className="row m-0">
                    <input type="text" name="query" value={query} onChange={e => { setQuery(e.target.value) }} className="col-9 p-2" placeholder="Tìm kiếm..." required /><input type="submit" className="btn btn-dark col-3 shadow-none rounded-0" value="Tìm Kiếm" />
                </div>
            </form>
        </div>
    </>)
}