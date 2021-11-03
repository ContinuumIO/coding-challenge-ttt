import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board } from "./Board";

describe("Board", () => {
  test("renders without crashing", () => {
    render(<Board />);
  });

  test("check when 'X' player wins", () => {
    render(<Board playerOne="X" playerTwo="O" />);

    const square1 = screen.getByTestId("square-0");
    const square2 = screen.getByTestId("square-1");
    const square5 = screen.getByTestId("square-4");
    const square7 = screen.getByTestId("square-6");
    const square9 = screen.getByTestId("square-8");

    fireEvent.click(square1);
    expect(square1).toHaveTextContent("X");

    fireEvent.click(square2);
    expect(square2).toHaveTextContent("O");

    fireEvent.click(square5);
    expect(square5).toHaveTextContent("X");

    fireEvent.click(square7);
    expect(square7).toHaveTextContent("O");

    fireEvent.click(square9);
    expect(square9).toHaveTextContent("X");

    expect(screen.getByTestId("status")).toHaveTextContent("Winner: X");
  });

  test("check when the game is a draw", () => {
    render(<Board playerOne="X" playerTwo="O" />);

    const square1 = screen.getByTestId("square-0");
    const square2 = screen.getByTestId("square-1");
    const square3 = screen.getByTestId("square-2");
    const square4 = screen.getByTestId("square-3");
    const square5 = screen.getByTestId("square-4");
    const square6 = screen.getByTestId("square-5");
    const square7 = screen.getByTestId("square-6");
    const square8 = screen.getByTestId("square-7");
    const square9 = screen.getByTestId("square-8");

    fireEvent.click(square1);
    expect(square1).toHaveTextContent("X");

    fireEvent.click(square2);
    expect(square2).toHaveTextContent("O");

    fireEvent.click(square3);
    expect(square3).toHaveTextContent("X");

    fireEvent.click(square5);
    expect(square5).toHaveTextContent("O");

    fireEvent.click(square4);
    expect(square4).toHaveTextContent("X");

    fireEvent.click(square6);
    expect(square6).toHaveTextContent("O");

    fireEvent.click(square8);
    expect(square8).toHaveTextContent("X");

    fireEvent.click(square7);
    expect(square7).toHaveTextContent("O");

    fireEvent.click(square9);
    expect(square9).toHaveTextContent("X");

    expect(screen.getByTestId("status")).toHaveTextContent("Draw");
  });
});
