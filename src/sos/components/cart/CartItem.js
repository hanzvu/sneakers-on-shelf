export default function CartItem() {
    return (<>
        <div className="row m-0 py-3 border-bottom">
            <div className="col-lg-8 m-0 p-0 row">
                <div className="col-4 col-lg-3 p-0">
                    <a href='/products/1'><img src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2022/08/giay-the-thao-mlb-chunky-liner-boston-red-sox-3asxca12n-43bgs-mau-nau-be-6306dd5522b33-25082022092421.jpg" className="img-fluid" alt='product' /></a>
                </div>
                <div className="col-8 d-flex flex-column justify-content-around">
                    <p className="m-0 fw-bold">Giày Thể Thao MLB Chunky Liner Boston Red Sox 3ASXCA12N-43BGS Màu Nâu Be Size 230</p>
                    <p className="m-0">Nam</p>
                    <p className="m-0">
                        Phân loại hàng : 42 - 999đ</p>
                    <p className="m-0">1</p>
                </div>
            </div>
            <div className="col-lg-4 m-0 py-2 py-lg-0 row justify-content-around">
                <div className="col-6 text-center d-flex align-items-center">
                    <p className="m-0 text-danger">999đ</p>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <a href="/delete">
                        <button type="button" className="btn btn-danger shadow-none">Xóa
                            Khỏi Giỏ</button>
                    </a>
                </div>
            </div>
        </div>
    </>)
}