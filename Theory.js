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
var b = BigNumber.TWO;

var init = () => {
    currency = theory.createCurrency();

    // Ki
    {
        let getDesc = (level) => "K_i=" + getKI(level).toString(3);
        Ki = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(3))));
        Ki.getDescription = (_) => Utils.getMath(getDesc(Ki.level));
        Ki.getInfo = (amount) => Utils.getMathTo(getDesc(Ki.level), getDesc(Ki.level + amount));
    }

    // a1
    {
        let getDesc = (level) => "a_1=" + getA1(level).toString(0);
        a1 = theory.createUpgrade(1, currency, new FirstFreeCost(new ExponentialCost(25, Math.log2(4))));
        a1.getDescription = (_) => Utils.getMath(getDesc(a1.level));
        a1.getInfo = (amount) => Utils.getMathTo(getDesc(a1.level), getDesc(c1.level + amount));
    }

}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    a += BigNumber.ONE * getKI(Ki.level)
    b += BigNumber.from(0.002)
    currency.value += dt * a * getKI(Ki.level) * getA1(a1.level);
    theory.invalidateSecondaryEquation();
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = a";

    result += " \\times K_i";

    result += "a_1";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho^{0.9}, a = " + a.toString(3) + ", b = " + b.toString(3);
var getTau = () => currency.value.pow(0.9);

var getKI = (level) => BigNumber.from(1 + 0.036 * level)
var getA1 = (level) => Utils.getStepwisePowerSum(level, 2, 15, 0);

init();