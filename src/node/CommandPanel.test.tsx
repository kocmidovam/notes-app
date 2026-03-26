import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CommandPanel } from "./CommandPanel"

vi.mock("./useOverflowScreenBotom.tsx", () => ({
  useOverflowsScreenBottom: () => ({ ref: { current: null }, isOverflowing: false }),
}))

describe("CommandPanel", () => {
  describe("rendering", () => {
    it("renders all supported block types", () => {
      render(<CommandPanel nodeText="/" selectItem={vi.fn()} />)

      expect(screen.getByText("Text")).toBeInTheDocument()
      expect(screen.getByText("List")).toBeInTheDocument()
      expect(screen.getByText("Page")).toBeInTheDocument()
      expect(screen.getByText("Image")).toBeInTheDocument()
      expect(screen.getByText("Heading 1")).toBeInTheDocument()
      expect(screen.getByText("Heading 2")).toBeInTheDocument()
      expect(screen.getByText("Heading 3")).toBeInTheDocument()
    })
  })

  describe("click selection", () => {
    it("calls selectItem with the correct type when an item is clicked", async () => {
      const selectItem = vi.fn()
      render(<CommandPanel nodeText="/" selectItem={selectItem} />)

      await userEvent.click(screen.getByText("List"))

      expect(selectItem).toHaveBeenCalledWith("list")
    })
  })

  describe("keyboard selection", () => {
    it("calls selectItem with the first item on Enter when no filter is active", async () => {
      const selectItem = vi.fn()
      render(<CommandPanel nodeText="/" selectItem={selectItem} />)

      await userEvent.keyboard("{Enter}")

      expect(selectItem).toHaveBeenCalledWith("text")
    })

    it("moves selection down on ArrowDown", async () => {
      const selectItem = vi.fn()
      render(<CommandPanel nodeText="/" selectItem={selectItem} />)

      await userEvent.keyboard("{ArrowDown}{Enter}")

      expect(selectItem).toHaveBeenCalledWith("list")
    })

    it("moves selection up on ArrowUp", async () => {
      const selectItem = vi.fn()
      render(<CommandPanel nodeText="/" selectItem={selectItem} />)

      await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowUp}{Enter}")

      expect(selectItem).toHaveBeenCalledWith("list")
    })

    it("wraps around to the first item when going past the last", async () => {
      const selectItem = vi.fn()
      render(<CommandPanel nodeText="/" selectItem={selectItem} />)

      // 7 items total, pressing down 7 times wraps back to index 0
      await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{Enter}")

      expect(selectItem).toHaveBeenCalledWith("text")
    })

    it("wraps around to the last item when going before the first", async () => {
      const selectItem = vi.fn()
      render(<CommandPanel nodeText="/" selectItem={selectItem} />)

      await userEvent.keyboard("{ArrowUp}{Enter}")

      expect(selectItem).toHaveBeenCalledWith("heading3")
    })
  })

  describe("filtering", () => {
    it("highlights the item matching the nodeText", () => {
      render(<CommandPanel nodeText="/list" selectItem={vi.fn()} />)

      // "List" item should have the selected class, others should not
      const listItem = screen.getByText("List")
      const textItem = screen.getByText("Text")

      expect(listItem.className).toContain("selected")
      expect(textItem.className).not.toContain("selected")
    })

    it("calls selectItem with the matched item on Enter", async () => {
      const selectItem = vi.fn()
      render(<CommandPanel nodeText="/image" selectItem={selectItem} />)

      await userEvent.keyboard("{Enter}")

      expect(selectItem).toHaveBeenCalledWith("image")
    })
  })
})
