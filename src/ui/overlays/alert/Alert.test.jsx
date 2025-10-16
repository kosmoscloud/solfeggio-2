import { render, screen, fireEvent } from "@testing-library/react";
import Alert from "./Alert";

jest.mock("../../../layers/UILayer", () => {
    const hideAlert = jest.fn();
    const React = require("react");
    let UIContext = React.createContext({ hideAlert, styleSheet: {enabled: true} });
    UIContext._hideAlert = hideAlert;
    return { UIContext };
});

describe("Alert", () => {
    it("renders the alert text", () => {
        render(<Alert text="Test Alert" />);
        expect(screen.getByText("Test Alert")).toBeInTheDocument();
    });

    it("calls hideAlert and afterAlert when OK is clicked", () => {
        //arrange
        const afterAlert = jest.fn();
        const { UIContext } = require("../../../layers/UILayer");
        const hideAlert = UIContext._hideAlert;
        render(<Alert text="Test Alert" afterAlert={afterAlert} />);
        //act
        fireEvent.click(screen.getByText("OK"));
        //assert
        expect(hideAlert).toHaveBeenCalled();
        expect(afterAlert).toHaveBeenCalled();
    });

    it("calls only hideAlert if afterAlert is not provided", () => {
        //arrange
        const { UIContext } = require("../../../layers/UILayer");
        const hideAlert = UIContext._hideAlert;
        render(<Alert text="Test Alert" />);
        //act
        fireEvent.click(screen.getByText("OK"));
        //assert
        expect(hideAlert).toHaveBeenCalled();
    });
});
