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
      input.setSelectionRange(
        selectionStart + emoji.length,
        selectionStart + emoji.length
      );
      //Moves cursor at the end of the input
    }
  };
  return insertEmoji;
}

export default useHandleEmoji;
