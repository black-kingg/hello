import { useState, useEffect, useLocation } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../Components/NotFound";
import DefinitionSearch from "../Components/DefinitionSearch";
import useFetch from "../Hooks/UseFetch";

export default function Definition() {
	//const [word, setWord] = useState();
	//const [notFound, setNotFound] = useState(false);
	let { search } = useParams();
	const navigate = useNavigate();
	//const [error, setError] = useState(false);
	//const location = useLocation();
	const {
		request,
		data: [{ meanings: word }] = [{}],
		errorStatus,
	} = useFetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search, {
		method: "GET",
	});

	useEffect(() => {
		request();
	});

	if (errorStatus === 404) {
		return (
			<>
				<NotFound />
				<Link to="/dictionary">Search Another</Link>
			</>
		);
	}

	if (errorStatus) {
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
