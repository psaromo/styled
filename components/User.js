import { BiUserCircle } from "react-icons/bi";
import { useRouter } from "next/router"; //Send to api/login page
import styled from "styled-components";

export default function User() {
	const route = useRouter();

	return (
		<div onClick={() => route.push("/api/auth/login")}>
			<BiUserCircle />
			<h3>Profile</h3>
		</div>
	);
}
