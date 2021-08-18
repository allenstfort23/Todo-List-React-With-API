import React from "react";
import { useState, useEffect } from "react";

export function Home() {
	// const [isShown, setIsShown] = useState(false);
	const [isShown, setIsShown] = useState({ state: false, index: undefined });
	const [variable, setVariable] = useState(null);

	const apiUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/allenstfort";

	useEffect(() => {
		fetch(apiUrl)
			.then(res => res.json())
			.then(newTodo => setVariable(newTodo))
			.catch(error => console.log(error));
	}, []);

	useEffect(() => {
		if (variable !== null) {
			fetch(apiUrl, {
				method: "PUT",
				body: JSON.stringify(variable),
				headers: {
					"Content-Type": "application/json"
				}
			});
		}
	}, [variable]);

	let todo = (variable || []).map((item, i) => {
		return (
			<li
				className="col-12 list-group-item text-info"
				key={i}
				onMouseEnter={() => setIsShown({ state: true, index: i })}
				onMouseLeave={() =>
					setIsShown({ state: false, index: undefined })
				}>
				{item.label}
				{isShown.state && isShown.index === i && (
					<button
						className="float-right"
						onClick={() => removeItem(i)}>
						x
					</button>
				)}
			</li>
		);
	});

	const removeItem = index => {
		console.log(index);
		const newArray = variable.filter((item, i) => i != index);
		// const newArray = variable.filter((item, i) => {
		// 	if (i != index) {
		// 		return item;
		// 	}
		// });
		setVariable(newArray);
	};

	const newTodo = onKeyDownEvent => {
		console.log(onKeyDownEvent);
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = {
				label: onKeyDownEvent.target.value,
				done: false
			};
			const newTodo = [...variable, userInput];
			setVariable(newTodo);
			onKeyDownEvent.target.value = "";
			// fetch(apiUrl, {
			// 	method: "PUT",
			// 	body: JSON.stringify(newTodo),
			// 	headers: {
			// 		"Content-Type": "application/json"
			// 	}
			// });
		}
	};

	return (
		<>
			<h1 className="text-center text-success mt-4 ">To Do List</h1>
			<div className="List col-4  mx-auto list-group mt-4">
				<input
					className="col-12 p-3 font-weight-bold text-center"
					onKeyDown={newTodo}
					type="text"
					id="fname"
					placeholder="Enter A Task"
					name="fname"
				/>
				<ul className="col-12 p-0">
					{todo}
					<span className="footer list-group-item text-danger">
						{todo.length} item left
					</span>
				</ul>
			</div>
		</>
	);
}
