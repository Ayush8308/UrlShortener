import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const url = "https://url-shortener42.p.rapidapi.com/shorten/";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "08e1e68e9dmshaf17db874d80407p13458fjsn24e4935621e1",
        "x-rapidapi-host": "url-shortener42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: inputValue,
        validity_duration: 5,
      }),
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setShortenLink(result.url);
    } catch (error) {
      console.error(error);
      setError(error.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }
  if (error) {
    return <p className="noData">Something went wrong :(</p>;
  }

  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              Copy to Clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;
