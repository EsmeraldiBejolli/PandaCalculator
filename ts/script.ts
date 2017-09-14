class PandaCalculator {
    data: Array<{
        name: string;
        value: any;
    }> = [];
    requestData;
    pandas: number;
    elements: any;

    constructor() {
        this.onSubmit();
    }

    collectData(): Array<Object> {
        this.elements = document.querySelectorAll(".form-input-group input:checked,.form-input-group input[type='range'],.form-input-group select");
        for (var i = 0; i < this.elements.length; i++) {
            this.data.push({
                name: this.elements[i].name,
                value: this.elements[i].value
            });
        }
        return this.data;
    }

    calculateData(data, requestData) {
        var pandas = [];
        var name;
        var value;
        for (var i = 0; i < data.length; i++) { 
            name = data[i].name;
            value = Number(data[i].value);
            if (name == "age") {
                value = Number(data[i].value);
                switch (true) {
                    case (value < 21):
                        value = 14;
                        break;
                    case (value > 20 && value < 31):
                        value = 21;
                        break;
                    case (value > 30 && value < 46):
                        value = 31;
                        break;
                    case (value > 45):
                        value = 46;
                        break;
                    default:
                        value = 46;
                }
            } else if (name == "height") {
                value = Number(data[i].value);
                switch (true) {
                    case (value < 149):
                        value = 149;
                        break;
                    case (value > 150 && value < 161):
                        value = 151;
                        break;
                    case (value > 161 && value < 181):
                        value = 161;
                        break;
                    case (value > 180):
                        value = 181;
                        break;
                    default:
                        value = 161;
                }
            } else {
                value = data[i].value;
            }
            for (var d in requestData) {
                if (name == d) {
                    var inData = requestData[d];

                    for (var k in inData) {
                        if (k == value) {
                            pandas.push(inData[k]);
                        }
                    }
                }
            }
        }
        return pandas;

    }

    getPandas(data, requestData) {
        var dt = this.calculateData(data, requestData);
        this.pandas = 0;
        for (var i = 0; i < dt.length; i++) {
            this.pandas += dt[i];
        }
    }

    getData(url: string) {
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", url, false);
        xhReq.send(null);

        return JSON.parse(xhReq.responseText);
    }

    onSubmit() {
        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.data.length = 0;
            this.getPandas(this.collectData(), this.getData('data.json'));
            document.getElementsByTagName('form')[0].style.display = "none";
            this.showResult();
        });
    }

    showResult() {
        var result = <HTMLObjectElement>document.querySelectorAll('.result-section')[0];
        result.style.display = "block";
        var el = <HTMLObjectElement>document.getElementsByClassName('result')[0];
        el.innerHTML = ""
        el.appendChild(document.createTextNode("" + this.pandas + ""));
    }
}

new PandaCalculator();