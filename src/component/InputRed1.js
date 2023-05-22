import { useState } from 'react';

export function InputText() {
  const [text, setText] = useState('');
  const [showError, setShowError] = useState(false);

  const handleChange = (event) => {
    const inputText = event.target.value;
    const isNumeric = !isNaN(inputText) && inputText.trim() !== '';
    const isPunctuation = /^[^\w\s]+$/.exec(inputText) !== null;
    setShowError(!inputText || isNumeric || isPunctuation);
    setText(inputText);
  };

  const inputStyle = {
    border: `2px solid ${showError ? 'red' : 'black'}`,
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      style={inputStyle}
    />
  );
}

