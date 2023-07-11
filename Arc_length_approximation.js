let a = 0;
let b = 3;
let numSegments = 10;
let length = 0;
let segmentSlider;

function setup() {
  createCanvas(450, 400);

  // Create slider for number of segments
  segmentSlider = createSlider(1, 10, numSegments);
  segmentSlider.position(20, height + 20);
}

function draw() {
  background(220);
  
  let segments = segmentSlider.value();
  
  // Draw the function curve
  drawFunction();
  
  // Draw the line segments
  drawLineSegments(segments);
  
  // Calculate the length of line segments
  let length = calculateLength(segments);
  
  // Display the estimated length
  displayLength(length);
}

function drawFunction() {
  // Draw the function curve
  noFill();
  stroke(0);
  strokeWeight(2);
  beginShape();
  for (let x = a; x <= b; x += 0.01) {
    let y = map(f(x), 0, 1, height, 0);
    vertex(map(x, a, b, 0, width), y);
  }
  endShape();
  
  // Draw the points (0, f(0)) and (3, f(3))
  strokeWeight(4);
  point(map(0, a, b, 0, width), map(f(0), 0, 1, height, 0));
  point(map(3, a, b, 0, width), map(f(3), 0, 1, height, 0));
}

function drawLineSegments(segments) {
  // Draw the line segments
  stroke(255, 0, 0);
  strokeWeight(1);
  for (let i = 0; i <= segments; i++) {
    let x1 = map(i * ((b - a) / segments), a, b, 0, width);
    let x2 = map((i + 1) * ((b - a) / segments), a, b, 0, width);
    let y1 = map(f(i * ((b - a) / segments)), 0, 1, height, 0);
    let y2 = map(f((i + 1) * ((b - a) / segments)), 0, 1, height, 0);
    line(x1, y1, x2, y2);
  }
}

function calculateLength(segments) {
  // Calculate the length of line segments
  let sum = 0;
  for (let i = 0; i < segments; i++) {
    let x1 = a + i * ((b - a) / segments);
    let x2 = a + (i + 1) * ((b - a) / segments);
    let y1 = f(x1);
    let y2 = f(x2);
    sum += Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  return sum;
}

function displayLength(length) {
  // Display the estimated length
  textSize(20);
  textAlign(CENTER);
  text("Estimated Length: " + length.toFixed(4), width / 2, height - 20);
}

// Define the function
function f(x) {
  return Math.pow(1 - x, 2);
}