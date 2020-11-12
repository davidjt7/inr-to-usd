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
        const cleanedResult = result.filter((value) => value !== "").map(Number);

        return {
            amountsInINR: cleanedResult
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