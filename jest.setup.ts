import '@testing-library/jest-dom'
import 'jest-canvas-mock'

// Более полный мок для Canvas API
const mockContext2D = {
  fillStyle: '#000000',
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(),
  putImageData: jest.fn(),
  createImageData: jest.fn(),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  translate: jest.fn(),
  transform: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
} as unknown as CanvasRenderingContext2D;

window.HTMLCanvasElement.prototype.getContext = function(contextId: string) {
  if (contextId === '2d') {
    return mockContext2D;
  }
  return null;
} as any;

window.HTMLCanvasElement.prototype.toDataURL = function() {
  return 'data:image/png;base64,fake';
};

// Мок для Image
class MockImage {
  onload: (() => void) | null = null;
  src: string = '';
  
  constructor() {
    setTimeout(() => {
      if (this.onload) {
        this.onload();
      }
    });
  }
}

global.Image = MockImage as any;

// Мокаем URL API
window.URL.createObjectURL = jest.fn()
window.URL.revokeObjectURL = jest.fn() 