import OrderItem from "./OrderItem";

export default function Order() {
    return (<>
        <div className="row justify-content-center pt-3 m-0 mb-3">
            <div className="col-lg-10 m-0 p-0">
                <div>
                    <div className="px-2 px-xl-4 bg-light">
                        <div className="d-flex border-bottom justify-content-between">
                            <div>
                                <h4 className="text-dark py-2 m-0">Đã xác nhận</h4>
                            </div>
                            <div className="d-flex align-items-center">
                                <a className="text-decoration-none" data-bs-toggle="collapse" href='#collapseExample1' role="button" aria-expanded="false" aria-controls="collapseExample"> Chi
                                    tiết </a>
                            </div>
                        </div>
                        <div className="collapse" id='collapseExample1'>
                            <div className="py-2 border-bottom">
                                <p className="mb-1">
                                    Thời gian đặt : 01-01-2022
                                </p>
                                <p className="mb-1">
                                    Cập nhật vào : 01-01-2022
                                </p>
                                <p className="mb-1">
                                    Địa chỉ :
                                </p>
                                <p className="mb-1">
                                    Ghi chú :
                                </p>
                            </div>
                        </div>


                        <OrderItem />

                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <a className="float-start">
                                    <button type="button" className="btn btn-danger">Hủy Đơn</button>
                                </a>
                            </div>
                            <div className="py-3 px-5 text-end">
                                Tổng số tiền : <span className="text-danger">888đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}