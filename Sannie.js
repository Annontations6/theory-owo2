import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "theory";
var name = "Sannie";
var description = "when do yes";
var authors = "Annontations6";
var version = 1;

var currency;

var templateCost = [BigNumber.from("1e1500"), BigNumber.from("1e1500"), BigNumber.from("ee4")]
var templateMath = ["t_1", "t_2", "t_3"]
var templates = new Array(3)
var varsCost = [10, 300, 40000, 1e7]
var currencyInsert = [new ExponentialCost(varsCost[0], Math.log2(3)), new ExponentialCost(varsCost[1], Math.log2(3)), new ExponentialCost(varsCost[2], Math.log2(3)), new ExponentialCost(varsCost[3], Math.log2(3))]
var varsMath = ["w", "x", "y", "z"]
var getLevelVars = (level) => [Utils.getStepwisePowerSum(level, 2.5, 9, 0), Utils.getStepwisePowerSum(level, 3, 10, 0), BigNumber.from((50) * level), Utils.getStepwisePowerSum(level, 3, 10, 0)]
var vars = new Array(4)

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // All 4 Variables

    for (let i = 0; i < 4; i++) {
        vars[i] = theory.createUpgrade(i, currency, currencyInsert[i])
        vars[i].getDescription = (_) => "My Formula Is " + Utils.getMath(varsMath[i]) + " | You Gained " + getLevelVars[i] + " Rho Per Second of Variable!"
        vars[i].getInfo = (amount) => "Coming soon..."
    }

    // All 3 Templates

    for (let i = 0; i < 3; i++) {
        templates[i] = theory.createUpgrade(i + 4, currency, new ExponentialCost(templateCost[i], Math.log2(1)));
        templates[i].getDescription = (_) => "Template " + (i + 1);
        templates[i].getInfo = (amount) => "Given Template Now!";
        templates[i].maxLevel = 1;
    }
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getLevelVars[0] *
                                   getLevelVars[1] *
                                   getLevelVars[2] *
                                   getLevelVars[3];
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.164) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

init();