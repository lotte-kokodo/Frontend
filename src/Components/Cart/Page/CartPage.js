/**
 * '장바구니' 페이지
 */

// Component
import Delivery from "../Component/Delivery"
import CartProductList from "../Component/CartProductList"
import Payment from "../Component/Payment"


const CartPage = () => {

	return (
		<>
			<div className="row">
				<div className="col-9">
					<Delivery /> {/* 배송정보 */}
					<CartProductList /> {/* 장바구니 상품 목록 */}
				</div>
				<div className="col-3">
					<Payment /> {/* 결제정보 */}
				</div>
			</div>
		</>
	);

}
export default CartPage;