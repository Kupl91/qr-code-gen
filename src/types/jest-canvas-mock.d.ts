declare module 'jest-canvas-mock' {
  const jestCanvasMock: {
    default: typeof jest;
  };
  export default jestCanvasMock;

  global {
    interface Window {
      HTMLCanvasElement: {
        prototype: {
          getContext: (contextId: string) => CanvasRenderingContext2D | null;
          toDataURL: () => string;
        };
      };
    }
  }
}

export {};