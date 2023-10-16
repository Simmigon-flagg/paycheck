import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {

  const start = 55.50
  const end = start;
  // const end = start + 80;
  const step = 10;

  const dollarAmount = Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) => start + (i * step));


  const Housing = (takeHomePay, typeOfHousing = 'apartment') => {
    console.log(takeHomePay)

    // Federal Income Tax (Simplified for demonstration purposes)
    let afterPayingHousing = 0;

    switch (typeOfHousing) {
      case 'apartment':
        afterPayingHousing = apartmentCosts(totalIncome);
        // federalIncomeTax = calculateFederalTaxSingle(takeHomePay);
        break;

      case 'home':
        afterPayingHousing = homeCosts(totalIncome);
        break;

      default:
        afterPayingHousing = 0;
    }

    return {
      takeHomePay,
      afterPayingHousing,
      typeOfHousing,
    };
  };

  const calculateHousePurchase = (withTakeHomePay, propertyPrice, downPaymentPercentage, annualInterestRate, loanTermYears, propertyTaxRate, insuranceRate) => {
    console.log(withTakeHomePay)

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

  // Example usage:
  // const loanAmount = 200000; // Loan amount in dollars
  // const annualInterestRate = 7.9; // Annual interest rate (in percentage)
  // const loanTermMonths = 360; // Loan term in months (e.g., 30 years)

  // const amortizationSchedule = calculateAmortizationSchedule(loanAmount, annualInterestRate, loanTermMonths);
  // console.log(amortizationSchedule);


  const calculateTaxes = (totalIncome, filingStatus = 'single') => {
    // State Income Tax (Georgia - 5.75% flat rate)
    const stateIncomeTaxRate = 0.0575;
    const stateIncomeTax = totalIncome * stateIncomeTaxRate;

    // Federal Income Tax (Simplified for demonstration purposes)
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
      filingStatus,
      takeHomePay,
      totalIncome,
      stateIncomeTax_GA: stateIncomeTax,
      federalIncomeTax,
      socialSecurityTax,
      medicareTax,
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



  const resultSingle = dollarAmount.map((amount) => calculateTaxes(amount * 40 * 52))
  const withTakeHomePay = dollarAmount.map((amount) => {
    const takehome = calculateTaxes(amount * 40 * 52);
    return takehome.takeHomePay
  })


  const housePurchaseInfo = calculateHousePurchase(withTakeHomePay, 250000, 3, 15.5, 30, 1.25, 0.5);

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

      <div className={styles.center}>
        {/* {JSON.stringify(resultSingle)} */}
        <ul>
          {resultSingle.map((taxes) =>

            <>
              <>{taxes.filingStatus.substring(0, 1).toUpperCase()}{taxes.filingStatus.substring(1, taxes.filingStatus.length)}</>
              <hr />
              <>Salaries: {taxes.totalIncome}</>
              {' '}
              <>Take home: {taxes.takeHomePay.toFixed(2)}</>
              {' '}
              <>Fed Taxes: {taxes.federalIncomeTax.toFixed(2)}</>
              {' '}
              <>Social Security Tax: {taxes.socialSecurityTax.toFixed(2)}</>
              {' '}
              <>Medicare Tax: {taxes.medicareTax.toFixed(2)}</>
              <hr />
              <>
                {taxes.totalIncome} - {taxes.takeHomePay.toFixed(2)} = {(taxes.totalIncome - taxes.takeHomePay).toFixed(2)}
                {' '}
                {' '}
                {' '}
                {((taxes.totalIncome - taxes.takeHomePay) / taxes.totalIncome * 100).toFixed(2)}

              </>
              <hr />
              <br />
            </>
          )}

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
