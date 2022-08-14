import styled from "styled-components";
//Framer-motion Animation
const { motion } = require("framer-motion");

export const CartWrapper = styled(motion.div)`
	position: fixed;
	right: 0;
	top: 0;
	height: 100vh;
	width: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 100;
	display: flex;
	justify-content: flex-end;
`;

export const CartStyle = styled(motion.div)`
	width: 35%;
	background: #f1f1f1;
	padding: 2rem 5rem;
	overflow-y: scroll;
	position: relative;
`;

export const Card = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 1rem;
	overflow: hidden;
	background: white;
	padding: 2rem;
	margin: 2rem 0rem;
	img {
		width: 8rem;
	}
`;
export const CardInfo = styled(motion.div)`
	width: 50%;
	div {
		display: flex;
	}
`;

export const EmptyStyle = styled(motion.div)`
	top: 0;
	transform: translate(-50%, 0%);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;

	h1 {
		font-size: 1.5rem;
		padding: 2rem;
	}
	svg {
		font-size: 8rem;
		color: var(--secondary);
	}
`;

export const Checkout = styled(motion.div)`
	button {
		background: var(--primary);
		padding: 1rem 2rem;
		width: 100%;
		color: white;
		margin-top: 2rem;
		cursor: pointer;
		border: none;
	}
`;

export const Cards = styled(motion.div)``;
