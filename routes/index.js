var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var originRequest  = require('request');
var iconv = require('iconv-lite');
var mongoose = require('mongoose');
var restaurantDao = require('../models/restaurant.js');  
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
} 
/* GET home page. */
router.get('/', function(req, res, next) {
console.log("=============================");
    
 
    var i=180;
      // getDate(i);
    function aa(){
   
    setTimeout(function(){
      getDate(i);
      i++;
      if(i<227){
      aa();
    }
    },60000)

   }
     aa();

  res.render('index', { title: 'Express' });
});
function request (url, callback) {  
  var options = {
    url: url,
    encoding: null,
    //代理服务器
    //proxy: 'http://xxx.xxx.xxx.xxx:8888',
    headers: headers
  }
  originRequest(options, callback)
}

function getDate(nn){
  console.log(nn);
   request('http://www.usalifeonline.com/f/list.php?fid=288&page='+nn, function (error, response, html) {
        var restaurantList=[];
        if (!error && response.statusCode == 200) {
          $ = cheerio.load(html);
          var count=$('.fenleicontmxx .xxtitle a').length;
                    

                $('.fenleicontmxx .xxtitle a').each(function(i, elem) {
                     request("http://www.usalifeonline.com/f/"+$(this).attr('href'), function (error, response, body) {
                     html=iconv.decode(body, 'gb2312').toString();
                    
                    $ = cheerio.load(html, {decodeEntities: false});
                    var restaurantJson={};
                    restaurantJson["name"]=$(".titleR").text();
                    restaurantJson["state"]="520"
                    restaurantJson["phone"]=$(".telR").text();
                    restaurantList.push(restaurantJson);
                                   if(count-1==i){
                                //    console.log(restaurantList);
                                    restaurantDao.create(restaurantList, function (err, candies) {
                                      if(err){
                                        console.log(err);
                                        return false;
                                      }
                                      console.log("====ok==="+nn);
                                    }
                                    )
                                   }
                            
                    
              

                    })
                    



          });
        }
      });
}
module.exports = router;
