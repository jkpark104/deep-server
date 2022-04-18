const { getBmi } = require('../services/basic.service');

module.exports = ({ url, app }) => {
  app.post(`${url}/bmi`, (req, res) => {
    const { name, height, weight } = req.body;
    console.log(`넘어온 JSON 값 : ${JSON.stringify(req.body)}`);
    console.log(`이름 : ${name}`);
    console.log(`키 : ${height}`);
    console.log(`몸무게 : ${weight}`);

    const bmi = getBmi({ name, height, weight });
    console.log(`계산된 JSON 값 : ${JSON.stringify(bmi)}`);
    res.status(200).json(bmi);
  });
};
