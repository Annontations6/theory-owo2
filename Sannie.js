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

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // All 3 Templates

    for (let i = 0; i < 3; i++) {
        templates[i] = theory.createUpgrade(i, currency, new ExponentialCost(templateCost[i], Math.log2(1)));
        templates[i].getDescription = (_) => "Template " + (i + 1);
        templates[i].getInfo = (amount) => "Given Template Now!";
        templates[i].maxLevel = 1;
    }
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.164) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

init();