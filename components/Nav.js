import Link from "next/link";
import User from "./User";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "../styles/NavStyles";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";

const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
	const { showCart, setShowCart, totalQuantities } = useStateContext();
	return (
		<NavStyles>
			<Link href={"/"}>Styled.</Link>
			<NavItems>
				<User />
				<div onClick={() => setShowCart(true)}>
					{totalQuantities > 0 && (
						<motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
							{totalQuantities}
						</motion.span>
					)}
					<FiShoppingBag />
					<h3>Cart</h3>
				</div>
			</NavItems>
			<AnimatePresence>{showCart && <Cart />}</AnimatePresence>
		</NavStyles>
	);
}
