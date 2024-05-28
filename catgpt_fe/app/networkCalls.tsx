interface getCatImage {
  message: string;
  setResponse: React.Dispatch<React.SetStateAction<string[]>>;
}

export const getCatImage = async ({ message, setResponse }: getCatImage) => {
  try {
    const res = await fetch(`http://localhost:8000/getCatImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
    const data: string[] = await res.json();
    setResponse(data);
  } catch (err) {
    console.log(err);
  }
};
