import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "RTB";
var name = "Reaction Tau Break";
var description = "plz plz (Reaction Tau Break (RTB))";
var authors = "Sky == liver";
var version = 1;

var currency;
var g = BigNumber.ZERO

var init = () => {
    currency = theory.createCurrency();
    t = theory.createCurrency("T", "T");

     // prestige
     {
        prestige = theory.createUpgrade(0, currency, new FreeCost());
        prestige.getDescription = (_) => "Adjust T Now!";
        prestige.getInfo = (amount) => "Adjust T Now!";
        prestige.boughtOrRefunded = (_) => {
            t.value = BigNumber.from(125)
            prestige.level = 0;
        }
    }
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * (t.value / 20)
    if (t.value == 0) {
        //no much zero t.
    } else {
        t.value -= BigNumber.ONE
    }
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.164) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();