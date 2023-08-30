import React from "react";
import s from "./index.module.scss";

const Nav = ({ sections, activeSection, changeSection }) => {
	return (
		<ul className={s.nav}>
			{
				sections.length !== 0
					? sections.map((item) => {
						return (
							<li
								onClick={() => changeSection(item)}
								key={item.id}
								className={`${activeSection.id === item.id ? s.active : ""} `}
							>
								{item.title}
							</li>
						)
					})
					: <></>
			}
		</ul>
	)
};

export default Nav;