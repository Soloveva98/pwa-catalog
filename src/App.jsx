import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import Nav from "./components/Nav";
import Products from "./components/Products";

function App() {
	const [sections, setSections] = useState([]);
	const [elements, setElements] = useState([]);
	const [activeSection, setActiveSection] = useState();

	const getData = async () => {
		try {
			const res = await fetch("https://moscow.fargospc.ru/test/json/");
			const data = await res.json();
			setSections(data.sections);
			setElements(data.elements);
			setActiveSection(data.sections[0]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const sortedElements = (elements, sortArr) => {
		const arr = [];

		for (let i = 0; i < sortArr.length; i++) {
			let itemId = sortArr[i];

			for (let i = 0; i < elements.length; i++) {
				let element = elements[i];
				if (element.id && itemId === element.id) {
					arr.push(element)
				}
			}
		};

		return arr;
	};

	const changeSection = (obj) => {
		setActiveSection(obj);
	};

	if (!activeSection) return "";

	return (
		<div className="wrapper">
			<div className="wrapper__container">
				<h2 className="wrapper__header">Catalog</h2>
				<Nav
					sections={sections}
					activeSection={activeSection}
					changeSection={changeSection}
				/>
				<Products elements={sortedElements(Object.values(elements), activeSection.items)} />
			</div>
		</div>
	);
}

export default App;
