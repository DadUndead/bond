'use strict';

$(document).ready(onLoadHandler)

function onLoadHandler(){
  $('#micex-app').html('WOW, I Loaded!')

  //request BANEP securities
  $.getJSON('http://www.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json')
  .done(function(data){
    var securities = _.map(data.securities.data, function(x){
                        return _.zipObject(data.securities.columns, x)
                      })
    var marketdata = _.map(data.marketdata.data, function(x){
                        return _.zipObject(data.marketdata.columns, x)
                      })
    var info='<table><thead><tr><th>Название</th><th>Цена</th></tr></thead><tbody>'
    _.forEach(securities, function(x,i){
      info+='<tr><td>'+x.SHORTNAME+'</td><td>'+marketdata[i].LAST+'</td></tr>'
    })
    info+='</tbody></table>'
    $('#micex-app').html(info)
  })
}
