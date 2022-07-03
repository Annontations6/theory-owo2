import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "theory2";
var name = "My Theory";
var description = "wowooowo";
var authors = "Annontations 6";
var version = 1;

var currency;

// Vars
var a = BigNumber.ZERO;

var init = () => {
    currency = theory.createCurrency();
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    a += BigNumber.ONE
    currency.value += dt * a;
    theory.invalidateSecondaryEquation();
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho^{0.9}, a = " + a.toString(3);
var getTau = () => currency.value.pow(0.9);

init();