const calculateTaxes = (totalIncome, filingStatus = 'single') => {
  // State Income Tax (Georgia - 5.75% flat rate)
  const stateIncomeTaxRate = 0.0575;
  const stateIncomeTax = totalIncome * stateIncomeTaxRate;

  // Federal Income Tax
  let federalIncomeTax;
  switch (filingStatus) {
    case 'single':
      federalIncomeTax = calculateFederalTaxSingle(totalIncome);
      break;
    case 'married':
      federalIncomeTax = calculateFederalTaxMarried(totalIncome);
      break;
    case 'headOfHousehold':
      federalIncomeTax = calculateFederalTaxHeadOfHousehold(totalIncome);
      break;
    case 'widowOrWidower':
      federalIncomeTax = calculateFederalTaxWidowOrWidower(totalIncome);
      break;
    // Add more cases for different filing statuses as needed
    default:
      federalIncomeTax = 0;
  }

  // Social Security (6.2% of income)
  const socialSecurityRate = 0.062;
  const socialSecurityTax = Math.min(totalIncome, 142800) * socialSecurityRate;

  // Medicare (1.45% of income)
  const medicareRate = 0.0145;
  const medicareTax = totalIncome * medicareRate;

  // Calculate the final take-home pay
  const takeHomePay = totalIncome - stateIncomeTax - federalIncomeTax - socialSecurityTax - medicareTax;

  return {
    totalIncome,
    stateIncomeTax,
    federalIncomeTax,
    socialSecurityTax,
    medicareTax,
    takeHomePay,
  };
};

// Federal tax calculation for a single filer
const calculateFederalTaxSingle = (income) => {
  // Your specific federal tax calculation logic for single filers goes here
  // Replace this with actual calculations based on IRS tax brackets and rules
  // For demonstration purposes, we'll use simplified calculations
  let federalTax = 0;
  if (income <= 9950) {
    federalTax = income * 0.1;
  } else if (income <= 40525) {
    federalTax = 9950 * 0.1 + (income - 9950) * 0.12;
  } else if (income <= 86375) {
    federalTax = 9950 * 0.1 + (40525 - 9950) * 0.12 + (income - 40525) * 0.22;
  } else {
    // Handle other tax brackets as needed
    // This is just an example and should be adjusted for accuracy
  }
  return federalTax;
};

// Federal tax calculation for a married filer
const calculateFederalTaxMarried = (income) => {
  // Your specific federal tax calculation logic for married filers goes here
  // Replace this with actual calculations based on IRS tax brackets and rules
  // For demonstration purposes, we'll use simplified calculations
  // Adjust the tax brackets and rates accordingly
  let federalTax = 0;
  if (income <= 19900) {
    federalTax = income * 0.1;
  } else if (income <= 81050) {
    federalTax = 19900 * 0.1 + (income - 19900) * 0.12;
  } else if (income <= 172750) {
    federalTax = 19900 * 0.1 + (81050 - 19900) * 0.12 + (income - 81050) * 0.22;
  } else {
    // Handle other tax brackets as needed
    // This is just an example and should be adjusted for accuracy
  }
  return federalTax;
};

// Federal tax calculation for a head of household filer
const calculateFederalTaxHeadOfHousehold = (income) => {
  // Your specific federal tax calculation logic for heads of household goes here
  // Replace this with actual calculations based on IRS tax brackets and rules
  // For demonstration purposes, we'll use simplified calculations
  // Adjust the tax brackets and rates accordingly
  let federalTax = 0;
  if (income <= 14100) {
    federalTax = income * 0.1;
  } else if (income <= 53700) {
    federalTax = 14100 * 0.1 + (income - 14100) * 0.12;
  } else if (income <= 85500) {
    federalTax = 14100 * 0.1 + (53700 - 14100) * 0.12 + (income - 53700) * 0.22;
  } else {
    // Handle other tax brackets as needed
    // This is just an example and should be adjusted for accuracy
  }
  return federalTax;
};

// Federal tax calculation for a widow or widower filer
const calculateFederalTaxWidowOrWidower = (income) => {
  // Your specific federal tax calculation logic for widow or widower filers goes here
  // Replace this with actual calculations based on IRS tax brackets and rules
  // For demonstration purposes, we'll use simplified calculations
  // Adjust the tax brackets and rates accordingly
  let federalTax = 0;
  if (income <= 19900) {
    federalTax = income * 0.1;
  } else if (income <= 81050) {
    federalTax = 19900 * 0.1 + (income - 19900) * 0.12;
  } else if (income <= 172750) {
    federalTax = 19900 * 0.1 + (81050 - 19900) * 0.12 + (income - 81050) * 0.22;
  } else {
    // Handle other tax brackets as needed
    // This is just an example and should be adjusted for accuracy
  }
  return federalTax;
};

// Example usage:
const resultSingle = calculateTaxes(115000, 'single');
console.log(resultSingle);

const resultMarried = calculateTaxes(115000, 'married');
console.log(resultMarried);

const resultHeadOfHousehold = calculateTaxes(115000, 'headOfHousehold');
console.log(resultHeadOfHousehold);

const resultWidowOrWidower = calculateTaxes(115000, 'widowOrWidower');
console.log(resultWidowOrWidower);


