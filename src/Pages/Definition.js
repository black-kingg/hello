import { useState, useEffect, useLocation } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../Components/NotFound";
import DefinitionSearch from "../Components/DefinitionSearch";

export default function Definition() {
	const [word, setWord] = useState();
	const [notFound, setNotFound] = useState(false);
	let { search } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const location = useLocation();

	useEffect(() => {
		fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
			.then((response) => {
				if (response.status === 404) {
					setNotFound(true);
				} else if (response.status === 401) {
				} else if (response.status === 500) {
					setError(true);
				}

				if (!response.ok) {
					setError(true);

					throw new Error("Something went wrong");
				}
				return response.json();
			})
			.then((data) => {
				setWord(data[0].meanings);
			})
			.catch((e) => {
				setError(true);
				console.log(e.message);
			});
	}, []);

	if (notFound === true) {
		return (
			<>
				<NotFound />
				<Link to="/dictionary">Search Another</Link>
			</>
		);
	}

	if (error === true) {
		return (
			<>
				<p>Something went wrong</p>
				<Link to="/dictionary">Search Another</Link>
			</>
		);
	}

	return (
		<>
			{word ? (
				<>
					<h1>This is a definition:</h1>
					{word.map((meaning) => {
						return (
							<p key={uuidv4()}>
								{meaning.partOfSpeech + ": "}
								{meaning.definitions[0].definition}
							</p>
						);
					})}
					<p>Search again:</p>
					<DefinitionSearch />
				</>
			) : null}
		</>
	);
}
