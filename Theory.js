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

    // Ki
    {
        let getDesc = (level) => "K_i=" + getKI(level).toString(3);
        Ki = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(2))));
        Ki.getDescription = (_) => Utils.getMath(getDesc(Ki.level));
        Ki.getInfo = (amount) => Utils.getMathTo(getDesc(Ki.level), getDesc(Ki.level + amount));
    }
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    a += BigNumber.ONE * getKI(Ki.level)
    currency.value += dt * a * getKI(Ki.level);
    theory.invalidateSecondaryEquation();
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = a";

    result += " \\times K_i";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho^{0.9}, a = " + a.toString(3);
var getTau = () => currency.value.pow(0.9);

var getKI = (level) => BigNumber.from(1 + 0.036 * level)

init();