const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

function readData(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

app.get('/api/data', (req, res) => {
  const data = readData('data.json');
  res.json(data);
});

app.get('/api/resolved-data', (req, res) => {
  const resolvedData = readData('resolvedData.json');
  res.json(resolvedData);
});

app.post('/api/save-data', async (req, res) => {
  try {
    const jsonData = req.body.data;
    
    // Parse the received data, which includes the date
    const newData = JSON.parse(jsonData);

    // Add the date to the data
    newData.date = new Date().toISOString();

    const existingData = readData('data.json');
    existingData.push(newData);

    await fs.promises.writeFile('data.json', JSON.stringify(existingData, null, 2));

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

app.post('/api/mark-resolved', (req, res) => {
  try {
    // Retrieve the problem's ID that you want to mark as resolved
    const problemId = req.body.id;

    // Fetch the main data (data.json)
    const data = readData('data.json');

    // Find the index of the problem with the given ID
    const resolvedProblemIndex = data.findIndex((problem) => problem.id === problemId);

    if (resolvedProblemIndex !== -1) {
      // Remove the resolved problem from the main data (data.json)
      const resolvedProblem = data.splice(resolvedProblemIndex, 1)[0]; // Store the removed problem

      // Write the updated data back to data.json
      fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

      // Add the resolved problem to the resolved data (resolvedData.json)
      const resolvedData = readData('resolvedData.json');
      resolvedData.push(resolvedProblem);
      fs.writeFileSync('resolvedData.json', JSON.stringify(resolvedData, null, 2));

      res.json({ message: 'Problem marked as resolved successfully' });
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    console.error('Error marking problem as resolved:', error);
    res.status(500).json({ message: 'Error marking problem as resolved' });
  }
});







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
