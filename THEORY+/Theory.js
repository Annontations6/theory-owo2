import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "while (sky == liver);";
var name = "Theory+";
var description = "theory engine what";
var authors = "annontations6";
var version = 1;

var currency;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // j
    {
        let getDesc = (level) => "j=" + getJ(level).toString(0);
        j = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(5))));
        j.getDescription = (_) => Utils.getMath(getDesc(j.level));
        j.getInfo = (amount) => Utils.getMathTo(getDesc(j.level), getDesc(j.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e12);
    theory.createBuyAllUpgrade(1, currency, 1e35);
    theory.createAutoBuyerUpgrade(2, currency, 1e90);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(2, Math.log10(5)));

    /////////////////
    //// Achievements
    let achievement_category_1 = theory.createAchievementCategory(0, "Currency")
    let achievement_category_2 = theory.createAchievementCategory(1, "j Level")
    let achievement_category_3 = theory.createAchievementCategory(2, "Sercet Achievements")
    achievement1 = theory.createAchievement(0, achievement_category_1, "You Started!", "You Started to game.", () => currency.value > 1000);
    achievement2 = theory.createAchievement(1, achievement_category_1, "1e10 rho Nice", "Reach 1e10 rho.", () => currency.value > 1e10);
    achievement3 = theory.createAchievement(2, achievement_category_1, "Prestige Layer?", "Reach 1e12 rho.", () => currency.value > 1e12);
    achievement4 = theory.createAchievement(3, achievement_category_1, "Mega Hundred Thousand", "Reach 1e20 rho.", () => currency.value > 1e20);
    achievement5 = theory.createAchievement(4, achievement_category_1, "Omega Layer of Layer 2", "Reach 1e24 rho.", () => currency.value > 1e24);
    achievement6 = theory.createAchievement(5, achievement_category_1, "Gogol", "Reach 1e50 rho.", () => currency.value > 1e50);
    achievement7 = theory.createAchievement(6, achievement_category_1, "You find", "Reach 1e75 rho.", () => currency.value > 1e75);
    achievement8 = theory.createAchievement(7, achievement_category_1, "Googol", "Reach 1e100 rho.", () => currency.value > 1e100);
    achievement9 = theory.createAchievement(8, achievement_category_1, "Endgame", "Reach 1e115 rho and finsh to theory ng.", () => currency.value > 1e125);
    achievement99 = theory.createAchievement(100, achievement_category_2, "Afford", "Reach level of j 15", () => j.level > 15);
    achievement9999 = theory.createSecretAchievement(10000, achievement_category_3, "jLevel-τ", "Reach level of j 8281", "8281 level???", () => j.level > 8281);


}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.164) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getJ = (level) =>  Utils.getStepwisePowerSum(level, 2, 10, 0);

init();