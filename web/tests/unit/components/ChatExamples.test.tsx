import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatExamples from "@/components/ChatExamples";
import { exemples, ILLUSTRATIVE_DISCLAIMER } from "@/content/exemples";

describe("ChatExamples (T-4.1)", () => {
  it("renders at least 10 clickable questions", () => {
    render(<ChatExamples />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(10);
  });
});

describe("ChatExamples (T-4.2)", () => {
  it("shows the matching illustrative answer in an aria-live region when a question is clicked", async () => {
    const user = userEvent.setup();
    render(<ChatExamples />);

    const target = exemples[0]!;
    await user.click(screen.getByRole("button", { name: target.question }));

    const liveRegion = screen.getByRole("status");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveTextContent(target.reponse);
  });
});

describe("ChatExamples (T-4.3)", () => {
  it("shows the 'exemple illustratif' mention alongside the displayed answer", async () => {
    const user = userEvent.setup();
    render(<ChatExamples />);

    await user.click(
      screen.getByRole("button", { name: exemples[2]!.question }),
    );

    expect(screen.getByText(ILLUSTRATIVE_DISCLAIMER)).toBeInTheDocument();
  });
});

describe("ChatExamples (T-4.4)", () => {
  it("shows only one active answer at a time", async () => {
    const user = userEvent.setup();
    render(<ChatExamples />);

    await user.click(
      screen.getByRole("button", { name: exemples[0]!.question }),
    );
    expect(screen.getByText(exemples[0]!.reponse)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: exemples[1]!.question }),
    );

    expect(screen.queryByText(exemples[0]!.reponse)).not.toBeInTheDocument();
    expect(screen.getByText(exemples[1]!.reponse)).toBeInTheDocument();
  });
});
