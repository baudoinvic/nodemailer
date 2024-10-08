import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  const [email, setEmail] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sendemail",
        data
      );
      console.log(response.data);

    
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error(error);

   
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="--flex-center --bg-primary --100vh">
      <div className="--width-500px --card --p --bg-light">
        <form className="--form-control" onSubmit={sendEmail}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="--btn --btn-primary">
            Send Email
          </button>
        </form>
        <ToastContainer />
      </div>
      
    </div>
  );
}

export default App;
