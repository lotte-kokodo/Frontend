/**
 * '장바구니' 결제 영역 페이지
 */

// Context
import { OrderContext } from "../../../context/OrderProvider";


// Module
import { useContext, useEffect, useState } from "react"


const Payment = () => {

	const { checkProducts } = useContext(OrderContext);
	const [totalPrice, setTotalPrice] = useState(999999999);
	const [discPrice, setDiscPrice] = useState(0);
	const [payPrice, setPayPrice] = useState(999999999);

	useEffect(() => {
		calcPaymentPrice();
	}, [checkProducts.length]);


	const calcPaymentPrice = () => {
		// 상품 총 금액 계산
		let tPrice = 0;
		checkProducts.map((product) => tPrice += product.totalPrice);
		setTotalPrice(tPrice);

		// 총 할인금액 계산
		let discPrice = 0;
		checkProducts.map((product) => {
			if (product.discPrice !== 0) {
				discPrice +=  product.discPrice;
			}
		});
		setDiscPrice(discPrice);
		// TODO 배송비 계산
		// 중복되지 않는 판매자가 총 몇명? - 판매자 아이디 리스트
		// 배송 적용할 수 있는 판매자 아이디 리스트를 PromotionService 로 부터 받아 ?
		// 판매자 수 x 3000(배송비)

		// 배송비 추가
		setPayPrice(tPrice-discPrice);
	}

	return (
		<>
			<h3>결제예정금액</h3><br/>
			<table>
				<tbody>
					<tr>
						<td>상품금액</td>
						<td>{totalPrice}</td>
					</tr>
					<tr>
						<td>상품할인금액</td>
						<td>{discPrice}</td>
					</tr>
					<tr>
						<td>배송비</td>
						<td>{}</td>
					</tr>
				</tbody>
			</table>
			<hr/>
			<div>
				<span>{payPrice} 원</span>
			</div>
		</>
	)
}

export default Payment