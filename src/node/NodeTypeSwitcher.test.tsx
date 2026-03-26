import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { NodeTypeSwitcher } from "./NodeTypeSwitcher"
import type { NodeData } from "../utils/types"

vi.mock("./BasicNode", () => ({
  BasicNode: () => <div data-testid="basic-node" />,
}))

vi.mock("./ImageNode", () => ({
  ImageNode: () => <div data-testid="image-node" />,
}))

vi.mock("./PageNode", () => ({
  PageNode: () => <div data-testid="page-node" />,
}))

const defaultProps = {
  updateFocusedIndex: vi.fn(),
  isFocused: false,
  index: 0,
}

const makeNode = (type: NodeData["type"]): NodeData => ({
  id: "1",
  type,
  value: "",
})

describe("NodeTypeSwitcher", () => {
  it.each(["text", "list", "heading1", "heading2", "heading3"] as const)(
    "renders BasicNode for type '%s'",
    (type) => {
      render(<NodeTypeSwitcher node={makeNode(type)} {...defaultProps} />)
      expect(screen.getByTestId("basic-node")).toBeInTheDocument()
    }
  )

  it("renders ImageNode for type 'image'", () => {
    render(<NodeTypeSwitcher node={makeNode("image")} {...defaultProps} />)
    expect(screen.getByTestId("image-node")).toBeInTheDocument()
  })

  it("renders PageNode for type 'page'", () => {
    render(<NodeTypeSwitcher node={makeNode("page")} {...defaultProps} />)
    expect(screen.getByTestId("page-node")).toBeInTheDocument()
  })

  it("renders only one node at a time", () => {
    render(<NodeTypeSwitcher node={makeNode("text")} {...defaultProps} />)
    expect(screen.queryByTestId("image-node")).not.toBeInTheDocument()
    expect(screen.queryByTestId("page-node")).not.toBeInTheDocument()
  })
})
