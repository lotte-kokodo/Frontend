/**
 * 장바구니 상품 열
 */

// CSS
import "../../../pages/client/order/css/order.css"

// Component
import CheckBox from "./checkBox";
import Price from "./price";

// Module
import axios from "axios";
import {useContext, useState} from "react"

// Context
import {AuthContext} from "../../../context/authProvider";
import {OrderContext} from "../../../context/orderProvider";

import { ServerConfigContext } from "../../../context/serverConfigProvider";

const CartProductRow = (props) => {
	const { url } = useContext(ServerConfigContext);
	const { headers } = useContext(AuthContext);

	const product = props.product;
	const cartId = product.cartId;
	const [qty, setQty] = useState(product.qty);
	const { checkProducts, setCheckProducts } = useContext(OrderContext);

	const updateQty = async (updatedQty) => {

		const req = {
			qty: updatedQty
		}

		await axios.post(url + `/order-payment-service/carts/${cartId}/qty`, req, {headers: headers })
			.then((resp) => {
				console.log("[Success](CartRow) updateQty().");
				console.log(resp);

				setQty(updatedQty);
				updateProductQty(updatedQty);
			})
			.catch((err) => {
				console.log("[Error](CartRow) updateQty().");
				console.log(err);

				const data = err.response.data;
				alert(data.message);
				setQty(data.result.qtyAvailable);
			});
	}

	const updateProductQty = (updatedQty) => {

		setCheckProducts(
				checkProducts.map((checkProduct) =>
					checkProduct.productId === product.productId
							? {...checkProduct, qty: updatedQty }
							: checkProduct
				)
		)
	}

	const increaseQty = () => {
		const updatedQty = qty + 1;

		updateQty(updatedQty);
	}

	const decreaseQty = () => {
		const updatedQty = qty - 1;
		if (updatedQty <= 0) {
			return;
		}

		updateQty(updatedQty);
	}

	return (
		<>
			<div className="row order-product-row-div">
				<div className="col-1">
					<CheckBox productId={product.productId}
							handler={props.handler} 
							isAllChecked={props.isAllChecked} 
							checkProductCnt={props.checkProductCnt}
							allProductCnt={props.allProductCnt}/>
				</div>
				<div className="col-2">
					<img className="order-product-img" src={product.productThumbnail} alt={product.productName} />
				</div>
				<div className="col-4">
					<span>{product.productName}</span>
				</div>
				<div className="col-2">
					<button onClick={decreaseQty}>-</button> &nbsp;
						<span>{qty}</span> &nbsp;
						<button onClick={increaseQty}>+</button> &nbsp;
					</div>
				<div className="col-3">
					<Price product={product} />
				</div>
			</div>
		</>
	);

}

export default CartProductRow;