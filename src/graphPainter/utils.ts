export const getContext2d = (canvasId: string): CanvasRenderingContext2D => {
  const canvas = document.getElementById(canvasId);

  if (canvas instanceof HTMLCanvasElement) {
    const context2d = canvas.getContext('2d');
    if (context2d !== null) {
      return context2d;
    }
  }

  throw new Error(`No context for ${canvasId} canvas`);
};
