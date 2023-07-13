import { FormEvent, useState } from "react";

function useForm() {
  const [status, setStatus] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    const finalFormEndpoint = (e.target as HTMLFormElement).action;

    const data = Array.from((e.target as HTMLFormElement).elements)
      .filter((input: unknown) => (input as HTMLInputElement).name)
      .reduce(
        (obj: Object, input: unknown) =>
          Object.assign(obj, {
            [(input as HTMLInputElement).name]: (input as HTMLInputElement)
              .value,
          }),
        {}
      );

    try {
      const response = await fetch(finalFormEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const parsedResponse = (await response.json()) as { result: string };
      setMessage(parsedResponse.result);
      setStatus("success");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setMessage(e.toString());
        setStatus("error");
      }
    }
  };

  return { handleSubmit, status, message };
}

export default useForm;
