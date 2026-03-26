import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { usePageState } from "./usePageState"
import type { Page } from "../utils/types"

vi.mock("../utils/updatePage", () => ({
  updatePage: vi.fn(),
}))

const makePage = (overrides?: Partial<Page>): Page => ({
  id: "1",
  title: "Test page",
  slug: "test-page",
  cover: "",
  nodes: [
    { id: "a", type: "text", value: "Hello" },
    { id: "b", type: "text", value: "World" },
  ],
  ...overrides,
})

describe("usePageState", () => {
  let page: Page

  beforeEach(() => {
    page = makePage()
  })

  describe("addNode", () => {
    it("inserts a node at the given index", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.addNode({ id: "c", type: "text", value: "New" }, 1)
      })

      expect(result.current.nodes).toHaveLength(3)
      expect(result.current.nodes[1]).toMatchObject({ id: "c", value: "New" })
    })

    it("appends a node when index equals nodes length", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.addNode({ id: "c", type: "text", value: "Last" }, 2)
      })

      expect(result.current.nodes[2]).toMatchObject({ id: "c", value: "Last" })
    })
  })

  describe("removeNodeByIndex", () => {
    it("removes the node at the given index", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.removeNodeByIndex(0)
      })

      expect(result.current.nodes).toHaveLength(1)
      expect(result.current.nodes[0].id).toBe("b")
    })
  })

  describe("changeNodeValue", () => {
    it("updates the value of the node at the given index", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.changeNodeValue(0, "Updated")
      })

      expect(result.current.nodes[0].value).toBe("Updated")
    })

    it("does not affect other nodes", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.changeNodeValue(0, "Updated")
      })

      expect(result.current.nodes[1].value).toBe("World")
    })
  })

  describe("changeNodeType", () => {
    it("updates the type of the node at the given index", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.changeNodeType(0, "heading1")
      })

      expect(result.current.nodes[0].type).toBe("heading1")
    })

    it("resets the node value when changing type", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.changeNodeType(0, "heading1")
      })

      expect(result.current.nodes[0].value).toBe("")
    })
  })

  describe("setTitle", () => {
    it("updates the page title", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.setTitle("New title")
      })

      expect(result.current.title).toBe("New title")
    })
  })

  describe("setCoverImage", () => {
    it("updates the cover image", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.setCoverImage("cover.jpg")
      })

      expect(result.current.cover).toBe("cover.jpg")
    })
  })

  describe("reorderNodes", () => {
    it("swaps positions of two nodes by their ids", () => {
      const { result } = renderHook(() => usePageState(page))

      act(() => {
        result.current.reorderNodes("a", "b")
      })

      expect(result.current.nodes[0].id).toBe("b")
      expect(result.current.nodes[1].id).toBe("a")
    })
  })
})
