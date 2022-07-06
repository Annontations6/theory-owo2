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

    // 3 Functions

    /**
     * Returneds Value of A Collect i think :)
     * @param {string} collect Add collect a A! I show this.
     */
    function CollectA(collect) {
        a += collect
    }

    /**
     * Addiontial a Big Number Spent
     * @param {number} a Add Plus When Everything
     * @param {number} b Plus Show a + b (5 + 3 = 8).
     * @returns {string} add this know when string 
     */
    function Addiontoial(a, b) {
        return BigNumber.from(a + b)
    }

    /**
     * Two of Power of BigNumber
     * @param {number} a Returns Two of pow
     * @param {string} name Returns Name not show
     * @param {boolean} isUnlocked Returns unlock not visible
     * @return {string} i string hi
     */
    function TwoPow(a, nme, isUnlocked) {
        if (isunlocked) {
            return BigNumber.TWO.pow(a)
        } else {
            return "..."
        }
    }

    // Regular Upgrades

    // a
    {
        a = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(40, Math.log2(2.25))));
        a.getDescription = (_) => "You gained " + a_click + " a per click!";
        a.getInfo = (amount) => "Gained " + a_click + " a click";
    }
}

init();