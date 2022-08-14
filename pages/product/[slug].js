import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import { Buy, DetailsStyle, ProductInfo, Quantity } from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ProductDetails() {
	//Use State
	const { qty, setQty, increaseQty, decreaseQty, onAdd } = useStateContext();

	//Use Effect
	useEffect(() => {
		setQty(1);
	}, []);

	//Fetch slug
	//Get the query (extract) from the useRouter
	const { query } = useRouter();

	//Fetch GraphQL data
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: { slug: query.slug },
	});
	const { data, fetching, error } = results;

	//Check for the data coming in
	if (fetching) return <p>Loading...</p>;
	if (error) return <p>Oh no... {error.message}</p>;

	//Extract data
	const { title, description, image } = data.products.data[0].attributes;

	//Create a toast
	const notify = () => {
		toast.success("Added to cart", { duration: 1500, icon: "🎉" });
	};

	return (
		<DetailsStyle>
			<img src={image.data[0].attributes.formats.medium.url} alt={title} />
			<ProductInfo>
				<h3>{title}</h3>
				<p>{description}</p>
				<Quantity>
					<span>Quantity</span>
					<button>
						<AiFillMinusCircle onClick={decreaseQty} />
					</button>
					<p>{qty}</p>
					<button>
						<AiFillPlusCircle onClick={increaseQty} />
					</button>
				</Quantity>
				<Buy
					onClick={() => {
						onAdd(data.products.data[0].attributes, qty);
						notify();
					}}
				>
					Add to Cart
				</Buy>
			</ProductInfo>
		</DetailsStyle>
	);
}
