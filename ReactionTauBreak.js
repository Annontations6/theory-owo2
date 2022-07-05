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

    // w
    {
        let getDesc = (level) => "w=" + getW(level).toString(0);
        w = theory.createUpgrade(1, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        w.getDescription = (_) => Utils.getMath(getDesc(w.level));
        w.getInfo = (amount) => Utils.getMathTo(getDesc(w.level), getDesc(w.level + amount));
    }

    // x
    {
        let getDesc = (level) => "x=" + getX(level).toString(0);
        x = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(2e3, Math.log2(2))));
        x.getDescription = (_) => Utils.getMath(getDesc(x.level));
        x.getInfo = (amount) => Utils.getMathTo(getDesc(x.level), getDesc(x.level + amount));
    }
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getW(w.level) * (t.value / 20)
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

var getW = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getX = (level) => Utils.getStepwisePowerSum(level, 2, 9, 0);

init();