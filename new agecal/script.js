function calculateAge() {
    const dobInput = document.getElementById('dob');
    const dob = new Date(dobInput.value);
    const today = new Date();
    const resultElement = document.getElementById('result');

    if (isNaN(dob.getTime())) {
        resultElement.style.color = '#dc3545'; // Error color
        resultElement.style.backgroundColor = '#f8d7da';
        resultElement.style.borderColor = '#f5c6cb';
        resultElement.innerText = 'Please enter a valid date of birth.';
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Days in previous month
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    resultElement.style.color = '#28a745'; // Success color
    resultElement.style.backgroundColor = '#e6ffed';
    resultElement.style.borderColor = '#c3e6cb';
    resultElement.innerText = `Your age is ${years} years, ${months} months, and ${days} days.`;
}

function calculateAgeInDays() {
    const dobInput = document.getElementById('dob');
    const dob = new Date(dobInput.value);
    const today = new Date();
    const resultElement = document.getElementById('result');

    if (isNaN(dob.getTime())) {
        resultElement.style.color = '#dc3545';
        resultElement.style.backgroundColor = '#f8d7da';
        resultElement.style.borderColor = '#f5c6cb';
        resultElement.innerText = 'Please enter a valid date of birth.';
        return;
    }

    const diffTime = Math.abs(today - dob);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    resultElement.style.color = '#28a745';
    resultElement.style.backgroundColor = '#e6ffed';
    resultElement.style.borderColor = '#c3e6cb';
    resultElement.innerText = `Your age is ${diffDays} days.`;
}

function calculateAgeInMonths() {
    const dobInput = document.getElementById('dob');
    const dob = new Date(dobInput.value);
    const today = new Date();
    const resultElement = document.getElementById('result');

    if (isNaN(dob.getTime())) {
        resultElement.style.color = '#dc3545';
        resultElement.style.backgroundColor = '#f8d7da';
        resultElement.style.borderColor = '#f5c6cb';
        resultElement.innerText = 'Please enter a valid date of birth.';
        return;
    }

    let months = (today.getFullYear() - dob.getFullYear()) * 12;
    months -= dob.getMonth();
    months += today.getMonth();

    if (today.getDate() < dob.getDate()) {
        months--;
    }

    resultElement.style.color = '#28a745';
    resultElement.style.backgroundColor = '#e6ffed';
    resultElement.style.borderColor = '#c3e6cb';
    resultElement.innerText = `Your age is ${months} months.`;
}

function calculateAgeDifference() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const resultElement = document.getElementById('result');

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        resultElement.style.color = '#dc3545';
        resultElement.style.backgroundColor = '#f8d7da';
        resultElement.style.borderColor = '#f5c6cb';
        resultElement.innerText = 'Please enter valid start and end dates.';
        return;
    }

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    resultElement.style.color = '#28a745';
    resultElement.style.backgroundColor = '#e6ffed';
    resultElement.style.borderColor = '#c3e6cb';
    resultElement.innerText = `The difference is ${years} years, ${months} months, and ${days} days.`;
}