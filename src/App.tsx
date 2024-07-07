import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }
`;

const Message = styled.p<{ error?: boolean }>`
  margin-top: 20px;
  color: ${(props) => (props.error ? "red" : "green")};
`;

interface FormData {
  prompt: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({ prompt: "" });
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8000/ai", {
        prompt: formData.prompt,
      });
      setResponse(res.data.response);
    } catch (err) {
      setError("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Submit a Prompt</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="prompt">Prompt</Label>
        <Input
          type="text"
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
      {error && <Message error>{error}</Message>}
      {response && <Message>{response}</Message>}
    </Container>
  );
}

export default App;
