import { useStateContext } from "../lib/context";
import {
	CartWrapper,
	CartStyle,
	Card,
	CardInfo,
	EmptyStyle,
	Checkout,
	Cards,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";

//Animation variants
const card = {
	hidden: { opacity: 0, scale: 0.8 },
	show: { opacity: 1, scale: 1 },
};

const cards = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { delayChildren: 0.4, staggerChildren: 0.1 } },
};

export default function Cart() {
	const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();

	//Payment
	const handleCheckout = async () => {
		const stripe = await getStripe();
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cartItems),
		});
		const data = await response.json();
		await stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<CartWrapper
			onClick={() => setShowCart(false)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<CartStyle
				onClick={(e) => e.stopPropagation()}
				initial={{ x: "50%" }}
				animate={{ x: "0%" }}
				transition={{ type: "tween" }}
				exit={{ x: "50%" }}
			>
				{/* Stop parent function from running */}
				{cartItems.length < 1 && (
					<EmptyStyle
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
					>
						<h1>You have more shopping to do 😉</h1>
						<FaShoppingCart />
					</EmptyStyle>
				)}
				<Cards variants={cards} initial='hidden' animate='show'>
					{cartItems.length >= 1 &&
						cartItems.map((item) => {
							return (
								<Card
									key={item.slug}
									variants={card}
									initial='hidden'
									animate='show'
									transition={{ delay: 0.3 }}
								>
									<img
										src={
											item.image.data[0].attributes.formats
												.thumbnail.url
										}
										alt={item.title}
									/>
									<CardInfo>
										<h3>{item.title}</h3>
										<h3>${item.price}</h3>
										<Quantity>
											<span>Quantity</span>
											<button>
												<AiFillMinusCircle
													onClick={() => onRemove(item)}
												/>
											</button>
											<p>{item.quantity}</p>
											<button>
												<AiFillPlusCircle
													onClick={() => onAdd(item, 1)}
												/>
											</button>
										</Quantity>
									</CardInfo>
								</Card>
							);
						})}
				</Cards>
				{cartItems.length >= 1 && (
					<Checkout>
						<h3>Subtotal: ${totalPrice}</h3>
						<button onClick={handleCheckout}>Purchase</button>
					</Checkout>
				)}
			</CartStyle>
		</CartWrapper>
	);
}
