import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Welcome } from "./Welcome";

describe("Welcome", () => {
  test("renders without crashing", () => {
    render(<Welcome />);
  });

  test("renders two inputs and a button ", async () => {
    render(<Welcome />);

    const playerOneInput = screen.getByTestId("player-one-input");
    const playerTwoInput = screen.getByTestId("player-two-input");
    const startButton = screen.getByTestId("start-btn");

    expect(playerOneInput).toBeInTheDocument();
    expect(playerTwoInput).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
  });

  test("if two names same then display error message and button is disabled", async () => {
    render(<Welcome />);

    const playerOneInput = screen.getByTestId("player-one-input");
    const playerTwoInput = screen.getByTestId("player-two-input");
    const startButton = screen.getByTestId("start-btn");

    userEvent.type(playerOneInput, "john");
    userEvent.type(playerTwoInput, "john");

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(startButton).toBeDisabled();
  });

  test("if two names input filled and not same then no error message is displayed and button is enabled", async () => {
    render(<Welcome />);

    const playerOneInput = screen.getByTestId("player-one-input");
    const playerTwoInput = screen.getByTestId("player-two-input");
    const startButton = screen.getByTestId("start-btn");

    userEvent.type(playerOneInput, "john");
    userEvent.type(playerTwoInput, "sara");

    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    expect(startButton).not.toBeDisabled();
  });

  test("click on start game, display board and hide welcome div", async () => {
    render(<Welcome />);

    const startButton = screen.getByTestId("start-btn");
    fireEvent.click(startButton);

    expect(screen.queryByTestId("welcome")).not.toBeInTheDocument();
    expect(screen.queryByTestId("board")).toBeInTheDocument();
  });
});
