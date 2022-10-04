import { fCurrency } from '../../../utils/formatNumber';

import ProductDetailSizeList from "./ProductDetailSizeList";
import ProductImageContainer from "./ProductImageContainer";

export default function ProductDetail({ product }) {

    const { name, productImage, productImages, category, sellPrice, productDetails, description } = product;

    return (<>
        <div className="row col-12 col-lg-8 m-0 p-0">
            <div className="col-md-6">
                <ProductImageContainer name={name} productImage={productImage} productImages={productImages} />
            </div>
            <div className="col-md-6">
                <h4>{name}</h4>
                <p className="m-0">
                    Danh mục : {category}
                </p>
                <div className="py-3">
                    <h5 className="text-danger m-0">{fCurrency(sellPrice)}</h5>
                </div>
                <p>{description}</p>
                <ProductDetailSizeList productDetails={productDetails} />
            </div>
        </div>
    </>)
}