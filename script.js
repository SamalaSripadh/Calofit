document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activityLevel = document.getElementById("activityLevel").value;
    const fitnessGoal = document.getElementById("fitnessGoal").value;

    const tdee = calculateTDEE(weight, height, age, gender, activityLevel, fitnessGoal);
    const report = generateReport(tdee, fitnessGoal);
    displayResult(tdee, report);
    window.location.href = `report/report.html?report=${encodeURIComponent(report)}`;
});

function calculateTDEE(weight, height, age, gender, activityLevel, fitnessGoal) {
    let bmr;

    if (gender === "male") {
        bmr = 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age);
    } else if(gender === "female") {
        bmr = 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age);
    }
                                         
    let activityMultiplier = 1.2;
    if (activityLevel === "lightlyActive") activityMultiplier = 1.375;
    else if (activityLevel === "moderatelyActive") activityMultiplier = 1.55;
    else if (activityLevel === "veryActive") activityMultiplier = 1.725;
    else if (activityLevel === "extraActive") activityMultiplier = 1.9;

    let tdee = bmr * activityMultiplier;

    if (fitnessGoal === "weightLoss") {
        tdee -= 500;
    } else if (fitnessGoal === "muscleGain") {
        tdee += 500;
    }

    return tdee;
}

function generateReport(tdee, fitnessGoal) {
    const CARBS_PERCENTAGE = 50;
    const PROTEIN_PERCENTAGE = 30;
    const FAT_PERCENTAGE = 20;

    const carbsInGrams = (CARBS_PERCENTAGE / 100) * tdee / 4;
    const proteinInGrams = (PROTEIN_PERCENTAGE / 100) * tdee / 4;
    const fatInGrams = (FAT_PERCENTAGE / 100) * tdee / 9;

    let caloricIntake;
    if (fitnessGoal === "weightLoss") {
        caloricIntake = tdee - 500;
    } else if (fitnessGoal === "muscleGain") {
        caloricIntake = tdee + 500;
    } else {
        caloricIntake = tdee;
    }

    const report = `
    Your Total Daily Energy Expenditure (TDEE) is: ${tdee.toFixed(2)} calories.<br>
    <br>
    To achieve your fitness goal of ${fitnessGoal}:<br>
    - Target caloric intake: ${caloricIntake.toFixed(2)} calories per day.<br>
    <br>
    Macronutrient distribution:<br>
    - Carbohydrates: ${carbsInGrams.toFixed(2)} grams (${CARBS_PERCENTAGE}% of total calories).<br>
    - Protein: ${proteinInGrams.toFixed(2)} grams (${PROTEIN_PERCENTAGE}% of total calories).<br>
    - Fat: ${fatInGrams.toFixed(2)} grams (${FAT_PERCENTAGE}% of total calories).<br>
    <br>
    Adjust your diet accordingly and consult with a nutritionist for personalized advice.
    `;

    return report;
}

function displayResult(tdee, report) {
    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerHTML = `
        <div class="result-container">
            <div class="result-summary">
                <p>Your estimated Total Daily Energy Expenditure (TDEE) is: ${tdee.toFixed(2)} calories</p>
            </div>
            <div class="result-details">
                <p>Detailed Report:</p>
                <ul>${report}</ul>
            </div>
        </div>
    `;
}
