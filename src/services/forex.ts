import fs from 'fs';
import fetch from 'node-fetch';
import Papa from 'papaparse';
import nodemailer from 'nodemailer';

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

async function sendMail(req) {
    try {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Fred Foo" <foo@example.com>', // sender address
            to: req.body.receiver, // list of receivers
            subject: "INR To USD Conversion Results", // Subject line
            text: "Results", // plain text body
            html: `
            <style>
            #results {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            #results td, #results th {
            border: 1px solid #ddd;
            padding: 8px;
            }

            #results tr:nth-child(even){background-color: #f2f2f2;}

            #results tr:hover {background-color: #ddd;}

            #results th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
            }
            p { color: #4c4a37; font-family: 'Source Sans Pro', sans-serif; font-size: 18px; line-height: 32px; margin: 0 0 24px; }
            </style>
            <table id="results">
                <th>Date</th>
                <th>INR</th>
                <th>USD</th>
            ${req.body.rows.map((row) => {
                return `<tr>
                  <td>${row.date.substr(0, 25)}</td>
                  <td>${row.inr}</td>
                  <td>${row.usd}</TableCell>
                </tr>`;
            })}
            </table>
            <p>Mean: ${req.body.mean}</p> <p>Median: ${req.body.median}</p><p> Minimum: ${req.body.minimum}</p> <p>Maximum: ${req.body.maximum}</p>
            `, // html body
        });
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return;
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
    sendMail
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