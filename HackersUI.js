import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";
import { ui } from "../api/ui/UI"
import { game } from "../api/Game";

var id = "UI?";
var name = "Hackers UI";
var description = "WHEN WHWEN DONT HAVE";
var authors = "Annontations6";
var version = 1;

var currency;
var save_number = BigNumber.ZERO;

var popup = ui.createPopup({
    title: "My Popup",
    content: ui.createStackLayout({
        children: [
            ui.createLabel({text: "when everting?:"}),
            ui.createEntry(),
            ui.createFrame({
                heightRequest: 50,
                cornerRadius: 10,
                content: ui.createLabel({
                    text: "Note:error now edit variable.",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
                })
            }),
            ui.createLabel({text: "Hackers ui click to edit variable."}),
            ui.createButton({text: "Collect Stars", onClicked: () => game.stars *= BigNumber.TWO}),
            ui.createButton({text: "f(t) to ee400,000", onClicked: () => game.f = BigNumber.from("ee400000")}),
            ui.createButton({text: "1000 sigma", onClicked: () => game.sigma = BigNumber.from(1000)}),
            ui.createButton({text: "Close", onClicked: () => popup.hide()}),
        ]
    })
});

popup.show();