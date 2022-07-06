import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "10000";
var name = "Theory";
var description = "MAAA";
var authors = "Sky == liver";
var version = 1;

var currency;

//6 Variables
var t = BigNumber.ZERO
var a_sec = BigNumber.ZERO
var b_sec = BigNumber.ZERO
var a_click = BigNumber.ONE
var b_click = BigNumber.ONE
var g_clic = BigNumber.ONE

var init = () => {
    //4 Currencies
    currency = theory.createCurrency();
    a = theory.createCurrency("a", "a");
    b = theory.createCurrency("b", "b");
    g = theory.createCurrency("g", "g");

    // ? Functions

    /**
     * Returneds Value of A Collect i think :)
     * @param {string} collect Add collect a A! I show this.
     */
    function CollectA(collect) {
        a += collect
    }

    /**
     * Addiontial a Big Number Spent
     * @param {string} a Add Plus When Everything
     * @param {string} b Plus Show a + b (5 + 3 = 8).
     * @returns {string} add this know when string 
     */
    function Addiontoial(a, b) {
        return BigNumber.from(a + b)
    }

    // Regular Upgrades

    // a
    {
        a = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        a.getDescription = (_) => "You gained " + a_click + " a per click!";
        a.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }
}