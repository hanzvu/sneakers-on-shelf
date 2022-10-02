export default function ProductDetail() {
    return (<>
        <div className="row col-12 col-lg-8 m-0 p-0">
            <div className="col-md-6">
                <img src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2022/08/giay-the-thao-mlb-chunky-liner-boston-red-sox-3asxca12n-43bgs-mau-nau-be-6306dd5522b33-25082022092421.jpg" alt="prod" className="img-fluid" />
            </div>
            <div className="col-md-6">
                <h4>Giày Thể Thao MLB Chunky Liner Boston Red Sox 3ASXCA12N-43BGS Màu Nâu Be Size 230</h4>
                <p className="m-0">
                    Danh mục : Giày chạy bộ
                </p>
                <div className="py-3">
                    <h5 className="text-danger m-0">999đ</h5>
                </div>
                <p>Mô tả</p>
                <div className="py-2">
                    <div role="group" className="btn-group">
                        <span className="d-flex align-items-center pe-3">Cỡ </span>
                        <a href="/">
                            <span role="button" className="shadow-none btn rounded-0 mx-1 btn-dark">43</span>
                        </a>
                    </div>
                </div>
                <div className="py-1 text-center">1 sản phẩm có sẵn</div>
                <div className="d-flex justify-content-center py-3">
                    <form action="/" method="POST">
                        <button type="submit" className="btn btn-dark shadow-none rounded-0 border-dark">THÊM
                            VÀO GIỎ HÀNG</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}