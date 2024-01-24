import React, { useState, useEffect } from "react";
import scss from "./Fetch.module.scss";

const Fetch = () => {
	const [users, setUsers] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const [texts, setTexts] = useState([]);
	const [inputValue2, setInputVal] = useState("");

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/users"
				);
				const data = await response.json();
				setUsers(data);
			} catch (error) {}
		};
		getUsers();
	}, []);

	const handleDeleteUsers = () => {
		setUsers([]);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		localStorage.setItem("inputValue", value);
	};

	useEffect(() => {
		const storedValue = localStorage.getItem("inputValue");
		if (storedValue) {
			setInputValue(storedValue);
		}
	}, []);
	return (
		<div>
			<ul>
				{users.map((user) => (
					<li className={scss.names} key={user.id}>
						{user.name}
					</li>
				))}
			</ul>

			{/*  */}

			<input
				className={scss.input}
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Local Storage"
			/>

			<button className={scss.button} onClick={handleDeleteUsers}>
				Delete all
			</button>

			{/*  */}

			{/* //! */}
			<div>
				<input
					type="text"
					value={inputValue2}
					placeholder="Что вы хотите добавить?"
					onChange={(e) => {
						setInputVal(e.target.value);
					}}
				/>

				<button
					onClick={() => {
						setTexts([...texts, { id: Math.random(), text: inputValue2 }]);
						setInputVal("");
					}}>
					add
				</button>

				{texts.map((text) => {
					return <div key={text.id}>{text.text}</div>;
				})}
			</div>

			{/* //! */}
		</div>
	);
};

export default Fetch;
