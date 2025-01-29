import readline from 'readline/promises';
import { stdin as input, stdout as output, exit } from 'process';
import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';

const rl = readline.createInterface({ input, output });

console.log(chalk.cyan(figlet.textSync('Calculator', { horizontalLayout: 'full' })));
console.log(chalk.blueBright("\n🌟 Welcome to the Simple Calculator 🌟"));
console.log(chalk.gray("\n(Press 'q' at any time to exit)\n"));

async function getValidNumber(promptText) {
    while (true) {
        const userInput = await rl.question(chalk.yellow(promptText));
        
        if (userInput.toLowerCase() === 'q') {
            console.log(chalk.redBright("\n👋 Exiting the calculator. Goodbye!\n"));
            rl.close();
            exit(0);
        }

        const number = Number(userInput);
        if (!isNaN(number)) {
            return number;
        }

        console.log(chalk.redBright("❌ Invalid input! Please enter a valid number."));
    }
}

async function getValidOperation() {
    const validOperations = ["+", "-", "*", "/"];

    while (true) {
        const operation = await rl.question(chalk.green('Enter operation (+, -, *, /): '));

        if (operation.toLowerCase() === 'q') {
            console.log(chalk.redBright("\n👋 Exiting the calculator. Goodbye!\n"));
            rl.close();
            exit(0);
        }

        if (validOperations.includes(operation)) {
            return operation;
        }
        console.log(chalk.redBright("❌ Invalid operation! Please enter one of (+, -, *, /)"));
    }
}

async function calculator() {
    try {
        const number1 = await getValidNumber('Enter first number: ');
        const number2 = await getValidNumber('Enter second number: ');
        const operation = await getValidOperation();

        let result;
        switch (operation) {
            case "+":
                result = number1 + number2;
                break;
            case "-":
                result = number1 - number2;
                break;
            case "*":
                result = number1 * number2;
                break;
            case "/":
                if (number2 === 0) {
                    console.log(chalk.redBright("\n⚠ Error: Division by zero is not allowed!\n"));
                    return;
                }
                result = number1 / number2;
                break;
        }

        const outputBox = boxen(
            `📌 Calculation:\n\n ${chalk.greenBright(number1)} ${chalk.bold(operation)} ${chalk.greenBright(number2)}\n\n` +
            `✅ Result: ${chalk.bold(result.toFixed(2))}`,
            { padding: 1, margin: 1, borderStyle: "double", borderColor: "green" }
        );

        console.log(outputBox);

    } catch (error) {
        console.log(chalk.redBright("⚠ An unexpected error occurred:", error.message));
    } finally {
        calculator();
    }
}

calculator();