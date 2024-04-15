function useHandleEmoji() {
  const insertEmoji = (emoji, setMessage, input) => {
    if (input) {
      const { selectionStart, selectionEnd } = input;
      const newInputValue =
        input.value.substring(0, selectionStart) +
        emoji +
        input.value.substring(selectionEnd);
      setMessage(newInputValue);
      input.focus();
      //Moves cursor at the end of the input
      input.setSelectionRange(
        selectionStart + emoji.length,
        selectionStart + emoji.length
      );
      
    }
  };
  return insertEmoji;
}

export default useHandleEmoji;
