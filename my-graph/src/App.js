import "./App.css";
import { createClient } from "urql";
import { useEffect, useState } from "react";

const API_URL =
  "https://api.thegraph.com/subgraphs/name/minh200220/foundation-subgraph";

const query = `
{
  tokens(first: 5) {
    id
    tokenID
    contentURI
    tokenIPFSPath
  }
  users(first: 5) {
    id
    tokens {
      id
    }
    created {
      id
    }
  }
}
`;

const client = createClient({
  url: API_URL,
});

function App() {
  const [tokens, setTokens] = useState([]);
  const fetchData = async () => {
    const res = await client.query(query).toPromise();
    console.log("response", res);
    setTokens(res.data.tokens);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {tokens?.map((token, index) => (
        <div key={index}>
          <a href={token.contentURI} target="_blank">
            Content URI
          </a>
          <p>{token.tokenID}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
