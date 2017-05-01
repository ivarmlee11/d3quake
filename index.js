const bodyParser = require('body-parser')
const express = require('express')
const ejs = require('ejs')
const morgan = require('morgan')
const csvWriter = require('csv-write-stream')
const CronJob = require('cron').CronJob
const request = require('request')
const moment = require('moment')
const fs = require('fs')

const app = express()

morgan(':method :url :status :res[content-length] - :response-time ms')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

try {
    new CronJob('00 30 11 * * 1-5', function() {
        console.log('this should not be printed');
    })
} catch(ex) {
    console.log("cron pattern not valid");
}

const job = new CronJob({
  cronTime: '00 20 12 * * 1-5',
  onTick: () => {
		request('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&updatedafter=2017-01-02&minmagnitude=3&orderby=magnitude',
		 (error, response, data) => {
			const quakeInfo = []
			const parsedUsgsData = JSON.parse(data)
		  parsedUsgsData.features.forEach((val) => {
		    quakeInfo.push({
		      lat: val.geometry.coordinates[0],
		      long: val.geometry.coordinates[1],
		      depth: val.geometry.coordinates[2],
		      placename: val.properties.place,
		      magnitude: val.properties.mag,
		      time: moment.unix(val.properties.time/1000).format('DD MMM YYYY hh:mm a')
		    })
		  })
		  console.log(quakeInfo.length)

			let earthquakeDataWriter = csvWriter({ headers: ['magnitude', 'placename', 'time']})
			earthquakeDataWriter.pipe(fs.createWriteStream('./public/data/data.csv'))
			quakeInfo.forEach((val) => {
				earthquakeDataWriter
					.write({
						// lat: val.lat, 
						// long: val.long,
						// depth: val.depth,
						magnitude: val.magnitude,
						placename: val.placename,
						time: val.time
					})
			})
			earthquakeDataWriter.end()
		})
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

job.start()

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT || 3000)