"use strict";

// BMI Facts Configuration
window.BMI_FACTS_CONFIG = {
  // General BMI facts
  general: {
    underweight: [
      "Being underweight can increase the risk of osteoporosis and weakened immune system.",
      "Underweight individuals may have lower muscle mass and reduced physical strength.",
      "Some athletes may have low BMI due to high muscle mass and low body fat.",
      "Underweight can be associated with nutritional deficiencies and eating disorders."
    ],
    normal: [
      "A healthy BMI is associated with lower risk of chronic diseases like heart disease and diabetes.",
      "People with normal BMI tend to have better energy levels and sleep quality.",
      "Maintaining a healthy weight reduces stress on joints and improves mobility.",
      "Normal BMI range varies slightly by age and gender for optimal health."
    ],
    overweight: [
      "Being overweight increases the risk of developing type 2 diabetes and heart disease.",
      "Excess weight can put additional stress on joints, especially knees and hips.",
      "Overweight individuals may experience sleep apnea and breathing difficulties.",
      "Losing just 5-10% of body weight can significantly improve health markers."
    ],
    obese: [
      "Obesity is linked to increased risk of multiple cancers including breast, colon, and kidney.",
      "Severe obesity can reduce life expectancy by 5-20 years depending on age.",
      "Obesity increases the risk of developing fatty liver disease and gallbladder problems.",
      "Bariatric surgery can be an effective treatment for severe obesity when other methods fail."
    ]
  },

  // Age-specific facts
  ageSpecific: {
    children: {
      underweight: [
        "Children need adequate nutrition for proper growth and development.",
        "Underweight children may have delayed puberty and growth.",
        "Consult a pediatrician if your child's BMI is consistently low."
      ],
      normal: [
        "Children's BMI changes naturally as they grow - this is normal and expected.",
        "Focus on healthy eating habits rather than weight at this age.",
        "Regular physical activity helps children maintain healthy weight and build strong bones."
      ],
      overweight: [
        "Childhood obesity can lead to adult obesity and related health problems.",
        "Family-based lifestyle changes are most effective for children.",
        "Encourage fun physical activities rather than focusing on weight loss."
      ],
      obese: [
        "Early intervention is crucial for obese children to prevent long-term health issues.",
        "Work with healthcare providers to create a safe weight management plan.",
        "Focus on building healthy habits that last a lifetime."
      ]
    },
    teens: {
      underweight: [
        "Teen years are crucial for bone development - adequate nutrition is essential.",
        "Some teens may have naturally high metabolism and low body fat.",
        "Ensure adequate protein and calcium intake for healthy growth."
      ],
      normal: [
        "Teen years are ideal for building healthy eating and exercise habits.",
        "BMI naturally fluctuates during puberty - this is completely normal.",
        "Focus on strength training and building muscle mass during these years."
      ],
      overweight: [
        "Teen years are critical for establishing lifelong health patterns.",
        "Peer pressure and body image concerns are common - focus on health, not appearance.",
        "Involve the whole family in making healthy lifestyle changes."
      ],
      obese: [
        "Teen obesity can affect self-esteem and social development.",
        "Professional guidance is important for safe and effective weight management.",
        "Build a support network of family, friends, and healthcare providers."
      ]
    },
    adults: {
      underweight: [
        "Adults with low BMI may have increased risk of infections and slower healing.",
        "Being underweight can affect fertility in both men and women.",
        "Focus on nutrient-dense foods to gain weight healthily."
      ],
      normal: [
        "Maintaining a healthy weight in adulthood reduces risk of age-related diseases.",
        "Regular exercise helps maintain muscle mass as you age.",
        "Your healthy weight range may change slightly as you get older."
      ],
      overweight: [
        "Weight gain in adulthood is common but not inevitable.",
        "Focus on sustainable lifestyle changes rather than quick fixes.",
        "Small changes can make a big difference in long-term health."
      ],
      obese: [
        "Adult obesity is a major risk factor for many chronic diseases.",
        "Even modest weight loss (5-10%) can improve health significantly.",
        "Consider working with a registered dietitian for personalized guidance."
      ]
    },
    seniors: {
      underweight: [
        "Older adults need adequate protein to maintain muscle mass and strength.",
        "Underweight seniors may have increased risk of falls and fractures.",
        "Focus on nutrient-rich foods that are easy to digest and prepare."
      ],
      normal: [
        "Maintaining a healthy weight in older age supports independence and quality of life.",
        "Regular physical activity helps preserve muscle mass and bone density.",
        "Your healthy weight range may be slightly higher as you age."
      ],
      overweight: [
        "Excess weight can make daily activities more difficult for seniors.",
        "Focus on maintaining mobility and strength rather than dramatic weight loss.",
        "Consult healthcare providers about safe exercise options."
      ],
      obese: [
        "Obesity in older adults can accelerate age-related health decline.",
        "Work with healthcare team to create a safe, gradual weight management plan.",
        "Focus on improving mobility and reducing pain rather than just weight loss."
      ]
    }
  },

  // Gender-specific facts
  genderSpecific: {
    male: {
      underweight: [
        "Men typically have higher muscle mass, which can affect BMI interpretation.",
        "Male athletes may have low BMI due to high muscle-to-fat ratio.",
        "Men need adequate protein to maintain muscle mass and strength."
      ],
      normal: [
        "Men typically have higher metabolic rates than women of the same weight.",
        "Regular strength training helps men maintain healthy muscle mass.",
        "Men's healthy BMI range is slightly higher than women's."
      ],
      overweight: [
        "Men tend to carry excess weight around the abdomen, which is higher risk.",
        "Male pattern weight gain often starts in the 30s and 40s.",
        "Focus on reducing belly fat for better health outcomes."
      ],
      obese: [
        "Men with obesity have higher risk of heart disease than women.",
        "Male obesity can affect testosterone levels and fertility.",
        "Men often respond well to structured exercise programs."
      ]
    },
    female: {
      underweight: [
        "Women need adequate body fat for hormone production and fertility.",
        "Female athletes may have irregular menstrual cycles if BMI is too low.",
        "Women naturally have higher body fat percentage than men."
      ],
      normal: [
        "Women's healthy BMI range is slightly lower than men's.",
        "Hormonal changes throughout life can affect weight and body composition.",
        "Focus on overall health rather than just the number on the scale."
      ],
      overweight: [
        "Women tend to carry excess weight in hips and thighs, which is lower risk.",
        "Hormonal changes during menopause can affect weight distribution.",
        "Women often benefit from stress management techniques for weight control."
      ],
      obese: [
        "Female obesity can affect fertility and pregnancy outcomes.",
        "Women with obesity have higher risk of certain cancers.",
        "Consider working with female-focused health professionals."
      ]
    }
  },

  // BMI value specific facts
  bmiSpecific: {
    veryLow: [
      "BMI below 16.5 is considered severely underweight and requires medical attention.",
      "Very low BMI can indicate underlying health conditions or eating disorders.",
      "Focus on gradual weight gain with nutrient-dense foods."
    ],
    low: [
      "BMI 16.5-18.4 is mildly underweight but may be normal for some individuals.",
      "Consider if low BMI affects your energy levels or daily activities.",
      "Small dietary changes can help reach a healthier weight range."
    ],
    healthyLow: [
      "BMI 18.5-22 is in the lower healthy range - great for cardiovascular health.",
      "You're in an excellent weight range for overall health and longevity.",
      "Focus on maintaining this healthy weight through balanced nutrition and exercise."
    ],
    healthyMid: [
      "BMI 22-24.9 is in the middle of the healthy range - optimal for most people.",
      "This range is associated with lowest risk of chronic diseases.",
      "You're doing great! Focus on maintaining these healthy habits."
    ],
    healthyHigh: [
      "BMI 25-26.9 is slightly above normal but still generally healthy.",
      "Consider if you're gaining weight and address any lifestyle changes.",
      "Small adjustments now can prevent future health issues."
    ],
    overweight: [
      "BMI 27-29.9 is in the overweight category - time to take action.",
      "Focus on sustainable lifestyle changes rather than quick fixes.",
      "Even small weight loss can improve health markers significantly."
    ],
    obese1: [
      "BMI 30-34.9 is Class I obesity - professional guidance recommended.",
      "This level of obesity increases risk of multiple health conditions.",
      "Work with healthcare providers to create a comprehensive plan."
    ],
    obese2: [
      "BMI 35-39.9 is Class II obesity - medical intervention may be needed.",
      "Consider working with obesity specialists for best results.",
      "Bariatric surgery may be an option for some individuals."
    ],
    obese3: [
      "BMI 40+ is Class III obesity - requires comprehensive medical care.",
      "This level of obesity significantly impacts quality of life.",
      "Professional medical team approach is essential for safe management."
    ]
  }
};

