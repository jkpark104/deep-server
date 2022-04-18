exports.getBmi = (payload) => {
  const { name, height, weight } = payload;

  const bmi = +weight / (+height) ** 2;
  const bmiPercentage = Math.round(bmi * 100) / 100;

  const result = { name, height, weight };
  console.log(`계산중인 값들 : ${JSON.stringify(result)}`);

  if (bmiPercentage < 18.5) result.bmi = '저체중';
  else if (bmiPercentage <= 25) result.bmi = '정상';
  else if (bmiPercentage <= 30) result.bmi = '과체중';
  else result.bmi = '경도비만';
  console.log(`계산끝난 값들 : ${JSON.stringify(result)}`);

  return result;
};
