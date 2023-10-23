
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {

  const start = 31.75;
  const end = start;
  // const end = start + 80;
  const step = 10;
  const rent = 1856;

  // 
  const RULE28 = 0.28
  const RULE36 = 0.36
  const housingCost = 900;
  const otherDebts = 300;
  const totalDebt = housingCost + otherDebts
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: 2 }, (_, index) => currentYear + index);

  const dollarAmount = Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) => start + (i * step));

  // Example usage:
  // const loanAmount = 200000; // Loan amount in dollars
  // const annualInterestRate = 7.9; // Annual interest rate (in percentage)
  // const loanTermMonths = 360; // Loan term in months (e.g., 30 years)
  // const amortizationSchedule = calculateAmortizationSchedule(loanAmount, annualInterestRate, loanTermMonths);
  // console.log(amortizationSchedule);


  const calculateTaxes = (yearlyIncomeBeforeTaxes, filingStatus = 'single') => {
    // State Income Tax (Georgia - 5.75% flat rate)
    const stateIncomeTaxRate = 0.0575;
    const stateIncomeTax = yearlyIncomeBeforeTaxes * stateIncomeTaxRate;

    // Federal Income Tax (Simplified for demonstration purposes)
    let federalIncomeTax;
    switch (filingStatus) {
      case 'single':
        federalIncomeTax = calculateFederalTaxSingle(yearlyIncomeBeforeTaxes);
        break;
      case 'married':
        federalIncomeTax = calculateFederalTaxMarried(yearlyIncomeBeforeTaxes);
        break;
      case 'headOfHousehold':
        federalIncomeTax = calculateFederalTaxHeadOfHousehold(yearlyIncomeBeforeTaxes);
        break;
      case 'widowOrWidower':
        federalIncomeTax = calculateFederalTaxWidowOrWidower(yearlyIncomeBeforeTaxes);
        break;
      default:
        federalIncomeTax = 0;
    }

    // Social Security (6.2% of income)
    const socialSecurityRate = 0.062;
    const socialSecurityTax = Math.min(yearlyIncomeBeforeTaxes, 142800) * socialSecurityRate;

    // Medicare (1.45% of income)
    const medicareRate = 0.0145;
    const medicareTax = yearlyIncomeBeforeTaxes * medicareRate;

    // Calculate the final take-home pay
    const yearlyTakeHomePay = yearlyIncomeBeforeTaxes - stateIncomeTax - federalIncomeTax - socialSecurityTax - medicareTax;
    // Calculate the final take-home pay afterbudeting
    const yearlyNecessities = yearlyTakeHomePay * 50 / 100;
    const yearlyWants = yearlyTakeHomePay * 30 / 100;
    const yearlySaving = yearlyTakeHomePay * 20 / 100;
    return {
      hourly: start,
      yearlyTakeHomePay,
      yearlyIncomeBeforeTaxes,

      monthlyIncomeBeforeTaxes: (yearlyIncomeBeforeTaxes / 12).toFixed(2),
      biWeeklyIncomeBeforeTaxes: (yearlyIncomeBeforeTaxes / 26).toFixed(2),
      weeklyIncomeBeforeTaxes: (yearlyIncomeBeforeTaxes / 52).toFixed(2),

      filingStatus,

      monthlyTakeHomePay: (yearlyTakeHomePay / 12).toFixed(2),
      biweeklyTakeHomePay: (yearlyTakeHomePay / 26).toFixed(2),
      weeklyTakeHomePay: (yearlyTakeHomePay / 52).toFixed(2),

      ROTH401k: 0,
      HSA: 0,

      // yearlySaving: ( yearlySaving / 12),      
      monthlyNecessities: (yearlyNecessities / 12).toFixed(2),
      monthlyWants: (yearlyWants / 12).toFixed(2),
      monthlySaving: (yearlySaving / 12).toFixed(2),

      biweeklyNecessities: (yearlyNecessities / 26).toFixed(2),
      biweeklyWants: (yearlyWants / 26).toFixed(2),
      biweeklySaving: (yearlySaving / 26).toFixed(2),

      weeklyNecessities: (yearlyNecessities / 52).toFixed(2),
      weeklyWants: (yearlyWants / 52).toFixed(2),
      weeklySaving: (yearlySaving / 52).toFixed(2),

      yearlyNecessities: yearlyNecessities.toFixed(2),
      yearlyWants: yearlyWants.toFixed(2),
      yearlySaving: yearlySaving.toFixed(2),

      federalIncomeTax,
      stateIncomeTax_GA: stateIncomeTax.toFixed(2),
      socialSecurityTax,
      medicareTax: medicareTax.toFixed(2),
      PITI: {
        grossMonthlyIncome: (yearlyIncomeBeforeTaxes / 12).toFixed(2),
        housingCost,
        otherDebts,
        frontEnd: {
          rate: 0.28,
          spendless: (yearlyIncomeBeforeTaxes / 12).toFixed(2) * RULE28,
          ratio: (housingCost / (yearlyIncomeBeforeTaxes / 12).toFixed(2) * 100).toFixed(2),
          mortgagePayments: 0,
          propertyTaxes: 0,
          insurance: 0,
        },
        backEnd: {
          rate: 0.36,
          spendless: (yearlyIncomeBeforeTaxes / 12).toFixed(2) * RULE28,
          spendless: (yearlyIncomeBeforeTaxes / 12).toFixed(2) * RULE36,
          totalDebt,
          ratio: ((totalDebt) / (yearlyIncomeBeforeTaxes / 12).toFixed(2) * 100).toFixed(2),
          housingExpenses: 0,
          carPayment: 0,
          creditCard: 0,
          studentLoans: 0
        },
      }

    };
  };

  // Federal tax calculation for a single filer (Simplified for demonstration purposes)
  const calculateFederalTaxSingle = (income) => {
    let federalTax = 0;
    if (income <= 9950) {
      federalTax = income * 0.1;
    } else if (income <= 40525) {
      federalTax = 9950 * 0.1 + (income - 9950) * 0.12;
    } else if (income <= 86375) {
      federalTax = 9950 * 0.1 + (40525 - 9950) * 0.12 + (income - 40525) * 0.22;
    } else {
      federalTax = 9950 * 0.1 + (40525 - 9950) * 0.12 + (86375 - 40525) * 0.22 + (income - 86375) * 0.24;
    }
    return federalTax;
  };

  // Federal tax calculation for a married filer (Simplified for demonstration purposes)
  const calculateFederalTaxMarried = (income) => {
    let federalTax = 0;
    if (income <= 19900) {
      federalTax = income * 0.1;
    } else if (income <= 81050) {
      federalTax = 19900 * 0.1 + (income - 19900) * 0.12;
    } else if (income <= 172750) {
      federalTax = 19900 * 0.1 + (81050 - 19900) * 0.12 + (income - 81050) * 0.22;
    } else {
      federalTax = 19900 * 0.1 + (81050 - 19900) * 0.12 + (172750 - 81050) * 0.22 + (income - 172750) * 0.24;
    }
    return federalTax;
  };

  // Federal tax calculation for a head of household filer (Simplified for demonstration purposes)
  const calculateFederalTaxHeadOfHousehold = (income) => {
    let federalTax = 0;
    if (income <= 14100) {
      federalTax = income * 0.1;
    } else if (income <= 53700) {
      federalTax = 14100 * 0.1 + (income - 14100) * 0.12;
    } else if (income <= 85500) {
      federalTax = 14100 * 0.1 + (53700 - 14100) * 0.12 + (income - 53700) * 0.22;
    } else {
      federalTax = 14100 * 0.1 + (53700 - 14100) * 0.12 + (85500 - 53700) * 0.22 + (income - 85500) * 0.24;
    }
    return federalTax;
  };

  // Federal tax calculation for a widow or widower filer (Simplified for demonstration purposes)
  const calculateFederalTaxWidowOrWidower = (income) => {
    let federalTax = 0;
    if (income <= 19900) {
      federalTax = income * 0.1;
    } else if (income <= 81050) {
      federalTax = 19900 * 0.1 + (income - 19900) * 0.12;
    } else if (income <= 172750) {
      federalTax = 19900 * 0.1 + (81050 - 19900) * 0.12 + (income - 81050) * 0.22;
    } else {
      federalTax = 19900 * 0.1 + (81050 - 19900) * 0.12 + (172750 - 81050) * 0.22 + (income - 172750) * 0.24;
    }
    return federalTax;
  };



  // const resultTwoWeek = dollarAmount.map((amount) => calculateTaxes(amount * 80))

  // const resultS = dollarAmount.map((amount) => calculateTaxes(amount * 40 * 52))
  const years = dollarAmount.map((amount) => calculateTaxes(amount * 40 * 52))
  const days = dollarAmount.map((amount) => calculateTaxes(amount * 8))
  const weeks = dollarAmount.map((amount) => calculateTaxes(amount * 40))
  const twoWeeks = dollarAmount.map((amount) => calculateTaxes(amount * 80))
  const months = dollarAmount.map((amount) => calculateTaxes(amount * 8 * 31))

  const withTakeHomePay = dollarAmount.map((amount) => {
    const takehome = calculateTaxes(amount * 40 * 52);
    return takehome.yearlyTakeHomePay
  })



  const Housing = (yearlyTakeHomePay, typeOfHousing = 'apartment') => {
    // console.log(yearlyTakeHomePay)

    // Federal Income Tax (Simplified for demonstration purposes)
    let afterPayingHousing = 0;

    switch (typeOfHousing) {
      case 'apartment':
        afterPayingHousing = apartmentCosts(yearlyIncomeBeforeTaxes);
        // federalIncomeTax = calculateFederalTaxSingle(yearlyTakeHomePay);
        break;

      case 'home':
        afterPayingHousing = homeCosts(yearlyIncomeBeforeTaxes);
        break;

      default:
        afterPayingHousing = 0;
    }

    return {
      yearlyTakeHomePay,
      afterPayingHousing,
      typeOfHousing,
    };
  };

  const calculateSavings = (incomeAfterTaxes) => {
    // 50% of $4500 to your yearlyNecessities, which is
    // (4500 × 50) / 100 = $2250;
    // I may change this rule for myself
    const budgetingRule = {
      yearlyNecessities: incomeAfterTaxes * 50 / 100,
      yearlyWants: incomeAfterTaxes * 30 / 100,
      yearlySaving: incomeAfterTaxes * 20 / 100
    };

    // 30% of $4500 to your yearlyWants, which is
    // (4500 × 30) / 100 = $1350; and
    // 20% of $4500 to your savings, which is
    // (4500 × 20) / 100 = $900.    
    return budgetingRule;

  }


  const calculateHousePurchase = (withTakeHomePay, propertyPrice, downPaymentPercentage, annualInterestRate, loanTermYears, propertyTaxRate, insuranceRate) => {


    // Calculate down payment amount
    const downPayment = (downPaymentPercentage / 100) * propertyPrice;

    // Calculate loan amount
    const loanAmount = propertyPrice - downPayment;

    // Calculate monthly mortgage payment
    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const totalMonths = loanTermYears * 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

    // Calculate property tax and insurance
    const annualPropertyTax = propertyPrice * (propertyTaxRate / 100);
    const monthlyPropertyTax = annualPropertyTax / 12;
    const annualInsurance = propertyPrice * (insuranceRate / 100);
    const monthlyInsurance = annualInsurance / 12;

    // Calculate total monthly expenses (mortgage + tax + insurance)
    const totalMonthlyExpenses = monthlyPayment + monthlyPropertyTax + monthlyInsurance;

    // Calculate total cost of the loan (including interest)
    const totalLoanCost = monthlyPayment * totalMonths;

    // Calculate equity built over the loan term
    const equityBuilt = totalLoanCost - loanAmount;

    return {
      propertyPrice,
      downPaymentPercentage,
      downPayment,
      loanAmount,
      annualInterestRate,
      loanTermYears,
      monthlyPayment,
      annualPropertyTax,
      monthlyPropertyTax,
      annualInsurance,
      monthlyInsurance,
      totalMonthlyExpenses,
      totalLoanCost,
      equityBuilt,




    };
  };
  const housePurchaseInfo = calculateHousePurchase(withTakeHomePay, 250000, 3, 15.5, 30, 1.25, 0.5);

  // Example usage:
  // propertyPrice, downPaymentPercentage, annualInterestRate, loanTermYears, propertyTaxRate, insuranceRate

  const calculateAmortizationSchedule = (loanAmount, annualInterestRate, loanTermMonths) => {
    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));

    let remainingBalance = loanAmount;
    const amortizationSchedule = [];

    // for (let month = 1; month <= loanTermMonths; month++) {
    for (let month = 1; month <= 1; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;

      amortizationSchedule.push({
        month,
        monthlyPayment,
        principalPayment,
        interestPayment,
        remainingBalance,
      });

      remainingBalance -= principalPayment;
    }

    return amortizationSchedule;
  };
  let yearlyTakeHomePay = 0;
  let yearlyNecessities = 0;
  let savings = 0;
  let yearlyWants = 0;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.js</code>

        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}

              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      ${start}
      <div className={styles.center}>
        {/* {JSON.stringify(resultSingle)} */}
        <ul>
          {/* 
          {monthly.map((taxes) =>

            <>
              <>Monthly (4 weeks) Estimate {taxes.filingStatus.substring(0, 1).toUpperCase()}{taxes.filingStatus.substring(1, taxes.filingStatus.length)} After Tax:  <span style={{ color: 'CYAN' }}>{taxes.yearlyTakeHomePay.toFixed(2)}</span></>
              <hr />
              {' '}
              <>Salaries: {taxes.yearlyIncomeBeforeTaxes.toFixed(2)}</>
              {' '}
              <>Fed Taxes: {taxes.federalIncomeTax.toFixed(2)}</>
              {' '}
              <>Social Security Tax: {taxes.socialSecurityTax.toFixed(2)}</>
              {' '}
              <>Medicare Tax: {taxes.medicareTax.toFixed(2)}</>
              <hr />
              <>
                {taxes.yearlyIncomeBeforeTaxes.toFixed(2)} - {taxes.yearlyTakeHomePay.toFixed(2)} = {(taxes.yearlyIncomeBeforeTaxes.toFixed(2) - taxes.yearlyTakeHomePay).toFixed(2)}
                {' '}
                {' '}
                {' '}
                {((taxes.yearlyIncomeBeforeTaxes - taxes.yearlyTakeHomePay) / taxes.yearlyIncomeBeforeTaxes * 100).toFixed(2)}

              </>
              <hr />
              <br />
              <br />
              <h5>Monthly (4 weeks) Estimate Rule</h5>
              <>yearlyNecessities: <span style={{ color: 'CYAN' }}>{taxes.yearlyNecessities.toFixed(2)}</span></> {' '}
              <>yearlyWants: {taxes.yearlyWants.toFixed(2)}</>{' '}
              <>yearlySaving: {taxes.yearlySaving.toFixed(2)}</>{' '}
              <hr />
              <br />
              <>Rent:  {rent}</> {' '}
              <br />
              <>Car: {441}</> {' '}
              <br />
              <>Phone: {301}</> {' '}
              <br />

              <br />
              <h5></h5>
              <>yearlyNecessities: {taxes.yearlyNecessities - rent}</> {' '}
              <>yearlyWants: {taxes.yearlyWants.toFixed(2)}</>{' '}
              <>yearlySaving: {taxes.yearlySaving.toFixed(2)}</>{' '}
              <hr />
              <br />


            </>
          )}

          {twoWeeks.map((taxes) =>

            <>
              <>Two Weeks {taxes.filingStatus.substring(0, 1).toUpperCase()}{taxes.filingStatus.substring(1, taxes.filingStatus.length)} After Tax:  <span style={{ color: 'CYAN' }}>{taxes.yearlyTakeHomePay.toFixed(2)}</span></>
              <hr />
              {' '}
              <>Salaries: {taxes.yearlyIncomeBeforeTaxes}</>
              {' '}
              <>Fed Taxes: {taxes.federalIncomeTax.toFixed(2)}</>
              {' '}
              <>Social Security Tax: {taxes.socialSecurityTax.toFixed(2)}</>
              {' '}
              <>Medicare Tax: {taxes.medicareTax.toFixed(2)}</>
              <hr />
              <>
                {taxes.yearlyIncomeBeforeTaxes} - {taxes.yearlyTakeHomePay.toFixed(2)} = {(taxes.yearlyIncomeBeforeTaxes - taxes.yearlyTakeHomePay).toFixed(2)}
                {' '}
                {' '}
                {' '}
                {((taxes.yearlyIncomeBeforeTaxes - taxes.yearlyTakeHomePay) / taxes.yearlyIncomeBeforeTaxes * 100).toFixed(2)}

              </>
              <hr />
              <br />
              <br />
              <h5>Two Weeks Rule</h5>
          
              <>yearlyNecessities:     <span style={{ color: 'CYAN' }}>{taxes.yearlyNecessities.toFixed(2)}</span></> {' '}
              <>yearlyWants: {taxes.yearlyWants.toFixed(2)}</>{' '}
              <>yearlySaving: {taxes.yearlySaving.toFixed(2)}</>{' '}
              <hr />

            </>
          )}
          <br /> */}
          { }
          {

            years.map(earning => {
              console.log('earning')

              console.log(earning)


              yearsArray.map((year, index) => {
                console.log('Year ', year, index + 1)
                yearlyTakeHomePay += earning.yearlyTakeHomePay;
                yearlyNecessities += earning.yearlyNecessities;
                savings += earning.yearlySaving;
                yearlyWants += earning.yearlyWants;
                console.log('Rent is', rent, "a month and for the year it's", rent * 12, "yearly Necessities after rent", yearlyNecessities - (12 * rent), "savings", savings, "yearly Wants", yearlyWants)
                // console.log("yearlyNecessities: " + yearlyNecessities.toFixed(2) / 12 + " yearlyWants: " + yearlyWants.toFixed(2) / 12 + " Savings: " + savings.toFixed(2) / 4 + "\n");
                // console.log(index + ": " + years + ": Total Take Home: " + yearlyTakeHomePay.toFixed(2));
                // console.log("yearlyNecessities: " + yearlyNecessities.toFixed(2) + " yearlyWants: " + yearlyWants.toFixed(2) + " Savings: " + savings.toFixed(2) + "\n");                
                // Amortization
              })
            })
          }
        </ul>
      </div>

      <div className={styles.grid}>
        <div>
          <h2>Home</h2>
          <p>
            propertyPrice: {housePurchaseInfo.propertyPrice.toFixed(2)}<br />
            annualInterestRate:  {housePurchaseInfo.annualInterestRate.toFixed(2)}<br />
            downPayment: {housePurchaseInfo.downPayment.toFixed(2)}<br />
            monthlyPayment: {housePurchaseInfo.monthlyPayment.toFixed(2)}<br />
            loanTermYears: {housePurchaseInfo.loanTermYears.toFixed(2)}<br />
            equityBuilt: {housePurchaseInfo.equityBuilt.toFixed(2)}<br />
            annualInsurance:  {housePurchaseInfo.annualInsurance.toFixed(2)}<br />
            annualPropertyTax: {housePurchaseInfo.annualPropertyTax.toFixed(2)}<br />
            downPaymentPercentage: {housePurchaseInfo.downPaymentPercentage.toFixed(2)}<br />
            loanAmount: {housePurchaseInfo.loanAmount.toFixed(2)}<br />
            monthlyInsurance: {housePurchaseInfo.monthlyInsurance.toFixed(2)}<br />
            monthlyPropertyTax: {housePurchaseInfo.monthlyPropertyTax.toFixed(2)}<br />
            totalLoanCost: {housePurchaseInfo.totalLoanCost.toFixed(2)}<br />
            totalMonthlyExpenses: {housePurchaseInfo.totalMonthlyExpenses.toFixed(2)}<br />
          </p>
        </div>

        <div>
          <h2>Home</h2>
          <p>

          </p>
        </div>
      </div>
    </main>
  )
}
