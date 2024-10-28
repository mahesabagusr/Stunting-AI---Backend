// Import the class from the npm package (assuming published)
import SVMPredictor from 'svm-predictor'

// Create an instance and use it as before
const model1 = new SVMPredictor('ai_model/model1.onnx', 'ai_model/labels.txt');
const model2 = new SVMPredictor('ai_model/model2.onnx', 'ai_model/labels.txt');

(async () => {
  const result1 = await model1.predict([12, 1, 149, 43]);
  console.log(`Result 1: ${result1}`);

  const result2 = await model2.predict([10, 1, 127, 34, 21.08, 54, 236, 17, 1261]);
  console.log(`Result 2: ${result2}`);
})();