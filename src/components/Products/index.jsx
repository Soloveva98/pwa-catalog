import React from "react";
import s from "./index.module.scss";
import Product from "..//Product";

const Products = ({ elements }) => {
	return (
		<div className={s.products}>
			{
				elements.length !== 0
					? elements.map((obj) => {
						return <Product key={obj.id} {...obj} />
					})
					: <></>
			}
		</div>
	)
};

export default Products;