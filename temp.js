export async function handle(state, action) {
  if (action.input.function === "change") {
    state.name = action.input.name;
    return { state };
  }
}
