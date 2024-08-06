import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
const languages = ["Text", "C++", "C", "Javascript", "Java", "Python"];
const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getSuggestionValue = (suggestion: string) => suggestion;
const renderSuggestion = (suggestion: string) => (
  <div>{suggestion}</div>
);
interface AutocompleteProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}
const Autocomplete: React.FC<AutocompleteProps> = ({ language, setLanguage }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const onChange = (event: React.FormEvent<any>, { newValue }: { newValue: string }) => {
    setLanguage(newValue);
  };
  const inputProps = {
    placeholder: 'Type a language',
    value: language,
    onChange: onChange
  };
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};
export default Autocomplete;
