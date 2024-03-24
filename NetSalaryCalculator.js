// Function to calculate Payee (Tax)
function calculatePayee(grossSalary) {
    let taxRates = [
        { min: 0, max: 24000, rate: 10 },
        { min: 24001, max: 32333, rate: 15 },
        { min: 32334, max: 40000, rate: 20 },
        { min: 40001, max: 53333, rate: 25 },
        { min: 53334, max: Infinity, rate: 30 }
    ];

    let tax = 0;
    for (let i = 0; i < taxRates.length; i++) {
        if (grossSalary > taxRates[i].min && grossSalary <= taxRates[i].max) {
            tax = taxRates[i].rate / 100 * (grossSalary - taxRates[i].min);
            break;
        } else if (grossSalary > taxRates[i].max) {
            tax += taxRates[i].rate / 100 * (taxRates[i].max - taxRates[i].min);
        }
    }
    return tax;
}

// Function to calculate NHIF Deductions
function calculateNhifDeductions(grossSalary) {
    let nhifDeductions = [
        { min: 0, max: 5999, amount: 150 },
        { min: 6000, max: 7999, amount: 300 },
        // Add more ranges as needed
    ];

    let nhif = 0;
    for (let i = 0; i < nhifDeductions.length; i++) {
        if (grossSalary > nhifDeductions[i].min && grossSalary <= nhifDeductions[i].max) {
            nhif = nhifDeductions[i].amount;
            break;
        }
    }
    return nhif;
}

// Function to calculate NSSF Deductions
function calculateNssfDeductions(grossSalary) {
    let nssfDeductions = { min: 6000, max: 18000, employeeRate: 6, employerRate: 6, totalRate: 12 };
    let nssfEmployee = grossSalary * (nssfDeductions.employeeRate / 100);
    let nssfEmployer = grossSalary * (nssfDeductions.employerRate / 100);
    return { employee: nssfEmployee, employer: nssfEmployer, total: nssfEmployee + nssfEmployer };
}

// Function to calculate Net Salary
function calculateNetSalary(basicSalary, benefits) {
    let grossSalary = basicSalary + benefits;
    let payee = calculatePayee(grossSalary);
    let nhif = calculateNhifDeductions(grossSalary);
    let nssf = calculateNssfDeductions(grossSalary).total;
    let netSalary = grossSalary - payee - nhif - nssf;
    
    return {
        grossSalary: grossSalary,
        payee: payee,
        nhif: nhif,
        nssf: nssf,
        netSalary: netSalary
    };
}

// Example usage
let basicSalary = 50000;
let benefits = 10000;
let salaryDetails = calculateNetSalary(basicSalary, benefits);
console.log("Gross Salary:", salaryDetails.grossSalary);
console.log("Payee (Tax):", salaryDetails.payee);
console.log("NHIF Deductions:", salaryDetails.nhif);
console.log("NSSF Deductions:", salaryDetails.nssf);
console.log("Net Salary:", salaryDetails.netSalary);
