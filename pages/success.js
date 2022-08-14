import { useRouter } from "next/router";
import Image from "next/image";
import shiba from "../public/shiba-success.png";
import styled from "styled-components";
const { motion } = require("framer-motion");
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export async function getServerSideProps(params) {
	const order = await stripe.checkout.sessions.retrieve(params.query.session_id, {
		expand: ["line_items"],
	});
	return { props: { order } };
}

export default function Success({ order }) {
	const route = useRouter();
	console.log(order);
	return (
		<Wrapper>
			<Card
				initial={{ opacity: 0, scale: 0.75 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.75 }}
			>
				<h1>Thank you for your order!</h1>
				<h2>A confirmation email has been sent to</h2>
				<h2>{order.customer_details.email}</h2>
				<InfoWrapper>
					<Address>
						<h3>Address</h3>
						<h3>
							{Object.entries(order.customer_details.address).map(
								([key, val]) => (
									<p key={key}>
										{key} : {val}
									</p>
								)
							)}
						</h3>
					</Address>
					<OrderInfo>
						<h3>Products</h3>
						<h2>
							{order.line_items.data.map((item) => (
								<div key={item.id}>
									<p>Product: {item.description}</p>
									<p>Quantity: {item.quantity}</p>
									<p>Price: {item.price.unit_amount_decimal}</p>
								</div>
							))}
						</h2>
					</OrderInfo>
				</InfoWrapper>
				<button onClick={() => route.push("/")}>Continue Shopping</button>
				<Image src={shiba} alt='shiba doggo' />
			</Card>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	margin: 5rem 15rem;
`;
const Card = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	border-radius: 2rem;
	padding: 3rem;
	h2 {
		margin: 1rem 0rem;
	}
	button {
		color: white;
		background: var(--primary);
		font-size: 1.2rem;
		font-weight: 500;
		padding: 1rem 2rem;
		cursor: pointer;
	}
`;

const Address = styled.div`
	font-size: 1rem;
	width: 100%;
`;
const OrderInfo = styled.div`
	font-size: 1rem;

	width: 100%;
	div {
		padding-bottom: 1rem;
	}
`;
const InfoWrapper = styled.div`
	width: 100%;

	display: flex;
	justify-content: space-between;
	padding: 1rem 0rem;
`;
