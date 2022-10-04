import { fCurrency } from '../../../utils/formatNumber';

export default function CartItem({ item }) {

    const { id, quantity, productId, name, size, image, price } = item;

    return (<>
        <div className="row m-0 py-3 border-bottom">
            <div className="col-lg-8 m-0 p-0 row">
                <div className="col-4 col-lg-3 p-0">
                    <a href={`/products/${productId}`}><img src={image} className="img-fluid" alt='product' /></a>
                </div>
                <div className="col-8 d-flex flex-column justify-content-around">
                    <p className="m-0 fw-bold">{name}</p>
                    <p className="m-0">Size : {size}</p>
                    <p className="m-0">{fCurrency(price)}</p>
                    <p className="m-0">x {quantity}</p>
                </div>
            </div>
            <div className="col-lg-4 m-0 py-2 py-lg-0 row justify-content-around">
                <div className="col-6 text-center d-flex align-items-center">
                    <p className="m-0 text-danger">{fCurrency(quantity * price)}</p>
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