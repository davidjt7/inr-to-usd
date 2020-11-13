import fs from 'fs';
import fetch from 'node-fetch';
import Papa from 'papaparse';

async function convertINRToUSD(amount: number) {
    try {
        const timestamp = Date.now();
        const exchangeRateUrl = 'https://api.exchangeratesapi.io/latest?base=INR&symbols=USD';
        const response = await fetch(exchangeRateUrl);
        const json = await response.json();

        return {
            timestamp,
            amount: json.rates.USD * amount,
        };
    } catch (error) {
        throw error.message;
    }
}

async function convertCSVToJSON(csvFilePath: string) {
    try {
        const data = await fs.promises.readFile(csvFilePath);
        const dataString = data.toString();
        const csvString = dataString.substring(0, dataString.length - 1)
        const array = await Papa.parse(csvString);
        const result = array.data.flat();
        const cleanedResult = result.filter((value) => !isNaN(value)).map(Number);
        const sorted = cleanedResult.sort();
        console.log(sorted)
        let sum = 0, count = 0;
        for (const item of sorted) {
            sum += item;
            count++;
        }
        const mean = sum / count;
        const median = computeMedian(sorted);
        const minimum = sorted[0];
        const maximum = sorted[sorted.length - 1];

        return {
            amountsInINR: sorted,
            mean,
            median,
            minimum,
            maximum
        };
    } catch (error) {
        throw error.message;
    } finally {
        fs.unlink(csvFilePath, () => {
            return;
        });
    }
}


export {
    convertINRToUSD,
    convertCSVToJSON,
};

function computeMedian(values) {
    if (values.length === 0) return 0;

    values.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}