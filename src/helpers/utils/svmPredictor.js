import * as wrapper from './wrapper.js'
import ort from 'onnxruntime-node'

import path from 'path';

const modelPath = path.join(process.cwd(), 'ai_model', 'model2.onnx');

// Example usage
const labelMapping = {
  0: 'Not Stunted',
  1: 'Stunted',
  2: 'Severely Stunted'
};

async function predict(inputData, modelPath) {
  // Load the appropriate model based on the provided modelPath
  const session = await ort.InferenceSession.create(modelPath);
  const tensor = new ort.Tensor('float32', Float32Array.from(inputData), [1, inputData.length]);
  const results = await session.run({ float_input: tensor });
  const predictedLabel = labelMapping[Number(results.label.data[0])];
  return predictedLabel
}

export const predictStuntingAi = async (dataArray = []) => {
  try {
    const result1 = await predict(dataArray, modelPath);
    return result1
  } catch (error) {
    wrapper.error('An error occurred:', error.message);
  }
}
