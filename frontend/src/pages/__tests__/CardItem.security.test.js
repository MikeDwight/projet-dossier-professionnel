import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import CardItem from "../../components/CardItem";
describe("XSS Security", () => {
    it("it shoudn't execute a malwared script (XSS)", () => {
        const malisciousCard = {
            id: "1",
            name: "<img src='x' onerror='alert(\"XSS\")' />",
            number: 1,
            serie: "Base set",
            bloc: "1st Edition",
            imageUrl: "https://example.com/image.jpg",
        };
        render(_jsx(CardItem, { card: malisciousCard, onEdit: () => { }, onDelete: () => { } }));
        const malisciousElement = screen.getByText("<img src='x' onerror='alert(\"XSS\")' />");
        expect(malisciousElement).toBeInTheDocument();
    });
});
