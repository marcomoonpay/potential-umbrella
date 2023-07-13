import "./style.css";
import useForm from "./useForm";

// TODO: Make it work on Chrome
const FORM_ENDPOINT = "http://localhost:3001/sendRequest";

const App = () => {
  const { handleSubmit, status, message } = useForm();

  if (status === "error" || status === "success") {
    return <div>{message}</div>;
  }

  return (
    <div>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>
        who are you?
        <form action={FORM_ENDPOINT} onSubmit={handleSubmit} method="POST">
          <input name="userid" placeholder="charlie.brown" />
          what do you want for christmas?
          <textarea
            name="wish"
            rows={10}
            cols={45}
            maxLength={100}
            placeholder="Gifts!"
          ></textarea>
          <br />
          <button type="submit" id="submit-letter">
            Send
          </button>
        </form>
        <footer>
          Made with <a href="https://glitch.com">Glitch</a>!
        </footer>
      </main>
    </div>
  );
};

export default App;
