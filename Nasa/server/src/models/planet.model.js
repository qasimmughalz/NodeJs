
const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')


const result = []

const isLivable = (data) => {
    return data['koi_disposition'] == 'CONFIRMED' && data['koi_insol'] > 0.36 && data['koi_insol'] < 1.11
        && data['koi_prad'] < 1.6
}

fs.createReadStream(path.join(__dirname, '..', 'planetsData', 'data.csv'))
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (isLivable(data)) {
            console.log("liveable", data)
            result.push(data)
        }
    })
    .on('error', er => console.log(er))
    .on('end', () => {
        result.map((res) => {
            console.log(res['kepler_name'])
        })
        console.log(`${result.length} number of planets found`)

        console.log("END !!!")
    })


module.exports = {
    planets: result
}