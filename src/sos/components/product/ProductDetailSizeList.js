import { useState } from "react"
import { addToCart } from "../../services/CartService";

export default function ProductDetailSizeList({ productDetails }) {

    const [selectedProduct, setSelectedProduct] = useState(productDetails[0]);

    const handleAddToCartSubmit = event => {
        event.preventDefault();
        addToCart(selectedProduct.id);
    }

    return (<>
        <div className="py-2">
            <div role="group" className="btn-group">
                <span className="d-flex align-items-center pe-3">Size</span>
                {
                    productDetails.map((pd, i) => (
                        <button key={pd.id}
                            className={`shadow-none btn rounded-0 mx-1 ${pd.id === selectedProduct.id ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setSelectedProduct(productDetails[i])}>
                            {pd.size}
                        </button>
                    ))
                }
            </div>
        </div>
        <div className="py-1 text-center">{selectedProduct.quantity} sản phẩm có sẵn</div>
        <div className="d-flex justify-content-center py-3">
            {
                selectedProduct.quantity > 0 &&
                <form action="/" method="POST" onSubmit={handleAddToCartSubmit}>
                    <button type="submit" className="btn btn-dark shadow-none rounded-0 border-dark">
                        THÊM VÀO GIỎ HÀNG
                    </button>
                </form>
            }
        </div>
    </>)
}