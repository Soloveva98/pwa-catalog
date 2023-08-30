import React from "react";
import s from "./index.module.scss";

const Product = (obj) => {
	const url = "https://moscow.fargospc.ru/";

	return (
		<>
			{
				obj ? (
					<div className={s.product}>
						<img src={url + obj.photo[0].src} alt="" />
						<div className={s.product__info}>
							<p className={s.product__title}>{obj.title}</p>
							<p className={s.product__price}>{obj.price} {obj.currency}</p>
						</div>
					</div>
				) : <></>
			}
		</>
	)
};

export default Product;