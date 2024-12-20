import '@testing-library/jest-dom' 

// Более полный мок для Canvas API
const mockContext2D = {
  fillStyle: '',
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
  closePath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn()
}

window.HTMLCanvasElement.prototype.getContext = function() {
  return mockContext2D
}
window.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,fake'

// Мокаем URL API
window.URL.createObjectURL = jest.fn()
window.URL.revokeObjectURL = jest.fn() 