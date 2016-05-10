module.exports = {
    getWeatherData: function(){
        return {
                locations : [
                {
                    name : 'Portland',
                    forecastUrl : 'http://www.wunderground.com/US/OR/Portland.html',
                    iconUrl : 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                    weather : 'Overcast',
                    temp : '54.1 F (12.3 C)'
                },
                {
                    name : 'Bend',
                    forecastUrl : 'http://www.wunderground.com/US/OR/Portland.html',
                    iconUrl : 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                    weather : 'Partly Cloudy',
                    temp : '55.1 F (12.3 C)'
                },
                {
                    name : 'Manzanita',
                    forecastUrl : 'http://www.wunderground.com/US/OR/Portland.html',
                    iconUrl : 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                    weather : 'Light Rain',
                    temp : '56.1 F (12.3 C)'
                }
            ]
        };
        //next();  ?????
    },
};