// Function to get appropriate facts based on BMI, age, and gender
function getBMIFacts(bmi, age, gender, category) {
  const facts = [];
  
  // Get general category facts
  if (BMI_FACTS_CONFIG.general[category.toLowerCase()]) {
    facts.push(...BMI_FACTS_CONFIG.general[category.toLowerCase()]);
  }
  
  // Get age-specific facts
  let ageGroup = 'adults';
  if (age < 13) ageGroup = 'children';
  else if (age < 20) ageGroup = 'teens';
  else if (age >= 65) ageGroup = 'seniors';
  
  if (BMI_FACTS_CONFIG.ageSpecific[ageGroup] && BMI_FACTS_CONFIG.ageSpecific[ageGroup][category.toLowerCase()]) {
    facts.push(...BMI_FACTS_CONFIG.ageSpecific[ageGroup][category.toLowerCase()]);
  }
  
  // Get gender-specific facts
  if (BMI_FACTS_CONFIG.genderSpecific[gender] && BMI_FACTS_CONFIG.genderSpecific[gender][category.toLowerCase()]) {
    facts.push(...BMI_FACTS_CONFIG.genderSpecific[gender][category.toLowerCase()]);
  }
  
  // Get BMI value specific facts
  if (bmi < 16.5) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.veryLow);
  } else if (bmi < 18.5) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.low);
  } else if (bmi < 22) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.healthyLow);
  } else if (bmi < 25) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.healthyMid);
  } else if (bmi < 27) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.healthyHigh);
  } else if (bmi < 30) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.overweight);
  } else if (bmi < 35) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.obese1);
  } else if (bmi < 40) {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.obese2);
  } else {
    facts.push(...BMI_FACTS_CONFIG.bmiSpecific.obese3);
  }
  
  // Return unique facts (remove duplicates)
  return [...new Set(facts)];
}

// Export the function
window.getBMIFacts = getBMIFacts; 