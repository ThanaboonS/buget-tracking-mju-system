import Period from "src/class/Period";




export default class PeriodManager {
    public async listPeriod(id: number) {
        var array = new Array();
        var period;
        const data = {
            'idProject': id
        }
        await fetch("http://localhost:8080/vlistPeriod/listMyPeriod",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(data)
            })
            .then((response) => {
                //   console.log(response)
                return response.json()
            }).then((json) => {
                for (var i = 0; i < json.length; i++) {
                    period = new Period();
                    period.setIdPeriod(json[i].idPeriod)
                    period.setNoPeriod(json[i].noPeriod)
                    period.setBudgetPeriod(json[i].budgetPeriod)
                    period.setStartPeriod(json[i].startPeriod)
                    period.setEndPeriod(json[i].endPeriod)
                    array.push({ period })
                }
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
        return array
    }
    public async updatePeriod(idPeriod: number, budgetPeriod: number, startPeriod: string, endPeriod: string) {
        var period = new Period()
        period.setIdPeriod(idPeriod)
        period.setBudgetPeriod(budgetPeriod)
        period.setStartPeriod(startPeriod)
        period.setEndPeriod(endPeriod)
        await fetch("http://localhost:8080/editPeriod/updatePeriod",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(period)
            })
            .then((json) => {
                console.log(json)
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
    }
    public addPeriod(idProject: number, noPeriod: number, startPeriod: string, endPeriod: string, budgetPeriod: number) {
        var period: Period = new Period();
        period.setIdProject(idProject);
        period.setNoPeriod(noPeriod);
        period.setStartPeriod(startPeriod);
        period.setEndPeriod(endPeriod);
        period.setBudgetPeriod(budgetPeriod);
        fetch("http://localhost:8080/vperiod/addPeriod",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(period)
            })
            .then((json) => {
                console.log(json)
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
    }
    public addPeriodByModel(period:Period) {        
        fetch("http://localhost:8080/vperiod/addPeriod",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(period)
            })
            .then((json) => {
                console.log(json)
            })
            .catch((error) => {
                console.error('parsing failed', error);
            });
    }
}